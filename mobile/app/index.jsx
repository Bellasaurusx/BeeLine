// app/index.jsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Bkg from "../assets/bkg.png";

const ONBOARD_KEY = "beeline:onboardingSeen:v1";

// ✅ TESTING MODE: force onboarding every app launch
const FORCE_ONBOARDING_FOR_TESTING = true;

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        if (FORCE_ONBOARDING_FOR_TESTING) {
          await AsyncStorage.removeItem(ONBOARD_KEY);
          router.replace("/onboarding");
          return;
        }

        const seen = await AsyncStorage.getItem(ONBOARD_KEY);
        if (seen !== "true") {
          router.replace("/onboarding");
        }
      } catch (e) {
        console.warn("Onboarding check failed:", e);
      }
    })();
  }, [router]);

  return (
    <ImageBackground source={Bkg} style={styles.bg} resizeMode="cover">
      <View style={styles.centerContent}>
        <Text style={styles.title}>Beeline</Text>

        <Text style={styles.tagline}>
          We foster ecological awareness and empower individuals to take
          actionable steps toward pollinator conservation.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 70,
    paddingTop: 40,
  },

  centerContent: {
    marginTop: "99%",
    paddingHorizontal: 30,
    alignItems: "center",
  },

  title: {
    fontSize: 52,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },

  tagline: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 320,
    fontWeight: "400",
  },

  button: {
    backgroundColor: "#f4b400",
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 40,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
  },
});
