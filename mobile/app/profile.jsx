import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";

import { auth } from "../FirebaseConfig";
import ProfilePic from "../assets/profile.jpg";
import { useLeftHand } from "./LeftHandContext";

export default function Profile() {
  const router = useRouter();
  const { leftHandMode, toggleLeftHandMode } = useLeftHand();

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            router.replace("/login");
          } catch (err) {
            Alert.alert("Error", err?.message || "Logout failed.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.avatarWrapper}>
        <Image source={ProfilePic} style={styles.avatar} />
        <TouchableOpacity>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Options List */}
      <View style={styles.options}>
        {/* Left Hand Mode Toggle */}
        <TouchableOpacity style={styles.optionRow} onPress={toggleLeftHandMode}>
          <View style={[styles.bullet, leftHandMode && styles.bulletActive]} />
          <Text style={styles.optionText}>
            Left hand mode {leftHandMode ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>

        <Option label="Location" />
        <Option label="Disable account" />
        <Option label="View Data" />
        <Option label="Change password" />
        <Option label="Change Email" />

        {/* Logout */}
        <TouchableOpacity style={styles.optionRow} onPress={handleLogout}>
          <View style={styles.bullet} />
          <Text style={[styles.optionText, styles.logoutText]}>Log out</Text>
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={[
          styles.backButton,
          leftHandMode ? styles.leftButton : styles.rightButton,
        ]}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

function Option({ label }) {
  return (
    <View style={styles.optionRow}>
      <View style={styles.bullet} />
      <Text style={styles.optionText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c6233",
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
  },
  changePhotoText: {
    marginTop: 8,
    color: "#ffffff",
    fontSize: 12,
  },
  options: {
    marginTop: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  bullet: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#ffffff",
    marginRight: 10,
  },
  bulletActive: {
    backgroundColor: "#ffffff",
  },
  optionText: {
    color: "#ffffff",
    fontSize: 16,
  },
  logoutText: {
    color: "#f4cf65",
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    bottom: 40,
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
    elevation: 4,
  },
  leftButton: { left: 30 },
  rightButton: { right: 30 },
  backArrow: {
    fontSize: 24,
    color: "#333",
    fontWeight: "600",
  },
});
