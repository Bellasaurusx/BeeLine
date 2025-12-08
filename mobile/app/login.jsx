import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Logo from "../assets/Logo.png"; // your BeeLine logo

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={Logo} style={styles.logo} />

      {/* Google Button (not functional) */}
      <TouchableOpacity style={styles.socialBtn}>
        <Text style={styles.socialText}>Log in With Google</Text>
      </TouchableOpacity>

      {/* Apple Button (not functional) */}
      <TouchableOpacity style={styles.socialBtn}>
        <Text style={styles.socialText}>Log in With Apple</Text>
      </TouchableOpacity>

      <Text style={styles.or}>-- or --</Text>

      {/* Email Input */}
      <TextInput placeholder="Email:" style={styles.input} placeholderTextColor="#333" />

      {/* Password Input */}
      <TextInput
        placeholder="Password:"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#333"
      />

      {/* Working */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => router.push("/home")} // ← WORKS!
      >
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      {/* Working */}
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
    backgroundColor: "#4c6233", // green background like mockup
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
