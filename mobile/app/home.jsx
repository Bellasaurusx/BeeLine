import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
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

  const [dailyFact, setDailyFact] = useState("Loading today's tip...");
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

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => router.push("/login") },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>BeeLine</Text>
          <Text style={styles.headerSub}>Home Dashboard</Text>
        </View>

        <TouchableOpacity
          style={styles.notifBtn}
          onPress={() => router.push("/notifications")}
          activeOpacity={0.8}
        >
          <Image source={BellIcon} style={styles.notifIcon} />
          {hasUnread && <View style={styles.redDot} />}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Daily Tip Card */}
        <View style={styles.tipCard}>
          <Text style={styles.tipLabel}>Daily Tip</Text>
          <Text style={styles.tipText}>{dailyFact}</Text>
        </View>

        {/* Feature Tiles */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.tilesRow}>
          <TouchableOpacity
            style={styles.tile}
            onPress={() => router.push("/photogal")}
            activeOpacity={0.85}
          >
            <Image source={Img1} style={styles.tileImage} />
            <View style={styles.tileOverlay}>
              <Text style={styles.tileTitle}>Recent Photos</Text>
              <Text style={styles.tileSub}>See your latest uploads</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tile}
            onPress={() => router.push("/wellness")}
            activeOpacity={0.85}
          >
            <Image source={Img2} style={styles.tileImage} />
            <View style={styles.tileOverlay}>
              <Text style={styles.tileTitle}>Wellness</Text>
              <Text style={styles.tileSub}>Eco habits + reminders</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Logout button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={confirmLogout} activeOpacity={0.85}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Right Dock */}
      <View style={styles.dock}>
        <DockBtn icon={MapIcon} onPress={() => router.push("/maps")} />
        <DockBtn icon={CamIcon} onPress={() => router.push("/camera")} />
        <DockBtn icon={GalleryIcon} onPress={() => router.push("/collection")} />
        <DockBtn icon={SettingsIcon} onPress={() => router.push("/profile")} />
      </View>
    </View>
  );
}

function DockBtn({ icon, onPress }) {
  return (
    <TouchableOpacity style={styles.dockBtn} onPress={onPress} activeOpacity={0.85}>
      <Image source={icon} style={styles.dockIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c6233",
  },

  header: {
    paddingTop: 58,
    paddingBottom: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  headerSub: {
    marginTop: 2,
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
  },

  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(244, 207, 101, 0.22)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  redDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#D0021B",
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },

  sectionTitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 14,
    marginBottom: 10,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },

  tipCard: {
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  tipLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  tipText: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },

  tilesRow: {
    flexDirection: "row",
    gap: 12,
  },
  tile: {
    flex: 1,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(0,0,0,0.12)",
  },
  tileImage: {
    width: "100%",
    height: 170,
  },
  tileOverlay: {
    padding: 10,
  },
  tileTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },
  tileSub: {
    marginTop: 2,
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
  },

  logoutBtn: {
    marginTop: 18,
    backgroundColor: "#f4cf65",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#2d2d2d",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 0.3,
  },

  // Right-side dock
  dock: {
    position: "absolute",
    right: 16,
    bottom: 24,
    gap: 12,
  },
  dockBtn: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  dockIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
