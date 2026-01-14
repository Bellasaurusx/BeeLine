import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import BackButton from "./components/BackButton";
import {
  getNotifications,
  ensureDailyNotification,
  markAllRead,
} from "../src/utils/notificationsStore";


const API_URL = process.env.EXPO_PUBLIC_API_URL;

function isWithinDays(dateStr, days) {
  const t = new Date(dateStr).getTime();
  if (!Number.isFinite(t)) return false;
  const diff = Date.now() - t;
  return diff >= 0 && diff <= days * 24 * 60 * 60 * 1000;
}

function prettyCount(n) {
  if (!Number.isFinite(n)) return "0";
  return String(n);
}

export default function NotificationsScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [locationStatus, setLocationStatus] = useState("unknown"); // "granted" | "denied" | "unknown"

  useEffect(() => {
  (async () => {
    try {
      setLoading(true);

      let locStatus = "denied";
      try {
        const perm = await Location.requestForegroundPermissionsAsync();
        locStatus = perm?.status === "granted" ? "granted" : "denied";
        setLocationStatus(locStatus);
      } catch {
        setLocationStatus("denied");
      }

      let observations = [];
      if (API_URL) {
        const res = await fetch(`${API_URL}/api/observations?limit=300&sort=newest`);
        if (res.ok) {
          const data = await res.json();
          observations = Array.isArray(data) ? data : [];
        }
      }

      const last7 = observations.filter((o) => isWithinDays(o.createdAt, 7));
      const last24 = observations.filter((o) => isWithinDays(o.createdAt, 1));

      const pollinator7 = last7.filter(
        (o) => o.pollinatorFriendly === true || o.isPollinatorFriendly === true
      ).length;

      const newEvents = [];

      newEvents.push({
        id: "welcome",
        title: "Local updates",
        body: "This feed shows quick insights based on your recent plant activity.",
        type: "info",
      });

      newEvents.push({
        id: "activity-7",
        title: "This week’s activity",
        body: `You logged ${prettyCount(last7.length)} plant finds in the last 7 days. ${prettyCount(
          pollinator7
        )} were tagged pollinator-friendly.`,
        type: "activity",
      });

      if (last24.length > 0) {
        newEvents.push({
          id: "activity-24",
          title: "Recent activity",
          body: `You’ve added ${prettyCount(last24.length)} new plant${
            last24.length === 1 ? "" : "s"
          } in the last 24 hours.`,
          type: "activity",
        });
      } else {
        newEvents.push({
          id: "nudge",
          title: "Try a new find",
          body: "Snap a photo and identify a plant to add something new to your map and collection.",
          type: "tip",
        });
      }

      if (locStatus === "granted") {
        newEvents.push({
          id: "loc-on",
          title: "Location insights enabled",
          body: "BeeLine can use your area to make local activity and trends more relevant.",
          type: "location",
        });
      } else {
        newEvents.push({
          id: "loc-off",
          title: "Turn on location for better local updates",
          body: "If you enable location, BeeLine can tailor insights to what’s happening around you.",
          type: "location",
        });
      }

      newEvents.push({
        id: "seasonal",
        title: "Seasonal reminder",
        body: "Pollinator-friendly plants thrive with consistency. Even small patches can make a difference over time.",
        type: "tip",
      });

      await ensureDailyNotification();

      const saved = await getNotifications();

      const combined = [...saved, ...newEvents];

      await markAllRead();

      setEvents(combined);
    } catch (e) {
      console.error("Notifications load failed:", e);
      setEvents([
        {
          id: "fallback",
          title: "Notifications",
          body: "Your local updates will appear here during beta testing.",
          type: "info",
        },
      ]);
    } finally {
      setLoading(false);
    }
  })();
}, []);

  const header = useMemo(() => {
    return (
      <View style={styles.headerWrap}>
        <BackButton />
        <Text style={styles.header}>Notifications</Text>
        <Text style={styles.subheader}>Quick local insights and reminders.</Text>
      </View>
    );
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardBody}>{item.body}</Text>

        {item.type === "tip" && (
          <TouchableOpacity style={styles.smallBtn} onPress={() => router.push("/camera")}>
            <Text style={styles.smallBtnText}>Go to Identify</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {header}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Loading updates…</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(x) => x.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4c6233", paddingTop: 60, paddingHorizontal: 16 },
  headerWrap: { marginBottom: 14 },
  header: { color: "#fff", fontSize: 28, fontWeight: "800", marginTop: 10 },
  subheader: { color: "#BFD4CE", marginTop: 6 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "#BFD4CE", marginTop: 10 },

  listContent: { paddingBottom: 24 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#5C4033",
  },
  cardTitle: { color: "#111111", fontWeight: "800", fontSize: 16, marginBottom: 6 },
  cardBody: { color: "#333333", fontSize: 14, lineHeight: 20 },

  smallBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#F9B233",
  },
  smallBtnText: { color: "#111111", fontWeight: "800" },
});
