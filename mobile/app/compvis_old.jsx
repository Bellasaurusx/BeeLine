// app/identify.jsx
import React, { useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";

const PLANTNET_API_KEY = "2b10BuvkFTkWr8yTFdYCsSQC";
const PLANTNET_ENDPOINT = "https://my-api.plantnet.org/v2/identify/all";
const GALLERY_KEY = "@plant_gallery_uris";

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
        "Unknown",
      score: r?.score ?? 0,
    })) || [];

  return suggestions.slice(0, 5);
}

async function enrichWithINat(scientificName) {
  const url = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(
    scientificName
  )}&rank=species`;
  const r = await fetch(url);
  const j = await r.json();

  const taxon = j?.results?.[0];
  if (!taxon) return { taxon: null };

  return {
    taxon: {
      id: taxon.id,
      scientificName: taxon.name,
      commonName: taxon.preferred_common_name || null,
      photo:
        taxon.default_photo?.medium_url ||
        taxon.default_photo?.square_url ||
        null,
      wiki: taxon.wikipedia_url || null,
    },
  };
}

// 👉 helper to append a URI to gallery in AsyncStorage
async function addToGallery(uri) {
  try {
    const existing = await AsyncStorage.getItem(GALLERY_KEY);
    const arr = existing ? JSON.parse(existing) : [];
    const updated = [uri, ...arr]; // newest first
    await AsyncStorage.setItem(GALLERY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to save to gallery", e);
  }
}

export default function IdentifyScreen() {
  const [imageAsset, setImageAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();

  // 📁 Upload from gallery (does NOT auto-add to gallery, just for id)
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

  // 📷 Take a photo with camera (this IS added to gallery)
  const handleCameraCapture = async () => {
    try {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        Alert.alert(
          "Camera permission needed",
          "I need access to your camera to identify a plant."
        );
        return;
      }

      const res = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
      });

      if (res.canceled) return;

      const asset = res.assets?.[0];
      if (!asset?.uri) {
        Alert.alert("Oops", "Couldn't read image.");
        return;
      }

      // 💾 save this camera photo into gallery
      await addToGallery(asset.uri);

      setImageAsset(asset);
      setResults([]);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message || "Camera failed.");
    }
  };

  // 🔍 Run identification (shared for upload + camera)
  const identify = async () => {
    if (!imageAsset?.uri) {
      Alert.alert("No image", "Choose or take a photo first.");
      return;
    }

    try {
      setLoading(true);
      setResults([]);

      const guesses = await identifyWithPlantNet(imageAsset);

      const enriched = [];
      for (const g of guesses) {
        try {
          const extra = await enrichWithINat(g.scientificName);
          enriched.push({ ...g, ...extra });
        } catch {
          enriched.push({ ...g, taxon: null });
        }
      }

      setResults(enriched);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message || "Identification failed.");
    } finally {
      setLoading(false);
    }
  };

  const selectResult = (item) => {
    const label = item?.taxon?.commonName
      ? `${item.taxon.commonName} (${item.scientificName})`
      : item.scientificName;
    Alert.alert("Selected", `You selected: ${label}`);
  };

  const openWiki = (url) => {
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Identify a Plant</Text>

      {/* Top row: upload + camera buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.yellowBtn, loading && styles.btnDisabled]}
          onPress={pickImage}
          disabled={loading}
        >
          <Text style={styles.yellowBtnText}>Upload Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.yellowBtn, loading && styles.btnDisabled]}
          onPress={handleCameraCapture}
          disabled={loading}
        >
          <Text style={styles.yellowBtnText}>Use Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Identify button */}
      <TouchableOpacity
        style={[
          styles.identifyBtn,
          (!imageAsset || loading) && styles.btnDisabled,
        ]}
        onPress={identify}
        disabled={!imageAsset || loading}
      >
        <Text style={styles.identifyText}>
          {loading ? "Identifying…" : "Identify Plant"}
        </Text>
      </TouchableOpacity>

      {/* Preview */}
      {imageAsset?.uri ? (
        <Image
          source={{ uri: imageAsset.uri }}
          style={styles.preview}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.subtle}>
          Upload or take a photo to get started.
        </Text>
      )}

      {/* Loading state */}
      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator color="#f4cf65" />
          <Text style={styles.loadingText}>Talking to the plant gods…</Text>
        </View>
      )}

      {/* Results list */}
      <FlatList
        data={results}
        keyExtractor={(item, idx) => `${item.scientificName}-${idx}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          const img = item?.taxon?.photo;
          const common = item?.taxon?.commonName;
          const sci = item?.scientificName;
          const wiki = item?.taxon?.wiki;

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
                  {common || "Unknown common name"}
                </Text>
                <Text style={styles.sciName}>{sci}</Text>
                <Text style={styles.confidence}>
                  Confidence: {toPercent(item.score)}
                </Text>

                <View style={styles.cardBtns}>
                  <TouchableOpacity
                    style={styles.cardBtn}
                    onPress={() => selectResult(item)}
                  >
                    <Text style={styles.cardBtnText}>Select</Text>
                  </TouchableOpacity>

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
            <Text style={styles.subtle}>
              No results yet. Tap “Identify Plant”.
            </Text>
          ) : null
        }
      />

      {/* Footer link to gallery */}
      <View style={styles.footer}>
        <Link href="/photogal" style={styles.footerLink}>
          <Text style={styles.footerLinkText}>📸 View Photo Gallery</Text>
        </Link>
      </View>

      {/* BeeLine back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c6233", // BeeLine green
    paddingHorizontal: 18,
    paddingTop: 50,
  },
  h1: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  subtle: {
    color: "#fff",
    opacity: 0.8,
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  /* Buttons */
  yellowBtn: {
    flex: 1,
    backgroundColor: "#f4cf65",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  yellowBtnText: {
    fontWeight: "600",
    color: "#333",
  },
  identifyBtn: {
    backgroundColor: "#f4cf65",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  identifyText: {
    fontWeight: "700",
    color: "#333",
  },
  btnDisabled: {
    opacity: 0.5,
  },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  loadingText: {
    marginLeft: 8,
    color: "#fff",
  },

  /* Results cards */
  card: {
    flexDirection: "row",
    gap: 10,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f6f2da", // light card on green
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#eee",
  },
  thumbPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  thumbText: {
    fontSize: 10,
    color: "#777",
  },
  commonName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  sciName: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#444",
    marginTop: 2,
  },
  confidence: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  cardBtns: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  cardBtn: {
    backgroundColor: "#4c6233",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  cardBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  cardBtnOutline: {
    borderWidth: 1,
    borderColor: "#4c6233",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  cardBtnOutlineText: {
    color: "#4c6233",
    fontWeight: "600",
  },

  footer: {
    marginTop: 10,
    alignItems: "center",
  },
  footerLink: {},
  footerLinkText: {
    color: "#f4cf65",
    fontWeight: "500",
  },

  /* BeeLine back button */
  backButton: {
    position: "absolute",
    bottom: 30,
    right: 25,
    backgroundColor: "#f4cf65",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backArrow: {
    fontSize: 24,
    color: "#333",
  },
});
