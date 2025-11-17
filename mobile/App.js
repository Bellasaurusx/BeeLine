import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import MapScreen from "./src/screens/MapScreen";
import IdentifyScreen from "./app/camera";

export default function App() {
  const [status, setStatus] = useState("checking…");
  const [error, setError] = useState("");
  const [screen, setScreen] = useState("map"); 

  const apiUrl =
    (Constants?.expoConfig?.extra &&
      Constants.expoConfig.extra.EXPO_PUBLIC_API_URL) ||
    (Constants?.manifest2?.extra &&
      Constants.manifest2.extra.EXPO_PUBLIC_API_URL) ||
    "";

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        if (!apiUrl)
          throw new Error("API URL not set in app.json extra.EXPO_PUBLIC_API_URL");
        const res = await fetch(`${apiUrl}/health`, { method: "GET" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const j = await res.json();
        if (!cancelled) setStatus(j?.status || "unknown");
      } catch (e) {
        if (!cancelled) {
          setStatus("offline");
          setError(String(e?.message || e));
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <StatusBar barStyle="dark-content" />

      <Text style={{ fontSize: 24, marginBottom: 10, textAlign: "center" }}>
        BeeLine
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 6, textAlign: "center" }}>
        API status: {status}
      </Text>
      {error ? (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      ) : null}
      {!apiUrl ? (
        <Text
          style={{
            color: "orange",
            marginTop: 8,
            textAlign: "center",
          }}
        >
          Tip: set EXPO_PUBLIC_API_URL in app.json
        </Text>
      ) : null}
      <Text
        style={{
          marginTop: 12,
          opacity: 0.7,
          textAlign: "center",
        }}
      >
        {apiUrl || "(no API URL set)"}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 12,
          gap: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => setScreen("map")}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: screen === "map" ? "#111" : "#ccc",
            backgroundColor: screen === "map" ? "#111" : "#fff",
            marginRight: 8,
          }}
        >
          <Text
            style={{
              color: screen === "map" ? "#fff" : "#111",
              fontWeight: "600",
            }}
          >
            Map
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setScreen("identify")}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: screen === "identify" ? "#111" : "#ccc",
            backgroundColor: screen === "identify" ? "#111" : "#fff",
          }}
        >
          <Text
            style={{
              color: screen === "identify" ? "#fff" : "#111",
              fontWeight: "600",
            }}
          >
            Identify
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, marginTop: 12 }}>
        {screen === "map" ? <MapScreen /> : <IdentifyScreen />}
      </View>
    </SafeAreaView>
  );
}
