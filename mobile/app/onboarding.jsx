import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const KEY = "beeline:onboardingSeen:v1";

const STEPS = [
  { title: "Welcome to BeeLine", body: "Identify plants, save them, and learn what helps pollinators." },
  { title: "Identify", body: "Snap a photo to identify and learn about the plants in your area" },
  { title: "Smart Layer", body: "BeeLine helps highlight which plants around you are pollinator-friendly" },
  { title: "Map + Collection", body: "Pin what you find and build a collection you can share." },
];

export default function Onboarding() {
  const router = useRouter();
  const [i, setI] = useState(0);

  const finish = async () => {
    await AsyncStorage.setItem(KEY, "true");
    router.replace("/home");
  };

  const next = async () => {
    if (i < STEPS.length - 1) setI(i + 1);
    else await finish();
  };

  const step = STEPS[i];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{step.title}</Text>
      <Text style={styles.body}>{step.body}</Text>

      <View style={styles.footer}>
        <TouchableOpacity onPress={finish}>
          <Text style={styles.link}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={next}>
          <Text style={styles.btnText}>{i === STEPS.length - 1 ? "Get Started" : "Next"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.progress}>{i + 1} / {STEPS.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#4B6043" },
  title: { fontSize: 28, fontWeight: "800", color: "#fff", marginBottom: 10 },
  body: { fontSize: 16, color: "#D7E7E2", lineHeight: 22 },
  footer: { marginTop: 30, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  link: { color: "#9FD6C6", fontWeight: "700" },
  btn: { backgroundColor: "#F9B223", paddingVertical: 12, paddingHorizontal: 16, borderRadius: 14 },
  btnText: { color: "#fff", fontWeight: "800" },
  progress: { marginTop: 18, color: "#9FB6AF", textAlign: "center" },
});
