import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
import { getUnread } from "../src/utils/notificationsStore";

import MapIcon from "../assets/mapicon.png";
import CamIcon from "../assets/cameraicon.png";
import GalleryIcon from "../assets/galleryicon.png";
import SettingsIcon from "../assets/settingsicon.png";
import HomeIcon from "../assets/homeicon.png";
import Img1 from "../assets/flower1.png";
import Img2 from "../assets/flower2.jpg";
import BellIcon from "../assets/bell-icon.png";

// --- Daily Tip config ---
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const TIPS_KEY = "beeline:tips:v1";
const TIPS_FETCHED_AT_KEY = "beeline:tips:fetchedAt:v1";
const TIP_OF_DAY_ID_KEY = "beeline:tipOfDayId:v1";
const TIP_OF_DAY_DATE_KEY = "beeline:tipOfDayDate:v1";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function Home() {
  const router = useRouter();

    // --- Daily Fact state ---
  const [dailyFact, setDailyFact] = useState("Loading today's fact...");

  const [hasUnread, setHasUnread] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;

      (async () => {
        try {
          const unread = await getUnread();
          if (mounted) setHasUnread(unread);
        } catch (e) {
          console.log("Unread check failed:", e);
        }
      })();

      return () => {
        mounted = false;
      };
    }, [])
  );

  // --- Load daily fact from DB tips (cached, changes once/day) ---
  useEffect(() => {
    let cancelled = false;

    async function loadDailyFact() {
      try {
        const today = new Date().toISOString().slice(0, 10); 

        const [cachedJson, fetchedAtStr, savedId, savedDate] = await Promise.all([
          AsyncStorage.getItem(TIPS_KEY),
          AsyncStorage.getItem(TIPS_FETCHED_AT_KEY),
          AsyncStorage.getItem(TIP_OF_DAY_ID_KEY),
          AsyncStorage.getItem(TIP_OF_DAY_DATE_KEY),
        ]);

        let tips = cachedJson ? JSON.parse(cachedJson) : [];
        const fetchedAt = fetchedAtStr ? Number(fetchedAtStr) : 0;
        const isFresh = fetchedAt && Date.now() - fetchedAt < ONE_DAY_MS;

        if (savedId && savedDate === today && Array.isArray(tips) && tips.length) {
          const found = tips.find((t) => String(t.id) === String(savedId));
          if (found && !cancelled) {
            setDailyFact(found.tip || found.insight || "Check out today's tip.");
            return;
          }
        }

        if (!isFresh || !Array.isArray(tips) || tips.length === 0) {
          if (!API_URL) throw new Error("EXPO_PUBLIC_API_URL is not set");

          const res = await fetch(`${API_URL}/api/tips?limit=365`);
          if (!res.ok) throw new Error(`Failed to fetch tips: ${res.status}`);
          tips = await res.json();

          await Promise.all([
            AsyncStorage.setItem(TIPS_KEY, JSON.stringify(tips)),
            AsyncStorage.setItem(TIPS_FETCHED_AT_KEY, String(Date.now())),
          ]);
        }

        if (!Array.isArray(tips) || tips.length === 0) {
          if (!cancelled) setDailyFact("No tips available yet.");
          return;
        }

        // Deterministic "tip of the day" pick
        const start = new Date(new Date().getFullYear(), 0, 0);
        const diff = Date.now() - start.getTime();
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        const chosen = tips[dayOfYear % tips.length];

        await Promise.all([
          AsyncStorage.setItem(TIP_OF_DAY_ID_KEY, String(chosen.id)),
          AsyncStorage.setItem(TIP_OF_DAY_DATE_KEY, today),
        ]);

        if (!cancelled) {
          setDailyFact(chosen.tip || chosen.insight || "Check out today's tip.");
        }
      } catch (e) {
        console.log("Daily fact error:", e);
        if (!cancelled) setDailyFact("Bees fly about 20 mph.");
      }
    }

    loadDailyFact();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={styles.container}>

      {/* Daily Tip */}
      <View style={styles.factBox}>
        <Text style={styles.factText}>Daily Tip:</Text>
        <Text style={styles.factSub}>{dailyFact}</Text>
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
          <Image source={MapIcon} style={styles.iconImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push("/camera")}
        >
          <Image source={CamIcon} style={styles.iconImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push("/collection")}
        >
          <Image source={GalleryIcon} style={styles.iconImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push("/profile")}
        >
          <Image source={SettingsIcon} style={styles.iconImg} />
        </TouchableOpacity>
      </View>


      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.backArrow}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c6233", // BeeLine green
    paddingTop: 170,
    paddingHorizontal: 20,
  },

  iconBtn: {
    backgroundColor: "#5C4033",
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

  /* HEADER */
  topHeader: {
    backgroundColor: "#7fa96b",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 25,

    flexDirection: "row",
    alignItems: "center",
  },

  headerLeft: {
    flex: 1,            
  },

  headerItem: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 0,      
  },

  bellWrap: {
    position: "relative",
  },

  bell: {
    fontSize: 22,
    color: "#fff",
  },
  /* Notification Dot */
  redDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D0021B",
  },

  /* FACT BOX */
  factBox: {
    backgroundColor: "#fff",
    borderColor: "#7fa96b",
    borderWidth: 3,
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
    bottom: 100,
    gap: 16,
  },
  iconBtn: {
    backgroundColor: "#F4EBD0",
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
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
});
