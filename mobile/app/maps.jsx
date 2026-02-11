import React from "react";
import { View, StyleSheet } from "react-native";
import MapScreen from "../src/screens/MapScreen";

export default function MapsPage() {
  return (
    <View style={styles.container}>
      <MapScreen />

      {/* BeeLine Back Button */}
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
  },
});
