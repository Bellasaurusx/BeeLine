import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import MapScreen from "../src/screens/MapScreen";

export default function MapsPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back button overlay space */}
      <MapScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

