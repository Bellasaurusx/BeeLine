import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import Logo from "../assets/HD_SPLASH_TRANS.png";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canLogin = email.trim().length > 0 && password.trim().length > 0;

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={Logo} style={styles.logo} />

      <Text style={styles.title}>Log in to BeeLine</Text>

      {/* Social Pill Buttons (placeholder, not functional yet) */}
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [
          styles.pillBtn,
          pressed && styles.pillPressed,
        ]}
      >
        <Text style={styles.pillText}>Log in with Google</Text>
      </Pressable>

      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [
          styles.pillBtn,
          pressed && styles.pillPressed,
        ]}
      >
        <Text style={styles.pillText}>Log in with Apple</Text>
      </Pressable>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Inputs */}
      <TextInput
        placeholder="Email"
        placeholderTextColor={stylesVars.placeholder}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={stylesVars.placeholder}
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />


      {/* Primary Login Button (yellow pill) */}
      <Pressable
        onPress={() => router.push("/home")}
        disabled={!canLogin}
        style={({ pressed }) => [
          styles.pillBtnPrimary,
          !canLogin && styles.disabled,
          pressed && canLogin && styles.pillPressed,
        ]}
      >
        <Text style={styles.pillPrimaryText}>Log in</Text>
      </Pressable>

      {/* Link-style secondary action */}
      <Pressable onPress={() => router.push("/signup")} style={styles.linkWrap}>
        <Text style={styles.linkText}>
          Don’t have an account? <Text style={styles.linkTextBold}>Sign up</Text>
        </Text>
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

  // Social + main button pill base (consistent)
  pillBtn: {
    width: "86%",
    backgroundColor: stylesVars.yellow,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  pillText: {
    fontSize: 16,
    fontWeight: "700",
    color: stylesVars.textDark,
  },

  // Divider line + "or"
  dividerRow: {
    width: "86%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  dividerText: {
    color: "#fff",
    marginHorizontal: 12,
    fontWeight: "800",
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

  // Primary login pill
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
});

