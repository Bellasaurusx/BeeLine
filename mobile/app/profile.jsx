import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";

import ProfilePic from "../assets/profile.jpg";
import SimpleBeeAnimation from "./components/SimpleBeeAnimation";

export default function Profile() {
  const router = useRouter();


  const [leftHandMode, setLeftHandMode] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/home")}
          style={styles.headerBackBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.headerBackText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Settings</Text>

        {/* spacer to balance the header */}
        <View style={{ width: 42 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image source={ProfilePic} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>Marcos</Text>
              <Text style={styles.profileSub}>BeeLine account</Text>

              <TouchableOpacity activeOpacity={0.8} style={styles.smallBtn}>
                <Text style={styles.smallBtnText}>Change Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <SettingRow
            icon="🫲"
            title="Left-hand mode"
            subtitle="Moves important buttons for left thumb"
            right={
              <Switch
                value={leftHandMode}
                onValueChange={setLeftHandMode}
                thumbColor={leftHandMode ? "#f4cf65" : "#ffffff"}
                trackColor={{ false: "#2f3b21", true: "#7a8d55" }}
              />
            }
            onPress={() => setLeftHandMode((prev) => !prev)}
          />
          <Divider />
          <SettingRow
            icon="📍"
            title="Location"
            subtitle="Manage your location settings"
            right={<Text style={styles.chev}>›</Text>}
            onPress={() => console.log("Location")}
          />
        </View>

        {/* Account */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <SettingRow
            icon="🔒"
            title="Change password"
            subtitle="Update your password"
            right={<Text style={styles.chev}>›</Text>}
            onPress={() => console.log("Password")}
          />
          <Divider />
          <SettingRow
            icon="✉️"
            title="Change email"
            subtitle="Update your login email"
            right={<Text style={styles.chev}>›</Text>}
            onPress={() => console.log("Email")}
          />
          <Divider />
          <SettingRow
            icon="📄"
            title="View data"
            subtitle="Export or view stored info"
            right={<Text style={styles.chev}>›</Text>}
            onPress={() => console.log("View Data")}
          />
        </View>

        {/* Danger Zone */}
        <Text style={styles.sectionTitle}>Danger zone</Text>
        <View style={styles.cardDanger}>
          <SettingRow
            icon="🚫"
            title="Disable account"
            subtitle="Temporarily disable your account"
            right={<Text style={styles.chev}>›</Text>}
            onPress={() => console.log("Disable")}
            danger
          />
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

function SettingRow({ icon, title, subtitle, right, onPress, danger }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.rowBtn}>
      <View style={[styles.iconPill, danger && styles.iconPillDanger]}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.rowTitle, danger && styles.rowTitleDanger]}>{title}</Text>
        <Text style={styles.rowSub}>{subtitle}</Text>
      </View>

      <View style={styles.rowRight}>{right}</View>
    </TouchableOpacity>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c6233",
  },

  // Header
  header: {
    paddingTop: 55,
    paddingBottom: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBackBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(244, 207, 101, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBackText: {
    fontSize: 22,
    color: "#ffffff",
  },
  headerTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Content
  content: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },

  sectionTitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 14,
    marginBottom: 8,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },

  // Cards
  card: {
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  cardDanger: {
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 18,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(244, 207, 101, 0.25)",
  },

  // Profile
  profileRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 16,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  profileName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 2,
  },
  profileSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    marginBottom: 10,
  },
  smallBtn: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f4cf65",
    borderRadius: 12,
  },
  smallBtnText: {
    color: "#2d2d2d",
    fontWeight: "800",
    fontSize: 12,
  },

  // Animation placement
  animWrap: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 6,
  },

  // Rows
  rowBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 10,
  },
  iconPill: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(244, 207, 101, 0.20)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconPillDanger: {
    backgroundColor: "rgba(244, 207, 101, 0.12)",
  },
  iconText: {
    fontSize: 18,
  },
  rowTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  rowTitleDanger: {
    color: "#f4cf65",
  },
  rowSub: {
    marginTop: 2,
    color: "rgba(255,255,255,0.70)",
    fontSize: 12,
  },
  rowRight: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
  },
  chev: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 22,
    marginTop: -2,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginLeft: 58,
  },
});
