import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { useLeftHand } from "./LeftHandContext";

import MapIcon from "../assets/mapicon.png";
import CamIcon from "../assets/cameraicon.png";
import GalleryIcon from "../assets/galleryicon.png";
import HomeIcon from "../assets/homeicon.png";
import SettingsIcon from "../assets/settingsicon.png"; // <-- add this asset (or remove this line)

import Img1 from "../assets/flower1.jpg";
import Img2 from "../assets/flower2.jpg";

export default function Home() {
  const router = useRouter();
  const { leftHandMode } = useLeftHand();

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Text style={styles.headerItem}>BeeLine</Text>
      </View>

      {/* Daily Fact */}
      <View style={styles.factBox}>
        <Text style={styles.factText}>Daily Facts:</Text>
        <Text style={styles.factSub}>Bees fly about 20 mph.</Text>
      </View>

      {/* Main Image Tiles */}
      <View style={styles.tiles}>
        <TouchableOpacity
          style={styles.tileWrapper}
          onPress={() => router.push("/photogal")}
        >
          <Image source={Img1} style={styles.tileImage} />
          <Text style={styles.tileLabel}>Recent Photos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tileWrapper}
          onPress={() => router.push("/wellness")}
        >
          <Image source={Img2} style={styles.tileImage} />
          <Text style={styles.tileLabel}>Wellness</Text>
        </TouchableOpacity>
      </View>

      {/* Sidebar Buttons (moves left/right based on Left Hand Mode) */}
      <View
        style={[
          styles.sidebar,
          leftHandMode ? styles.sidebarLeft : styles.sidebarRight,
        ]}
      >
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push("/maps")}>
          <Image source={MapIcon} style={styles.iconImg} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push("/compvis")}>
          <Image source={CamIcon} style={styles.iconImg} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push("/photogal")}>
          <Image source={GalleryIcon} style={styles.iconImg} />
        </TouchableOpacity>


        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push("/profile")}>
          <Image source={SettingsIcon} style={styles.iconImg} />
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/login")}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c6233", // BeeLine green
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  /* HEADER */
  topHeader: {
    backgroundColor: "#7fa96b",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 25,
  },
  headerItem: {
    color: "#fff",
    fontSize: 18,
  },

  /* FACT BOX */
  factBox: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 25,
  },
  factText: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  factSub: {
    textAlign: "center",
    marginTop: 4,
  },

  /* TILE IMAGES */
  tiles: {
    alignItems: "center",
    gap: 25,
  },
  tileWrapper: {
    alignItems: "center",
  },
  tileImage: {
    width: 200,
    height: 150,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "#7fa96b",
  },
  tileLabel: {
    color: "#fff",
    marginTop: 6,
    fontSize: 16,
  },

  /* SIDEBAR ICONS */
  sidebar: {
    position: "absolute",
    bottom: 100,
    gap: 16,
  },
  sidebarRight: {
    right: 20,
  },
  sidebarLeft: {
    left: 20,
  },
  iconBtn: {
    backgroundColor: "#F4EBD0",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  iconImg: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },

  /* BACK BUTTON */
  backButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
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
    fontSize: 26,
    color: "#333",
  },
});
