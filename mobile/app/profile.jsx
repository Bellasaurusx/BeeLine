import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

// 👇 change this to whatever your profile image file is
import ProfilePic from "../assets/profile.jpg";

export default function Profile() {
  const router = useRouter();

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
        <Option label="Left hand mode" />
        <Option label="Location" />
        <Option label="Disable account" />
        <Option label="View Data" />
        <Option label="Change password" />
        <Option label="Change Email" />
      </View>

      {/* Back Button (bottom-right) */}
      <TouchableOpacity
        style={styles.backButton}
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
    backgroundColor: "#4c6233", // green background
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
  optionText: {
    color: "#ffffff",
    fontSize: 16,
  },
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
    elevation: 4,
  },
  backArrow: {
    fontSize: 24,
    color: "#333",
  },
});
