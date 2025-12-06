
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
} from "react-native";
import MapScreen from "./src/screens/MapScreen";
import IdentifyScreen from "./app/camera";
import CollectionScreen from "./app/collection";

export default function App() {
  const [screen, setScreen] = useState("map"); // "map" | "identify" | "collection"


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <StatusBar barStyle="dark-content" />

      {/* Simple header */}
      <Text style={{ fontSize: 24, marginBottom: 10, textAlign: "center" }}>
        BeeLine
      </Text>

      {/* Toggle buttons */}
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

        <TouchableOpacity
          onPress={() => setScreen("collection")}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: screen === "collection" ? "#111" : "#ccc",
            backgroundColor: screen === "collection" ? "#111" : "#fff",
          }}
        >
          <Text
            style={{
              color: screen === "collection" ? "#fff" : "#111",
            }}
          >
            Collection
          </Text>
        </TouchableOpacity>
      </View>

            <View style={{ flex: 1, marginTop: 12 }}>
        {screen === "map" && <MapScreen />}
        {screen === "identify" && <IdentifyScreen />}
        {screen === "collection" && <CollectionScreen />}
      </View>
    </SafeAreaView>
  );
}
