import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Contact = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maps</Text>

      {/* BeeLine Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c6233", // BeeLine green
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 20,
  },

  /* BeeLine Back Button */
  backButton: {
    position: "absolute",
    bottom: 40,
    right: 30,
    backgroundColor: "#f4cf65",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  backArrow: {
    fontSize: 26,
    color: "#333",
    fontWeight: "600",
  },
});
