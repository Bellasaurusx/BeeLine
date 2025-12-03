import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function PlantDetailsScreen() {
  const router = useRouter();
  const {
    commonName = "",
    scientificName = "",
    imageUrl = "",
    confidence = "",
    createdAt = "",
    lat = "",
    lng = "",
  } = useLocalSearchParams();

  const confidencePct =
    confidence && !Number.isNaN(parseFloat(confidence))
      ? Math.round(parseFloat(confidence) * 100)
      : null;

  const formattedDate =
    createdAt && !Number.isNaN(Date.parse(createdAt))
      ? new Date(createdAt).toLocaleString()
      : "";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backLink}>← Back to collection</Text>
      </TouchableOpacity>

      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.imagePlaceholderText}>No image available</Text>
        </View>
      )}

      <Text style={styles.commonName}>
        {commonName || "Unknown plant"}
      </Text>

      {!!scientificName && (
        <Text style={styles.scientificName}>{scientificName}</Text>
      )}

      {confidencePct !== null && (
        <Text style={styles.meta}>
          Identification confidence: {confidencePct}%
        </Text>
      )}

      {!!formattedDate && (
        <Text style={styles.meta}>Pinned on {formattedDate}</Text>
      )}

      {(lat || lng) && (
        <Text style={styles.meta}>
          Location: {lat && lng ? `${lat}, ${lng}` : lat || lng}
        </Text>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Smart Layer Info</Text>
        <Text style={styles.sectionBody}>
          Future versions of BeeLine will show native vs. invasive status,
          bloom season, and pollinator value here using the Smart Layer data.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16, paddingBottom: 32 },
  backLink: {
    color: "#111",
    marginBottom: 12,
    textDecorationLine: "underline",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#eee",
  },
  imagePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: { color: "#555", fontSize: 12 },
  commonName: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
  scientificName: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 8,
  },
  meta: { color: "#666", marginBottom: 4 },
  section: { marginTop: 16 },
  sectionTitle: { fontWeight: "700", marginBottom: 4, fontSize: 16 },
  sectionBody: { color: "#444", lineHeight: 20 },
});
