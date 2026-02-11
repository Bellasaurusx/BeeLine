import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SecondaryButton({
  label,
  onPress,
  disabled = false,
  mode = "filled", // "filled" | "outline"
  size = "md", // "sm" | "md"
  style,
  textStyle,
  leftIcon = null,
}) {
  const isOutline = mode === "outline";
  const isSmall = size === "sm";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        isSmall ? styles.sm : styles.md,
        isOutline ? styles.outline : styles.filled,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      <View style={styles.row}>
        {leftIcon ? <View style={styles.iconWrap}>{leftIcon}</View> : null}
        <Text
          style={[
            styles.text,
            isSmall ? styles.textSm : styles.textMd,
            isOutline ? styles.textOutline : styles.textFilled,
            textStyle,
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  md: { height: 48 },
  sm: { height: 40, borderRadius: 12, paddingHorizontal: 12 },

  filled: {
    backgroundColor: "#f4cf65",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2E7D32",
  },

  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.55 },

  row: { flexDirection: "row", alignItems: "center" },
  iconWrap: { marginRight: 8 },

  text: { fontWeight: "700" },
  textMd: { fontSize: 16 },
  textSm: { fontSize: 14 },

  textFilled: {},
  textOutline: { color: "#2E7D32" },
});
