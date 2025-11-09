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
import { Link } from "expo-router";

const PLANTNET_API_KEY = "2b10BuvkFTkWr8yTFdYCsSQC";
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

export default function CompVisCameraScreen() {
  const [imageAsset, setImageAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // open cams
  const handleCameraCapture = async () => {
    try {
      // 1) Ask camera permish
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

      setImageAsset(asset);
      setLoading(true);
      setResults([]);

      
      const guesses = await identifyWithPlantNet(asset);

      
      const enriched = [];
      for (const g of guesses) {
        try {
          const extra = await enrichWithINat(g.scientificName);
          enriched.push({ ...g, ...extra });
        } catch (e) {
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
      <Text style={styles.h1}>Camera test</Text>
      <Text style={styles.subtle}>
        check plant
      </Text>

      <TouchableOpacity
        style={[styles.btn, loading && styles.btnDisabled]}
        onPress={handleCameraCapture}
        disabled={loading}
      >
        <Text style={styles.btnText}>
          {loading ? "call api" : "Camera Pop-up"}
        </Text>
      </TouchableOpacity>

      {imageAsset?.uri && (
        <Image
          source={{ uri: imageAsset.uri }}
          style={styles.preview}
          resizeMode="cover"
        />
      )}

      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator />
          <Text style={{ marginLeft: 8 }}>calling api.</Text>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item, idx) => `${item.scientificName}-${idx}`}
        contentContainerStyle={{ paddingBottom: 40 }}
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
          !loading && imageAsset
            ? (
              <Text style={styles.subtle}>
                No results yet — try snapping again.
              </Text>
            )
            : null
        }
      />

      <Link href="/" style={styles.backLink}>
        <Text style={styles.backLinkText}>⬅ Back Home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  h1: { fontSize: 22, fontWeight: "700", marginTop: 8, marginBottom: 6 },
  subtle: { color: "#666", marginBottom: 14 },
  btn: {
    backgroundColor: "#f0c93d",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { fontWeight: "700", fontSize: 16 },
  preview: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 10,
    marginTop: 4,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  card: {
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  thumbPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  thumbText: { fontSize: 10, color: "#999" },
  commonName: { fontSize: 16, fontWeight: "700" },
  sciName: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#333",
    marginTop: 2,
  },
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
  backLink: {
    marginTop: 16,
    alignSelf: "center",
  },
  backLinkText: {
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 2,
    fontSize: 14,
  },
});
