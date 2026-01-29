import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function PollinatorBadge({
  isPollinatorFriendly = false,
  variant = "pill", // "pill" | "icon"
  label = "Pollinator-Friendly",
}) {
  if (!isPollinatorFriendly) return null;

  const bee = require("../../assets/bee_icon.png");

  if (variant === "icon") {
    return <Image source={bee} style={styles.icon} />;
  }

  return (
    <View style={styles.pill}>
      <Image source={bee} style={styles.pillIcon} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#E6F2E6",
  },
  pillIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    resizeMode: "contain",
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
  },
});
