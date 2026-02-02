// components/SimpleBeeAnimation.jsx
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

export default function SimpleBeeAnimation() {
  const pulse = useRef(new Animated.Value(0)).current;
  const bee = useRef(new Animated.Value(0)).current;
  const pollen1 = useRef(new Animated.Value(0)).current;
  const pollen2 = useRef(new Animated.Value(0)).current;
  const pollen3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sun pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Bee bob left-right
    Animated.loop(
      Animated.sequence([
        Animated.timing(bee, {
          toValue: 1,
          duration: 650,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bee, {
          toValue: 0,
          duration: 650,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pollen bounce (staggered)
    const bounce = (v, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(v, {
            toValue: 1,
            duration: 260,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(v, {
            toValue: 0,
            duration: 260,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.delay(250),
        ])
      ).start();

    bounce(pollen1, 0);
    bounce(pollen2, 120);
    bounce(pollen3, 240);
  }, [pulse, bee, pollen1, pollen2, pollen3]);

  // Interpolations
  const sunScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
  const sunGlow = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.5] });

  const beeX = bee.interpolate({ inputRange: [0, 1], outputRange: [-22, 22] });
  const beeY = bee.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });

  const p1Y = pollen1.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  const p2Y = pollen2.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  const p3Y = pollen3.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });

  return (
    <View style={styles.wrap}>
      {/* Sun (pulsing circle) */}
      <Animated.View
        style={[
          styles.sun,
          {
            transform: [{ scale: sunScale }],
            opacity: sunGlow,
          },
        ]}
      />

      {/* Bee dot + little stripe */}
      <Animated.View
        style={[
          styles.bee,
          {
            transform: [{ translateX: beeX }, { translateY: beeY }],
          },
        ]}
      >
        <View style={styles.beeStripe} />
      </Animated.View>

      {/* Pollen dots */}
      <View style={styles.pollenRow}>
        <Animated.View style={[styles.pollen, { transform: [{ translateY: p1Y }] }]} />
        <Animated.View style={[styles.pollen, { transform: [{ translateY: p2Y }] }]} />
        <Animated.View style={[styles.pollen, { transform: [{ translateY: p3Y }] }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 140,
    width: 220,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111", // swap to your BeeLine background later
    overflow: "hidden",
  },
  sun: {
    position: "absolute",
    top: 22,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F9B233", // honey
  },
  bee: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F9B233",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  beeStripe: {
    width: 14,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
    opacity: 0.8,
  },
  pollenRow: {
    position: "absolute",
    bottom: 18,
    flexDirection: "row",
    gap: 10,
  },
  pollen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F9B233",
    opacity: 0.9,
  },
});
