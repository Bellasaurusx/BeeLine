import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../FirebaseConfig";
import Logo from "../assets/HD_SPLASH_TRANS.png";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    password === confirmPassword;

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

      {/* Inputs */}
      <TextInput
        placeholder="Name"
        placeholderTextColor={stylesVars.placeholder}
        style={styles.input}
        value={name}
        onChangeText={setName}
        editable={!loading}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor={stylesVars.placeholder}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={stylesVars.placeholder}
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={stylesVars.placeholder}
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        editable={!loading}
      />

      {/* Primary Sign Up Button */}
      <Pressable
        onPress={handleSignUp}
        disabled={loading || !canSubmit}
        style={({ pressed }) => [
          styles.pillBtnPrimary,
          (loading || !canSubmit) && styles.disabled,
          pressed && !loading && canSubmit && styles.pillPressed,
        ]}
      >
        <Text style={styles.pillPrimaryText}>
          {loading ? "Creating..." : "Sign up"}
        </Text>
      </Pressable>

      {/* “Already have an account?” link */}
      <Pressable
        style={styles.linkWrap}
        onPress={() => router.push("/login")}
        disabled={loading}
      >
        <Text style={styles.linkText}>
          Already have an account?{" "}
          <Text style={styles.linkTextBold}>Log in</Text>
        </Text>
      </Pressable>

      {/* BeeLine Back Button (bottom-right) */}
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          pressed && !loading && styles.backPressed,
          loading && styles.disabled,
        ]}
        onPress={() => router.push("/login")}
        disabled={loading}
      >
        <Text style={styles.backArrow}>←</Text>
      </Pressable>
    </View>
  );
}

const stylesVars = {
  bg: "#4c6233",
  inputBg: "#88a06b",
  inputBorder: "#2c3e20",
  yellow: "#f4cf65",
  textDark: "#111",
  linkYellow: "#f4cf65",
  placeholder: "#2c3e20",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: stylesVars.bg,
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 18,
  },

  logo: {
    width: 220,
    height: 160,
    resizeMode: "contain",
    marginBottom: 18,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
  },

  input: {
    width: "86%",
    backgroundColor: stylesVars.inputBg,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: stylesVars.inputBorder,

    // readability 
    color: "#1a1a1a",
    fontSize: 16,
    fontWeight: "600",

    marginBottom: 12,
  },

  // Primary pill 
  pillBtnPrimary: {
    width: "86%",
    backgroundColor: stylesVars.yellow,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  pillPrimaryText: {
    fontSize: 16,
    fontWeight: "700",
    color: stylesVars.textDark,
  },

  // Press feedback
  pillPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.95,
  },
  disabled: {
    opacity: 0.55,
  },

  // Link text 
  linkWrap: {
    marginTop: 14,
    paddingVertical: 8,
  },
  linkText: {
    color: stylesVars.linkYellow,
    fontSize: 16,
    fontWeight: "600",
  },
  linkTextBold: {
    fontWeight: "700",
  },

  /* Back Button / BeeLine style */
  backButton: {
    position: "absolute",
    bottom: 40,
    right: 30,
    backgroundColor: stylesVars.yellow,
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
  backPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  backArrow: {
    fontSize: 26,
    color: "#333",
    fontWeight: "600",
  },
});
