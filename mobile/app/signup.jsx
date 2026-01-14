// app/signup.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../FirebaseConfig";
import Logo from "../assets/Logo.png";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Missing fields", "Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords don’t match", "Please confirm your password.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Set display name in Firebase Auth profile
      await updateProfile(userCred.user, { displayName: name.trim() });

      router.replace("/home");
    } catch (err) {
      Alert.alert("Sign up failed", err?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={Logo} style={styles.logo} />

      <Text style={styles.title}>Create your BeeLine account</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#333"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#333"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#333"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#333"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={[styles.signupBtn, loading && styles.btnDisabled]}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.signupText}>
          {loading ? "Creating..." : "Sign up"}
        </Text>
      </TouchableOpacity>

      {/* “Already have an account?” link */}
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => router.push("/login")}
        disabled={loading}
      >
        <Text style={styles.loginLinkText}>Already have an account? Log in</Text>
      </TouchableOpacity>

      {/* BeeLine Back Button (bottom-right) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/login")}
        disabled={loading}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c6233",
    alignItems: "center",
    paddingTop: 60,
  },
  logo: {
    width: 160,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    width: "70%",
    backgroundColor: "#88a06b",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderRadius: 4,
    color: "#000",
    borderWidth: 1,
    borderColor: "#2c3e20",
  },
  signupBtn: {
    backgroundColor: "#f4cf65",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 20,
    marginTop: 10,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  signupText: {
    fontWeight: "600",
    color: "#000",
  },
  loginLink: {
    marginTop: 20,
  },
  loginLinkText: {
    color: "#f4cf65",
    fontSize: 14,
  },

  /* Back Button / BeeLine style */
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
