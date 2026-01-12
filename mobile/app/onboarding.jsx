// app/onboarding.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const KEY = "beeline:onboardingSeen:v1";
const POST_ONBOARD_ROUTE = "/login"; 

export default function Onboarding() {
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [panelLayout, setPanelLayout] = useState({ width: 0, height: 0 });

  const STEPS = useMemo(
    () => [
      {
        key: "welcome",
        title: "Welcome to BeeLine",
        body: "Identify plants, save them, and learn what helps pollinators.",
        image: require("../assets/HD_SPLASH_TRANS.png"),
      },
      {
        key: "identify",
        title: "Identify",
        body: "Start with a photo to identify plants around you.",
        image: require("../assets/onboarding/identify.png"),
      },
      {
        key: "smartlayer",
        title: "Smart Layer",
        body: "BeeLine highlights which plants are pollinator-friendly.",
        image: require("../assets/onboarding/smartlayer.png"),
      },
      {
        key: "map",
        title: "Map + Collection",
        body: "Pin what you find and build a collection you can share.",
        image: require("../assets/onboarding/map.png"),
      },
    ],
    []
  );

  const safeIndex = Math.min(Math.max(index, 0), STEPS.length - 1);
  const step = STEPS[safeIndex] ?? STEPS[0];

  // Keep index safely in bounds
  useEffect(() => {
    if (index > STEPS.length - 1) setIndex(STEPS.length - 1);
    if (index < 0) setIndex(0);
  }, [index, STEPS.length]);

  // Compute artboard rect for "contain" images so overlays line up
  const artRect = useMemo(() => {
    if (!panelLayout.width || !panelLayout.height) {
      return { x: 0, y: 0, w: 0, h: 0 };
    }

    const src = Image.resolveAssetSource(step.image);
    const imgW = src?.width || 1;
    const imgH = src?.height || 1;

    const panelW = panelLayout.width;
    const panelH = panelLayout.height;

    const imgAspect = imgW / imgH;
    const panelAspect = panelW / panelH;

    let w = panelW;
    let h = panelH;

    if (imgAspect > panelAspect) {
      w = panelW;
      h = w / imgAspect;
    } else {
      h = panelH;
      w = h * imgAspect;
    }

    const x = (panelW - w) / 2;
    const y = (panelH - h) / 2;

    return { x, y, w, h };
  }, [panelLayout.width, panelLayout.height, step.image]);

  // Animations
  const pulse = useRef(new Animated.Value(0)).current;
  const halo = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    const haloLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(halo, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(halo, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    const shimmerLoop = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    pulseLoop.start();
    haloLoop.start();
    shimmerLoop.start();

    return () => {
      pulseLoop.stop();
      haloLoop.stop();
      shimmerLoop.stop();
    };
  }, [pulse, halo, shimmer]);

  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06],
  });

  const haloScale = halo.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.14],
  });

  const shimmerX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-140, 140],
  });

  // Mark onboarding as seen + move forward
  const finish = async () => {
    try {
      await AsyncStorage.setItem(KEY, "true");
    } catch (e) {
      console.warn("Failed to set onboarding flag:", e);
    }
    router.replace(POST_ONBOARD_ROUTE);
  };

  const next = async () => {
    if (safeIndex < STEPS.length - 1) {
      setIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
    } else {
      await finish();
    }
  };

  const skip = async () => {
    await finish();
  };

  const Hint = ({ style, text }) => {
    return (
      <View pointerEvents="none" style={[styles.hintGroup, style]}>
        <View style={styles.hintPill}>
          <Text style={styles.hintText}>{text}</Text>
        </View>
        <View style={styles.hintLine} />
      </View>
    );
  };

  const Overlays = () => {
    if (step.key === "identify") {
      return (
        <>
          <View style={styles.dim} pointerEvents="none" />

          <View
            pointerEvents="none"
            style={[
              styles.glowBox,
              { top: "27%", left: "4%", width: "92%", height: "55%" },
            ]}
          />



          <Hint style={{ top: "61%", left: "6%" }} text="Start with a photo" />
        </>
      );
    }

    if (step.key === "smartlayer") {
      return (
        <>
          <View style={styles.dim} pointerEvents="none" />

          <View
            pointerEvents="none"
            style={[
              styles.glowBox,
              { top: "57%", left: "4%", width: "92%", height: "42%" },
            ]}
          />

          <Animated.View
            pointerEvents="none"
            style={[
              styles.haloRing,
              {
                top: "59%",
                left: "84%", // ✅ FIXED (was "84" string)
                width: 36,
                height: 36,
                transform: [{ scale: haloScale }],
              },
            ]}
          />

          <Hint
            style={{ top: "41%", left: "8%" }}
            text="Bee badge = pollinator-friendly"
          />
        </>
      );
    }

    if (step.key === "map") {
      return (
        <>
          <View
            pointerEvents="none"
            style={[
              styles.glowBox,
              {
                top: "48%",
                left: "5%",
                width: "64%",
                height: "38%",
                borderRadius: 20,
              },
            ]}
          />

          <Hint
            style={{ top: "30%", left: "8%" }}
            text="Your pinned plants cluster together on the map"
          />
        </>
      );
    }

    return null;
  };

  return (
    <LinearGradient colors={["#2A4D45", "#1E3A35"]} style={styles.root}>
      <View style={styles.card}>
        {/* Image panel */}
        <View
          style={styles.imageWrap}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            setPanelLayout({ width, height });
          }}
        >
          <View
            style={[
              styles.artboard,
              {
                left: artRect.x,
                top: artRect.y,
                width: artRect.w,
                height: artRect.h,
              },
            ]}
          >
            <Image source={step.image} style={styles.image} resizeMode="contain" />
            <Overlays />

            {/* Shimmer overlay (optional eye candy) */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.shimmer,
                {
                  height: "45%",
                  top: "25%",
                  left: "50%",
                  transform: [{ translateX: shimmerX }, { rotate: "18deg" }],
                },
              ]}
            />
          </View>
        </View>

        {/* Text */}
        <View style={styles.textArea}>
          <Text style={styles.title}>{step.title}</Text>
          <Text style={styles.body}>{step.body}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={skip}>
            <Text style={styles.link}>Skip</Text>
          </TouchableOpacity>

          <View style={styles.dots}>
            {STEPS.map((_, idx) => (
              <View
                key={idx}
                style={[styles.dot, idx === safeIndex && styles.dotActive]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.btn} onPress={next}>
            <Text style={styles.btnText}>
              {safeIndex === STEPS.length - 1 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 18, paddingTop: 28 },

  card: {
    flex: 1,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.12)",
  },

  artboard: {
    position: "absolute",
    overflow: "hidden",
  },

  imageWrap: {
    height: "58%",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
    position: "relative",
    overflow: "hidden",
  },

  image: { width: "100%", height: "100%" },

  textArea: { paddingHorizontal: 24, paddingTop: 18 },
  title: { fontSize: 34, fontWeight: "800", color: "#fff", marginBottom: 10 },
  body: { fontSize: 16, color: "#D7E7E2", lineHeight: 22 },

  footer: {
    marginTop: "auto",
    paddingHorizontal: 24,
    paddingBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  link: { color: "#9FD6C6", fontWeight: "700" },

  btn: {
    backgroundColor: "#F9B223",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  btnText: { color: "#1B2E2A", fontWeight: "900" },

  dots: { flexDirection: "row", gap: 8 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  dotActive: { backgroundColor: "#fff", width: 22 },

  // Overlay styles
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  glowBox: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "rgba(249, 178, 35, 0.95)",
    borderRadius: 18,
    shadowColor: "#F9B223",
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },

  pulseRing: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "rgba(249, 178, 35, 0.95)",
    borderRadius: 18,
    shadowColor: "#F9B223",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },

  haloRing: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "rgba(249, 178, 35, 0.95)",
    borderRadius: 999,
    shadowColor: "#F9B223",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },

  shimmer: {
     position: "absolute",
      width: 120,
      opacity: 0.12,
      borderRadius: 999,
      backgroundColor: "rgba(249, 178, 35, 0.22)",
  },

  hintGroup: { position: "absolute" },
  hintPill: {
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
  },
  hintText: { color: "#1B2E2A", fontWeight: "900" },
  hintLine: {
    width: 3,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.95)",
    marginLeft: 18,
    borderRadius: 99,
    marginTop: 6,
  },
});
