import React, { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function PollinatorBadge({
  isPollinatorFriendly = false,
  variant = "pill", // "pill" | "icon"
  label = "Pollinator-Friendly",
  showInfoOnPress = true,
}) {
  const [open, setOpen] = useState(false);

  if (!isPollinatorFriendly) return null;

  const bee = require("../../assets/bee_icon.png");

  const onPress = () => {
    if (showInfoOnPress) setOpen(true);
  };

  return (
    <>
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
        {variant === "icon" ? (
          <View style={styles.iconWrap}>
            <Image source={bee} style={styles.icon} />
          </View>
        ) : (
          <View style={styles.pill}>
            <Image source={bee} style={styles.pillIcon} />
            <Text style={styles.pillText}>{label}</Text>
          </View>
        )}
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.tooltip}>
            <Text style={styles.tipTitle}>Pollinator-Friendly</Text>
            <Text style={styles.tipBody}>
              This plant supports bees, butterflies, and other pollinators.
              BeeLine identifies pollinator-friendly plants using curated ecological data and plant research.
            </Text>

            <Pressable style={styles.closeBtn} onPress={() => setOpen(false)}>
              <Text style={styles.closeText}>Got it</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },

  // pill
  pill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#f4cf65",
  },
  pillIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    resizeMode: "contain",
  },
  pillText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111",
  },

  // icon-only
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f4cf65",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },

  // tooltip modal
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 22,
  },
  tooltip: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#7fa96b",
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
    color: "#111",
  },
  tipBody: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  closeBtn: {
    marginTop: 12,
    backgroundColor: "#f4cf65",
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
  closeText: {
    fontWeight: "800",
    color: "#111",
  },
});
