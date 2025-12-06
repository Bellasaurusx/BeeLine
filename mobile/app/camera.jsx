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
import { Link } from "expo-router";
import Constants from "expo-constants";


const PLANTNET_API_KEY = Constants.expoConfig.extra.PLANTNET_API_KEY;
const PLANTNET_ENDPOINT = "https://my-api.plantnet.org/v2/identify/all";


const toPercent = (p) => `${Math.round((p || 0) * 100)}%`;


async function identifyWithPlantNet(imageAsset) {

  const form = new FormData();
  form.append("images", {
    uri: imageAsset.uri,
    name: "photo.jpg",
    type: imageAsset.mimeType || "image/jpeg",
  });

  const url = `${PLANTNET_ENDPOINT}?api-key=${encodeURIComponent(
    PLANTNET_API_KEY
  )}`;

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
    commonNames: Array.isArray(r?.species?.commonNames)
      ? r.species.commonNames
      : [],
    score: r?.score ?? 0,
  })) || [];

    // Sort by score, highest first 
  suggestions.sort((a, b) => b.score - a.score);

  // Mark low-confidence sets
  const top = suggestions[0];
  const lowConfidence = !top || top.score < 0.3; 

    console.log(
    "🌿 PlantNet suggestions:",
    suggestions.map((s) => ({
      scientificName: s.scientificName,
      commonNames: s.commonNames,
      score: s.score,
    }))
  );

  return {
    lowConfidence,
    suggestions: suggestions.slice(0, 5),
  };
}


async function enrichWithINat(scientificName) {
  try {
    console.log("🔍 enrichWithINat called with (raw):", scientificName);

    const cleaned = scientificName
      .replace(/\s+[A-Z][a-z]*\.?$/g, "") 
      .split(" ")
      .slice(0, 2)
      .join(" ");

    console.log("🔧 Cleaned name for iNat:", cleaned);

    const url = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(cleaned)}&per_page=5`;
    const res = await fetch(url);
    const json = await res.json();

    const results = json?.results || [];

    console.log(
      "🪲 iNat results (first 5):",
      results.slice(0, 5).map((t) => ({
        id: t.id,
        name: t.name,
        preferred_common_name: t.preferred_common_name,
        english_common_name: t.english_common_name,
      }))
    );

    // --- Pick best match ---
    let taxon =
      results.find((t) => t.name?.toLowerCase() === cleaned.toLowerCase()) ||
      results[0];

    if (!taxon) {
      console.log("⚠️ No matching taxon found for:", cleaned);
      return { taxon: null };
    }

    // --- Extract common name ---
    const commonName =
      taxon.preferred_common_name ||
      taxon.english_common_name ||
      (taxon.common_names?.length ? taxon.common_names[0].name : null);

    // --- Extract photo ---
    const photo =
      taxon?.default_photo?.medium_url ||
      taxon?.default_photo?.square_url ||
      null;

    // --- Extract Wikipedia link ---
    const wiki = taxon.wikipedia_url || null;

    console.log("✅ Chosen iNat taxon:", {
      scientific: taxon.name,
      commonName,
      id: taxon.id,
    });

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
  const [imageAsset, setImageAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const [coords, setCoords] = useState(null);      
  const [savingId, setSavingId] = useState(null);  
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } =
          await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Location permission not granted");
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setCoords({
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        });
      } catch (err) {
        console.log("Location error:", err);
      }
    })();
  }, []);

  // for images
  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        "Permission needed",
        "I need access to your photos to identify a plant."
      );
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

  // identify and enrich
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

    setResults(enriched);
  } catch (err) {
    console.error(err);
    Alert.alert("Error", err.message || "Identification failed.");
  } finally {
    setLoading(false);
  }
};

    const confirmPin = (item) => {
    if (!coords) {
      Alert.alert(
        "Location not ready",
        "We couldn't get your location yet. Try again."
      );
      return;
    }

    Alert.alert(
      "Pin this plant?",
      "This will save the plant to your BeeLine map.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Pin it", onPress: () => saveIdentification(item) },
      ]
    );
  };

  const saveIdentification = async (item) => {
    if (!coords) return;

    try {
      setSavingId(item.scientificName);
      setSaveError(null);

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


      confidence:
        typeof item.score === "number" ? item.score : null,

      imageUrl: item.photo || item?.taxon?.photo || null,

      lat: coords.lat,
      lng: coords.lng,
    };

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/observations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Failed to save pin");

      if (data.duplicate) {
        Alert.alert(
          "Already pinned",
          "A pin for this plant already exists near here."
        );
      } else {
        Alert.alert("Pinned!", "Saved to your BeeLine map.");
      }
    } catch (err) {
      console.error("saveIdentification error", err);
      setSaveError(err.message || "Failed to save");
      Alert.alert("Error", "Couldn't save the pin.");
    } finally {
      setSavingId(null);
    }
  };

  const selectResult = (item) => {
    const displayCommon =
      item.commonName ||
      item?.taxon?.preferred_common_name ||
      item?.taxon?.english_common_name ||
      item?.taxon?.commonName;

    const name = displayCommon
      ? `${displayCommon} (${item.scientificName})`
      : item.scientificName;

    Alert.alert("Selected", `You selected: ${name}`);
  };

  const openWiki = (url) => {
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Identify a Plant</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={pickImage}>
          <Text style={styles.btnText}>Choose Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, !imageAsset && styles.btnDisabled]}
          onPress={identify}
          disabled={!imageAsset || loading}
        >
          <Text style={styles.btnText}>
            {loading ? "Identifying…" : "Identify"}
          </Text>
        </TouchableOpacity>
      </View>

      {imageAsset?.uri ? (
        <Image
          source={{ uri: imageAsset.uri }}
          style={styles.preview}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.subtle}>Pick a photo to get started.</Text>
      )}

      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator />
          <Text style={{ marginLeft: 8 }}>Hmm who knows</Text>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item, idx) => `${item.scientificName}-${idx}`}
        contentContainerStyle={{ paddingBottom: 40 }}
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
            <View style={styles.card}>
              {img ? (
                <Image source={{ uri: img }} style={styles.thumb} />
              ) : (
                <View style={[styles.thumb, styles.thumbPlaceholder]}>
                  <Text style={styles.thumbText}>No image</Text>
                </View>
              )}

              <View style={{ flex: 1 }}>
                <Text style={styles.commonName}>
                  {common ? common : "Unknown common name"}
                </Text>
                <Text style={styles.sciName}>{sci}</Text>
                <Text style={styles.confidence}>
                  Confidence: {toPercent(item.score)}
                </Text>

                  <View style={styles.cardBtns}>
                  {/* Select */}
                  <TouchableOpacity
                    style={styles.cardBtn}
                    onPress={() => selectResult(item)}
                  >
                    <Text style={styles.cardBtnText}>Select</Text>
                  </TouchableOpacity>

                  {/* Pin to Map */}
                  <TouchableOpacity
                    style={[
                      styles.cardBtn,
                      savingId === item.scientificName && styles.btnDisabled,
                    ]}
                    disabled={savingId === item.scientificName}
                    onPress={() => confirmPin(item)}
                  >
                    {savingId === item.scientificName ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.cardBtnText}>Pin to Map</Text>
                    )}
                  </TouchableOpacity>

                  {/* Wikipedia */}
                  {wiki ? (
                    <TouchableOpacity
                      style={styles.cardBtnOutline}
                      onPress={() => openWiki(wiki)}
                    >
                      <Text style={styles.cardBtnOutlineText}>Wikipedia</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          !loading && imageAsset ? (
            <Text style={styles.subtle}>No results yet. Tap “Identify”.</Text>
          ) : null
        }
      />

      <Link href="/" style={styles.Link}>
        Back Home
      </Link>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  h1: { fontSize: 22, fontWeight: "700", marginTop: 8, marginBottom: 12 },
  row: { flexDirection: "row", gap: 12, marginBottom: 12 },
  btn: {
    backgroundColor: "#f0c93d",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  btnDisabled: { opacity: 0.5 },
  btnText: { fontWeight: "700" },
  preview: { width: "100%", height: 220, borderRadius: 12, marginBottom: 12 },
  subtle: { color: "#666", marginVertical: 8 },
  loadingRow: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  card: {
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  thumb: { width: 72, height: 72, borderRadius: 12, backgroundColor: "#f5f5f5" },
  thumbPlaceholder: { alignItems: "center", justifyContent: "center" },
  thumbText: { fontSize: 10, color: "#999" },
  commonName: { fontSize: 16, fontWeight: "700" },
  sciName: { fontSize: 13, fontStyle: "italic", color: "#333", marginTop: 2 },
  confidence: { fontSize: 12, color: "#555", marginTop: 4 },
  cardBtns: { flexDirection: "row", gap: 8, marginTop: 8 },
  cardBtn: {
    backgroundColor: "#111",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  cardBtnText: { color: "#fff", fontWeight: "700" },
  cardBtnOutline: {
    borderWidth: 1,
    borderColor: "#111",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  cardBtnOutlineText: { color: "#111", fontWeight: "700" },
  Link: {
    marginVertical: 10,
    borderBottomWidth: 1,
    alignSelf: "center",
  },
});