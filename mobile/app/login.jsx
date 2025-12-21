import { useState } from "react";
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
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../FirebaseConfig";
import Logo from "../assets/Logo.png";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/home"); // ✅ prevents back-nav to login
    } catch (err) {
      Alert.alert("Login failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={Logo} style={styles.logo} />

      {/* Google (later) */}
      <TouchableOpacity style={styles.socialBtn} disabled>
        <Text style={styles.socialText}>Log in With Google</Text>
      </TouchableOpacity>

      {/* Apple (later) */}
      <TouchableOpacity style={styles.socialBtn} disabled>
        <Text style={styles.socialText}>Log in With Apple</Text>
      </TouchableOpacity>

      <Text style={styles.or}>— or —</Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#333"
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#333"
      />

      {/* Login */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginText}>
          {loading ? "Logging in..." : "Log in"}
        </Text>
      </TouchableOpacity>

      {/* Create account */}
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.createText}>Create account</Text>
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
    width: 180,
    height: 140,
    resizeMode: "contain",
    marginBottom: 40,
  },
  socialBtn: {
    backgroundColor: "#f4cf65",
    paddingVertical: 14,
    width: "70%",
    borderRadius: 30,
    marginBottom: 15,
    alignItems: "center",
    opacity: 0.6,
  },
  socialText: {
    fontWeight: "600",
    color: "#333",
  },
  or: {
    color: "#fff",
    marginVertical: 20,
  },
  input: {
    width: "70%",
    backgroundColor: "#88a06b",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 4,
    color: "#000",
    borderWidth: 1,
    borderColor: "#2c3e20",
  },
  loginBtn: {
    backgroundColor: "#f4cf65",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 20,
    marginTop: 10,
  },
  loginText: {
    fontWeight: "600",
    color: "#000",
  },
  createBtn: {
    marginTop: 25,
  },
  createText: {
    backgroundColor: "#b9a6f4",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    color: "#000",
    fontWeight: "500",
  },
});
