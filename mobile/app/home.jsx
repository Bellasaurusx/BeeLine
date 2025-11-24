import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";

import Img1 from "../assets/flower1.jpg";   // replace with real assets
import Img2 from "../assets/flower2.jpg";   // replace with real assets

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Link href="/profile">
        <Text style={styles.headerItem}>⚙️ Settings</Text>
      </Link>
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

      {/* Right Sidebar Buttons */}
      <View style={styles.sidebar}>
        <TouchableOpacity 
          style={styles.iconBtn}
          onPress={() => router.push("/maps")}
        >
          <Text style={styles.icon}>Map</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push("/compvis")}
        >
          <Text style={styles.icon}>Cam</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push("/photogal")}
        >
          <Text style={styles.icon}>Gal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.icon}>home</Text>
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/login")}
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
    marginBottom: 6,
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
    right: 20,
    top: 180,
    gap: 16,
  },
  iconBtn: {
    backgroundColor: "#f4cf65",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 22,
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
