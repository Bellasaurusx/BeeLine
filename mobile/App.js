import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StatusBar } from "react-native";
import Constants from "expo-constants";

export default function App() {
  const [status, setStatus] = useState("checking…");
  const [error, setError] = useState("");

  const apiUrl =
    (Constants?.expoConfig?.extra && Constants.expoConfig.extra.EXPO_PUBLIC_API_URL) ||
    (Constants?.manifest2?.extra && Constants.manifest2.extra.EXPO_PUBLIC_API_URL) ||
    "";

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        if (!apiUrl) throw new Error("API URL not set in app.json extra.EXPO_PUBLIC_API_URL");
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
    return () => { cancelled = true; };
  }, [apiUrl]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 16 }}>
      <StatusBar barStyle="dark-content" />
      <Text style={{ fontSize: 24, marginBottom: 10 }}>BeeLine</Text>
      <Text style={{ fontSize: 16, marginBottom: 6 }}>API status: {status}</Text>
      {error ? <Text style={{ color: "red", textAlign: "center" }}>{error}</Text> : null}
      {!apiUrl ? <Text style={{ color: "orange", marginTop: 8, textAlign: "center" }}>Tip: set EXPO_PUBLIC_API_URL in app.json</Text> : null}
      <Text style={{ marginTop: 12, opacity: 0.7 }}>{apiUrl || "(no API URL set)"}</Text>
    </SafeAreaView>
  );
}

