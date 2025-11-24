import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

// TODO: replace with your real images
import GlobeThistleImg from "../assets/flower3.png";
import AnotherPlantImg from "../assets/flower4.png";

const PLANTS = [
  {
    name: "Globe Thistle",
    image: GlobeThistleImg,
    insight:
      "This hardy pollinator magnet thrives in dry soil and reduces the need for frequent watering — making it perfect for low-impact, drought-resistant gardens. Its spiky blue blooms attract bees and butterflies, boosting biodiversity while demanding minimal maintenance.",
    tip:
      "Consider planting Globe Thistle alongside other drought-tolerant flowers like yarrow or lavender. Together, they create a self-sustaining mini-ecosystem that supports pollinators and cuts down on irrigation.",
  },
  {
    name: "Coneflower",
    image: AnotherPlantImg,
    insight:
      "Coneflowers are tough perennials that provide long-lasting blooms and a rich nectar source for bees and butterflies.",
    tip:
      "Leave dried seed heads on the plant at the end of the season to feed birds and add winter interest to your garden.",
  },
];

export default function Wellness() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const current = PLANTS[index];

  const goNext = () => {
    setIndex((prev) => (prev + 1) % PLANTS.length);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + PLANTS.length) % PLANTS.length);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Plant Image */}
        <Image source={current.image} style={styles.heroImage} />

        {/* Plant Name Pill */}
        <View style={styles.namePill}>
          <Text style={styles.nameText}>{current.name}</Text>
        </View>

        {/* Prev / Next */}
        <View style={styles.navRow}>
          <TouchableOpacity style={styles.circleBtn} onPress={goPrev}>
            <Text style={styles.circleArrow}>◀</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn} onPress={goNext}>
            <Text style={styles.circleArrow}>▶</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navLabels}>
          <Text style={styles.navLabelText}>Prev</Text>
          <Text style={styles.navLabelText}>Next</Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Sustainability Insight:</Text>
          <Text style={styles.bodyText}>{current.insight}</Text>

          <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Tip:</Text>
          <Text style={styles.bodyText}>{current.tip}</Text>
        </View>
      </ScrollView>

      {/* Back Button */}
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
    backgroundColor: "#7fb2e6", // soft blue background vibe
  },
  scrollContent: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 100,
    alignItems: "center",
  },

  heroImage: {
    width: 230,
    height: 180,
    borderRadius: 24,
    marginBottom: 12,
  },

  namePill: {
    backgroundColor: "#2f6fbf",
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
  },
  nameText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },

  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 140,
    marginBottom: 4,
  },
  circleBtn: {
    backgroundColor: "#4d90d8",
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  circleArrow: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  navLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 140,
    marginBottom: 24,
  },
  navLabelText: {
    color: "#fff",
    fontSize: 14,
  },

  infoCard: {
    backgroundColor: "#4d90d8",
    padding: 16,
    borderRadius: 16,
    width: "100%",
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 4,
  },
  bodyText: {
    color: "#f3f7ff",
    fontSize: 13,
    lineHeight: 18,
  },

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
