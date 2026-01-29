import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
import { getUnread } from "../src/utils/notificationsStore";

import MapIcon from "../assets/mapicon.png";
import CamIcon from "../assets/cameraicon.png";
import GalleryIcon from "../assets/galleryicon.png";
import SettingsIcon from "../assets/settingsicon.png";
import Img1 from "../assets/flower1.png";
import Img2 from "../assets/flower2.jpg";
import Logo from "../assets/HD_SPLASH_TRANS.png";


// --- Daily Tip config ---
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const TIPS_KEY = "beeline:tips:v1";
const TIPS_FETCHED_AT_KEY = "beeline:tips:fetchedAt:v1";
const TIP_OF_DAY_ID_KEY = "beeline:tipOfDayId:v1";
const TIP_OF_DAY_DATE_KEY = "beeline:tipOfDayDate:v1";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function Home() {
  const router = useRouter();

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

      {/* Top Logo */}
      <View style={styles.logoWrap}>
        <Image source={Logo} style={styles.logo} />
      </View>

      {/* Main Image Tiles */}
      <View style={styles.tiles}>
        <TouchableOpacity style={styles.tileWrapper} onPress={() => router.push("/photogal")}>
          <Image source={Img1} style={styles.tileImage} />
          <Text style={styles.tileLabel}>Recent Photos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tileWrapper} onPress={() => router.push("/wellness")}>
          <Image source={Img2} style={styles.tileImage} />
          <Text style={styles.tileLabel}>Wellness</Text>
        </TouchableOpacity>
      </View>

      {/* Right Sidebar Buttons (icon + label) */}
      <View style={styles.sidebar}>
        <TouchableOpacity style={styles.iconItem} onPress={() => router.push("/maps")}>
          <View style={styles.iconBtn}>
            <Image source={MapIcon} style={styles.iconImg} />
          </View>
          <Text style={styles.iconLabel}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem} onPress={() => router.push("/camera")}>
          <View style={styles.iconBtn}>
            <Image source={CamIcon} style={styles.iconImg} />
          </View>
          <Text style={styles.iconLabel}>Identify</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem} onPress={() => router.push("/collection")}>
          <View style={styles.iconBtn}>
            <Image source={GalleryIcon} style={styles.iconImg} />
          </View>
          <Text style={styles.iconLabel}>Collection</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem} onPress={() => router.push("/profile")}>
          <View style={styles.iconBtn}>
            <Image source={SettingsIcon} style={styles.iconImg} />
          </View>
          <Text style={styles.iconLabel}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Logout (pill button, not squished) */}
      <TouchableOpacity style={styles.logoutBtn} onPress={() => router.push("/login")}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c6233",
    paddingTop: 175,
    paddingHorizontal: 20,
  },

  logoWrap: {
  position: "absolute",
  top: 55,
  left: 0,
  right: 0,
  alignItems: "center",
},

logo: {
  width: 170,
  height: 120,
  resizeMode: "contain",
},


  /* FACT BOX */
  factBox: {
    backgroundColor: "#fff",
    borderColor: "#7fa96b",
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 25,
    width: "90%",
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
    right: 18,
    bottom: 120,
    gap: 16,
    alignItems: "center",
  },
  iconItem: {
    alignItems: "center",
  },
  iconBtn: {
    backgroundColor: "#F4EBD0",
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  iconImg: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  iconLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
    opacity: 0.95,
  },

  /* LOGOUT PILL */
  logoutBtn: {
    position: "absolute",
    bottom: 28,
    left: 20,
    backgroundColor: "#f4cf65",
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "700",
  },
});
