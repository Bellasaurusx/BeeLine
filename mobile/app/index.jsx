import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import Logo from "../assets/Logo.png";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.img} />

      <Text style={styles.title}>BeeLine</Text>
      <Text style={styles.subtitle}>A Bee App</Text>

      <View style={styles.links}>
        <Link href="/camera" style={styles.linkCard}>
          <Text style={styles.linkText}>Camera</Text>
        </Link>

        <Link href="/maps" style={styles.linkCard}>
          <Text style={styles.linkText}>Maps</Text>
        </Link>

        <Link href="/photogal" style={styles.linkCard}>
          <Text style={styles.linkText}>Photo Gallery</Text>
        </Link>

        <Link href="/login" style={styles.linkCard}>
          <Text style={styles.linkText}>Login</Text>
        </Link>

        <Link href="/compvis" style={styles.linkCard}>
          <Text style={styles.linkText}>Camera 2</Text>
        </Link>

        <Link href="/about" style={styles.linkText}>About Page</Link>
        <Link href="/contact" style={styles.linkText}>Contact Page</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "red",
    fontWeight: "bold",
    fontSize: 28,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 30,
    color: "#555",
  },
  img: {
    marginVertical: 20,
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  links: {
    alignItems: "center",
    gap: 15,
  },
  linkCard: {
    backgroundColor: "#eee",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  linkText: {
    color: "#167fbd",
    fontWeight: "600",
    textAlign: "center",
  },
});
