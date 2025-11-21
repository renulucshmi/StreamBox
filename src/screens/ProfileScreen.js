import { Feather } from "@expo/vector-icons";
import {
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { theme, themeMode, toggleTheme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.colors.statusBar}
        backgroundColor={theme.colors.surface}
      />

      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.borderLight,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Profile
        </Text>
      </View>

      <View style={styles.content}>
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: theme.colors.card },
          ]}
        >
          <Feather name="user" size={64} color={theme.colors.primary} />
        </View>

        <Text style={[styles.username, { color: theme.colors.text }]}>
          {user?.username || "Guest"}
        </Text>
        <Text style={[styles.email, { color: theme.colors.textSecondary }]}>
          {user?.email || "guest@streambox.com"}
        </Text>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
          >
            Settings
          </Text>

          {/* Dark Mode Toggle */}
          <View
            style={[
              styles.settingRow,
              {
                backgroundColor: theme.colors.card,
                borderBottomColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.settingLeft}>
              <Feather
                name={themeMode === "dark" ? "moon" : "sun"}
                size={20}
                color={theme.colors.text}
              />
              <Text style={[styles.settingText, { color: theme.colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={themeMode === "dark"}
              onValueChange={toggleTheme}
              trackColor={{
                false: "#D1D1D6",
                true: theme.colors.primary,
              }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D1D6"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          onPress={logout}
        >
          <Feather name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 32,
  },
  settingsSection: {
    width: "90%",
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
