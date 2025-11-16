// app/photogal.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";

const GALLERY_KEY = "@plant_gallery_uris";

export default function PhotoGalleryScreen() {
  const [photos, setPhotos] = useState([]);

  const loadGallery = async () => {
    try {
      const stored = await AsyncStorage.getItem(GALLERY_KEY);
      const arr = stored ? JSON.parse(stored) : [];
      setPhotos(arr);
    } catch (e) {
      console.warn("Failed to load gallery", e);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const clearGallery = async () => {
    try {
      await AsyncStorage.removeItem(GALLERY_KEY);
      setPhotos([]);
    } catch (e) {
      console.warn("Failed to clear gallery", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Photo Gallery</Text>
      <Text style={styles.subtle}>
        Photos taken with the camera on the Identify screen.
      </Text>

      <View style={styles.topRow}>
        <TouchableOpacity style={styles.refreshBtn} onPress={loadGallery}>
          <Text style={styles.refreshText}>🔄 Refresh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearBtn} onPress={clearGallery}>
          <Text style={styles.clearText}>🗑 Clear</Text>
        </TouchableOpacity>
      </View>

      {photos.length === 0 ? (
        <Text style={styles.emptyText}>
          No photos yet. Go take one on the Identify screen ✨
        </Text>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(uri, idx) => uri + idx}
          numColumns={3}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={styles.thumbWrapper}>
              <Image source={{ uri: item }} style={styles.thumb} />
            </View>
          )}
        />
      )}

      <View style={styles.footer}>
        <Link href="/identify" style={styles.footerLink}>
          <Text style={styles.footerLinkText}>⬅ Back to Identify</Text>
        </Link>
        <Link href="/" style={styles.footerLink}>
          <Text style={styles.footerLinkText}>🏠 Home</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  h1: { fontSize: 22, fontWeight: "700", marginTop: 8, marginBottom: 4 },
  subtle: { color: "#666", marginBottom: 12 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  refreshBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#111",
  },
  refreshText: { fontWeight: "600" },
  clearBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fce4e4",
    borderWidth: 1,
    borderColor: "#d33",
  },
  clearText: { fontWeight: "600", color: "#a00" },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    color: "#777",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 8,
  },
  thumbWrapper: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 2,
  },
  thumb: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  footer: {
    marginTop: 16,
    alignItems: "center",
    gap: 6,
  },
  footerLink: {},
  footerLinkText: {
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 2,
    fontSize: 14,
  },
});
