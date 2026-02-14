import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  StyleSheet,
  Linking,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./components/BackButton";
import { addNotification } from "../src/utils/notificationsStore";
import BeeIcon from "../assets/bee_icon.png";

const PLANTNET_API_KEY = process.env.EXPO_PUBLIC_PLANTNET_API_KEY;
const PLANTNET_ENDPOINT = "https://my-api.plantnet.org/v2/identify/all";

const toPercent = (p) => `${Math.round((p || 0) * 100)}%`;

async function attachPollinatorFlags(enriched) {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  if (!API_URL || !Array.isArray(enriched) || enriched.length === 0) {
    return enriched;
  }

  try {
    const items = enriched.map((x) => ({
      scientificName: x.scientificName,
      commonName:
        x.commonName ||
        (Array.isArray(x.commonNames) ? x.commonNames[0] : "") ||
        "",
    }));

    const res = await fetch(`${API_URL}/api/pollinator-check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    if (!res.ok) return enriched;

    const data = await res.json();
    const results = Array.isArray(data?.results) ? data.results : [];

    const flagMap = new Map(
      results.map((r) => [String(r.scientificName), Boolean(r.pollinatorFriendly)])
    );

    return enriched.map((x) => ({
      ...x,
      pollinatorFriendly: flagMap.get(String(x.scientificName)) === true,
    }));
  } catch (e) {
    console.log("pollinator-check failed:", e);
    return enriched;
  }
}

async function identifyWithPlantNet(imageAsset) {
  const form = new FormData();
  form.append("images", {
    uri: imageAsset.uri,
    name: "photo.jpg",
    type: imageAsset.mimeType || "image/jpeg",
  });

  const url = `${PLANTNET_ENDPOINT}?api-key=${encodeURIComponent(PLANTNET_API_KEY)}`;

  const res = await fetch(url, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Pl@ntNet failed: ${res.status} ${msg}`);
  }

  const json = await res.json();

  const suggestions =
    json?.results?.map((r) => ({
      scientificName:
        r?.species?.scientificName ||
        r?.species?.scientificNameWithoutAuthor ||
        r?.gbif?.scientificName ||
        "Unknown plant",
      commonNames: Array.isArray(r?.species?.commonNames) ? r.species.commonNames : [],
      score: r?.score ?? 0,
    })) || [];

  suggestions.sort((a, b) => b.score - a.score);

  const top = suggestions[0];
  const lowConfidence = !top || top.score < 0.1;

  return {
    lowConfidence,
    suggestions: suggestions.slice(0, 5),
  };
}

async function enrichWithINat(scientificName) {
  try {
    const cleaned = scientificName
      .replace(/\s+[A-Z][a-z]*\.?$/g, "")
      .split(" ")
      .slice(0, 2)
      .join(" ");

    const url = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(
      cleaned
    )}&per_page=5`;
    const res = await fetch(url);
    const json = await res.json();

    const results = json?.results || [];

    let taxon =
      results.find((t) => t.name?.toLowerCase() === cleaned.toLowerCase()) || results[0];

    if (!taxon) return { taxon: null };

    const commonName =
      taxon.preferred_common_name ||
      taxon.english_common_name ||
      (taxon.common_names?.length ? taxon.common_names[0].name : null);

    const photo =
      taxon?.default_photo?.medium_url || taxon?.default_photo?.square_url || null;

    const wiki = taxon.wikipedia_url || null;

    return {
      taxon,
      commonName,
      photo,
      wiki,
    };
  } catch (err) {
    console.log("❌ iNat enrich error:", err);
    return { taxon: null };
  }
}

export default function IdentifyScreen() {
  const insets = useSafeAreaInsets();

  const [imageAsset, setImageAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const [coords, setCoords] = useState(null);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;

        const loc = await Location.getCurrentPositionAsync({});
        setCoords({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      } catch (err) {
        console.log("Location error:", err);
      }
    })();
  }, []);

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission needed", "I need access to your photos to identify a plant.");
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (res.canceled) return;

    const asset = res.assets?.[0];
    if (!asset?.uri) {
      Alert.alert("Oops", "Couldn't read image.");
      return;
    }

    setImageAsset(asset);
    setResults([]);
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission needed", "Camera access is required.");
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (res.canceled) return;

    const asset = res.assets?.[0];
    if (!asset?.uri) return;

    setImageAsset(asset);
    setResults([]);
  };

  const identify = async () => {
    if (!imageAsset?.uri) {
      Alert.alert("No image", "Choose a photo first.");
      return;
    }

    try {
      setLoading(true);
      setResults([]);

      const { lowConfidence, suggestions } = await identifyWithPlantNet(imageAsset);

      const enriched = [];
      for (const g of suggestions) {
        try {
          const e = await enrichWithINat(g.scientificName);
          enriched.push({ ...g, ...e });
        } catch {
          enriched.push({ ...g, taxon: null });
        }
      }

      if (lowConfidence) {
        Alert.alert(
          "Low Confidence",
          "We’re not very confident about this match. Try another photo or angle."
        );
      }

      const withFlags = await attachPollinatorFlags(enriched);
      setResults(withFlags);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message || "Identification failed.");
    } finally {
      setLoading(false);
    }
  };

  const confirmPin = (item) => {
    if (!coords) {
      Alert.alert("Location not ready", "We couldn't get your location yet. Try again.");
      return;
    }

    Alert.alert("Pin this plant?", "This will save the plant to your BeeLine map.", [
      { text: "Cancel", style: "cancel" },
      { text: "Pin it", onPress: () => saveIdentification(item) },
    ]);
  };

  const saveIdentification = async (item) => {
    if (!coords) return;

    try {
      setSavingId(item.scientificName);

      if (item.score < 0.3) {
        Alert.alert(
          "Low confidence",
          "This match is pretty uncertain. Try another photo or angle before pinning."
        );
        return;
      }

      const payload = {
        commonName:
          item.commonName ||
          item?.taxon?.preferred_common_name ||
          item?.taxon?.english_common_name ||
          item?.taxon?.commonName ||
          (Array.isArray(item.commonNames) && item.commonNames.length
            ? item.commonNames[0]
            : null),
        scientificName: item.scientificName,
        confidence: typeof item.score === "number" ? item.score : null,
        imageUrl: item.photo || item?.taxon?.photo || null,
        lat: coords.lat,
        lng: coords.lng,
      };

      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/observations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save pin");

      if (data.duplicate) {
        Alert.alert("Already pinned", "A pin for this plant already exists near here.");
      } else {
        Alert.alert("Pinned!", "Saved to your BeeLine map.");

        await addNotification({
          title: "Pinned to your map",
          body: "Nice find. Your plant was added to your personal map and collection.",
          type: "pin",
        });
      }
    } catch (err) {
      console.error("saveIdentification error", err);
      Alert.alert("Error", "Couldn't save the pin.");
    } finally {
      setSavingId(null);
    }
  };

  const openWiki = (url) => {
    if (url) Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.h1}>Identify</Text>
          <Text style={styles.h2}>Upload a plant photo to get matches</Text>
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, (!imageAsset || loading) && styles.btnDisabled]}
          onPress={identify}
          disabled={!imageAsset || loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.primaryBtnText}>Identify</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionCard} onPress={pickImage} activeOpacity={0.85}>
          <Text style={styles.actionTitle}>Choose</Text>
          <Text style={styles.actionSub}>From gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={takePhoto} activeOpacity={0.85}>
          <Text style={styles.actionTitle}>Camera</Text>
          <Text style={styles.actionSub}>Take a photo</Text>
        </TouchableOpacity>

        <View style={[styles.actionCard, styles.actionCardMuted]}>
          <Text style={styles.actionTitle}>Location</Text>
          <Text style={styles.actionSub}>
            {coords ? "Ready" : "Loading…"}
          </Text>
        </View>
      </View>

      {/* Preview */}
      <View style={styles.previewCard}>
        {imageAsset?.uri ? (
          <Image source={{ uri: imageAsset.uri }} style={styles.preview} resizeMode="cover" />
        ) : (
          <View style={styles.emptyPreview}>
            <Text style={styles.emptyTitle}>No photo selected</Text>
            <Text style={styles.emptySub}>Choose a photo or take one to begin.</Text>
          </View>
        )}
      </View>

      {/* Results */}
      <Text style={styles.sectionTitle}>
        Results {results.length ? `(${results.length})` : ""}
      </Text>

      <FlatList
        data={results}
        keyExtractor={(item, idx) => `${item.scientificName}-${idx}`}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => {
          const img =
            item.photo ||
            item?.taxon?.default_photo?.medium_url ||
            item?.taxon?.default_photo?.square_url ||
            null;

          const common =
            item.commonName ||
            item?.taxon?.preferred_common_name ||
            item?.taxon?.english_common_name ||
            item?.taxon?.commonName ||
            "Unknown common name";

          const sci = item.scientificName;
          const wiki = item.wiki || item?.taxon?.wikipedia_url || null;

          return (
            <View style={styles.resultCard}>
              {img ? (
                <Image source={{ uri: img }} style={styles.thumb} />
              ) : (
                <View style={[styles.thumb, styles.thumbPlaceholder]}>
                  <Text style={styles.thumbText}>No image</Text>
                </View>
              )}

              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <Text style={styles.commonName} numberOfLines={1}>
                    {common}
                  </Text>

                  {item.pollinatorFriendly === true && (
                    <View style={styles.badge}>
                      <Image source={BeeIcon} style={styles.badgeIcon} />
                      <Text style={styles.badgeText}>Pollinator</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.sciName} numberOfLines={1}>
                  {sci}
                </Text>

                <View style={styles.metaRow}>
                  <Text style={styles.confidence}>Confidence {toPercent(item.score)}</Text>
                </View>

                <View style={styles.cardBtns}>
                  <TouchableOpacity
                    style={styles.cardBtn}
                    onPress={() => Alert.alert("Selected", `${common} (${sci})`)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.cardBtnText}>Select</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.cardBtnPrimary,
                      savingId === item.scientificName && styles.btnDisabled,
                    ]}
                    disabled={savingId === item.scientificName}
                    onPress={() => confirmPin(item)}
                    activeOpacity={0.85}
                  >
                    {savingId === item.scientificName ? (
                      <ActivityIndicator color="#2d2d2d" />
                    ) : (
                      <Text style={styles.cardBtnPrimaryText}>Pin</Text>
                    )}
                  </TouchableOpacity>

                  {wiki ? (
                    <TouchableOpacity
                      style={styles.cardBtnOutline}
                      onPress={() => openWiki(wiki)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.cardBtnOutlineText}>Wiki</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.subtle}>
              {imageAsset ? "Tap Identify to see matches." : "Upload a photo to get started."}
            </Text>
          ) : null
        }
      />

      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4c6233", paddingHorizontal: 16 },

  // Header
  header: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  h1: { fontSize: 22, fontWeight: "900", color: "#fff" },
  h2: { marginTop: 3, color: "rgba(255,255,255,0.75)", fontSize: 12 },

  primaryBtn: {
    backgroundColor: "#f4cf65",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 92,
  },
  primaryBtnText: {
    color: "#2d2d2d",
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  btnDisabled: { opacity: 0.5 },

  // Action row
  actionRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  actionCard: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  actionCardMuted: { opacity: 0.85 },
  actionIcon: { fontSize: 18, marginBottom: 8 },
  actionTitle: { color: "#fff", fontWeight: "900", fontSize: 14 },
  actionSub: { marginTop: 2, color: "rgba(255,255,255,0.70)", fontSize: 11 },

  // Preview card
  previewCard: {
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    marginBottom: 12,
  },
  preview: {
    width: "100%",
    height: 220,
    borderRadius: 14,
  },
  emptyPreview: {
    height: 220,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  emptyTitle: { color: "#fff", fontWeight: "900", fontSize: 14 },
  emptySub: { marginTop: 6, color: "rgba(255,255,255,0.70)", fontSize: 12, textAlign: "center" },

  // Section title
  sectionTitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "900",
    marginTop: 6,
    marginBottom: 10,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  subtle: { color: "rgba(255,255,255,0.75)", marginBottom: 10 },

  // Result cards
  resultCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "rgba(0,0,0,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
  },
  thumb: {
    width: 74,
    height: 74,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  thumbPlaceholder: { alignItems: "center", justifyContent: "center" },
  thumbText: { fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: "700" },

  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  commonName: { fontSize: 15, fontWeight: "900", color: "#fff", flex: 1 },
  sciName: { fontSize: 12, fontStyle: "italic", color: "rgba(255,255,255,0.75)", marginTop: 2 },
  metaRow: { marginTop: 6 },
  confidence: { fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: "700" },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(244, 207, 101, 0.22)",
    borderWidth: 1,
    borderColor: "rgba(244, 207, 101, 0.35)",
  },
  badgeIcon: { width: 14, height: 14, resizeMode: "contain" },
  badgeText: { color: "#fff", fontWeight: "900", fontSize: 11 },

  cardBtns: { flexDirection: "row", gap: 8, marginTop: 10, flexWrap: "wrap" },
  cardBtn: {
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  cardBtnText: { color: "#fff", fontWeight: "900", fontSize: 12 },

  cardBtnPrimary: {
    backgroundColor: "#f4cf65",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  cardBtnPrimaryText: { color: "#2d2d2d", fontWeight: "900", fontSize: 12 },

  cardBtnOutline: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  cardBtnOutlineText: { color: "#fff", fontWeight: "900", fontSize: 12 },
});
