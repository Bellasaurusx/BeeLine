import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";

export default function BackButton({ to }) {
  const router = useRouter();

  const handlePress = () => {
    if (to) {
      router.push(to);
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.arrow}>←</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFD670", 
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  arrow: {
    fontSize: 26,
    fontWeight: "400",
    color: "#222",
    marginLeft: -2, 
  },
});

