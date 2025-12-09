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
import { useRouter } from "expo-router";

const GALLERY_KEY = "@plant_gallery_uris";

export default function PhotoGalleryScreen() {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();

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
        Photos taken with the identification camera.
      </Text>

      <View style={styles.topRow}>
        <TouchableOpacity style={styles.yellowBtn} onPress={loadGallery}>
          <Text style={styles.yellowBtnText}>Refresh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.yellowBtn} onPress={clearGallery}>
          <Text style={styles.yellowBtnText}>Clear</Text>
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
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View style={styles.thumbWrapper}>
              <Image source={{ uri: item }} style={styles.thumb} />
            </View>
          )}
        />
      )}

      {/* Back Button (BeeLine style) */}
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
    padding: 20,
    paddingTop: 50,
  },
  h1: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  subtle: {
    color: "#fff",
    opacity: 0.8,
    marginBottom: 20,
  },

  /* Buttons */
  yellowBtn: {
    backgroundColor: "#f4cf65",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  yellowBtnText: {
    fontWeight: "600",
    color: "#333",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  emptyText: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    opacity: 0.8,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  thumbWrapper: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 3,
  },
  thumb: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#eee",
  },

  /* Back Button */
  backButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
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
