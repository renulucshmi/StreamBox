/**
 * ProfileScreen Component (TypeScript)
 * Clean account/settings page with user info and settings
 * Features: User avatar, notifications, subscription, dark mode toggle, logout
 */

import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
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

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { theme, themeMode, toggleTheme } = useTheme();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Get user initial for avatar
  const getUserInitial = (): string => {
    if (!user?.username) return "G";
    return user.username.charAt(0).toUpperCase();
  };

  // Handle logout with confirmation
  const handleLogout = (): void => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = async (): Promise<void> => {
    setShowLogoutDialog(false);
    await logout();
  };

  // Navigate to Notifications
  const handleNotifications = (): void => {
    navigation.navigate("Notifications");
  };

  // Navigate to Subscription
  const handleSubscription = (): void => {
    navigation.navigate("Subscription");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.colors.statusBar}
        backgroundColor={theme.colors.surface}
      />

      {/* Header */}
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

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Section */}
        <View style={styles.userSection}>
          <View
            style={[
              styles.avatarContainer,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text style={styles.avatarText}>{getUserInitial()}</Text>
          </View>

          <Text style={[styles.username, { color: theme.colors.text }]}>
            {user?.username || "Guest User"}
          </Text>
          <Text style={[styles.email, { color: theme.colors.textSecondary }]}>
            {user?.email || "guest@streambox.com"}
          </Text>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
          >
            Settings
          </Text>
          <View
            style={[
              styles.settingsList,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            {/* Notifications */}
            <TouchableOpacity
              style={[
                styles.settingRow,
                { borderBottomColor: theme.colors.border },
              ]}
              onPress={handleNotifications}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <Feather
                  name="bell"
                  size={22}
                  color={theme.colors.text}
                  style={styles.settingIcon}
                />
                <Text
                  style={[styles.settingLabel, { color: theme.colors.text }]}
                >
                  Notifications
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>

            {/* Subscription */}
            <TouchableOpacity
              style={[
                styles.settingRow,
                { borderBottomColor: theme.colors.border },
              ]}
              onPress={handleSubscription}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <Feather
                  name="credit-card"
                  size={22}
                  color={theme.colors.text}
                  style={styles.settingIcon}
                />
                <Text
                  style={[styles.settingLabel, { color: theme.colors.text }]}
                >
                  Subscription
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>

            {/* Dark Mode */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Feather
                  name={themeMode === "dark" ? "moon" : "sun"}
                  size={22}
                  color={theme.colors.text}
                  style={styles.settingIcon}
                />
                <Text
                  style={[styles.settingLabel, { color: theme.colors.text }]}
                >
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={themeMode === "dark"}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary,
                }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Logout Row */}
        <View style={styles.section}>
          <View
            style={[
              styles.settingsList,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.settingRow}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <Feather
                  name="log-out"
                  size={22}
                  color={theme.colors.error}
                  style={styles.settingIcon}
                />
                <Text
                  style={[styles.settingLabel, { color: theme.colors.error }]}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Spacing */}
        <View style={styles.footer} />
      </ScrollView>

      {/* Logout Confirmation Dialog */}
      <Modal
        visible={showLogoutDialog}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutDialog(false)}
      >
        <Pressable
          style={styles.dialogOverlay}
          onPress={() => setShowLogoutDialog(false)}
        >
          <View
            style={[
              styles.dialogContent,
              { backgroundColor: theme.colors.card },
            ]}
            onStartShouldSetResponder={() => true}
          >
            <Text style={[styles.dialogTitle, { color: theme.colors.text }]}>
              Logout
            </Text>
            <Text
              style={[
                styles.dialogMessage,
                { color: theme.colors.textSecondary },
              ]}
            >
              Are you sure you want to logout?
            </Text>
            <View style={styles.dialogButtons}>
              <TouchableOpacity
                style={styles.dialogButton}
                onPress={() => setShowLogoutDialog(false)}
              >
                <Text
                  style={[
                    styles.dialogButtonText,
                    { color: theme.colors.primary },
                  ]}
                >
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dialogButton}
                onPress={confirmLogout}
              >
                <Text
                  style={[
                    styles.dialogButtonText,
                    { color: theme.colors.primary },
                  ]}
                >
                  LOGOUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

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
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  userSection: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  username: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  email: {
    fontSize: 15,
    marginBottom: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingsList: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    minHeight: 56,
    borderBottomWidth: 0.5,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    height: 40,
  },
  dialogOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContent: {
    width: "85%",
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  dialogMessage: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  dialogButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  dialogButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dialogButtonText: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default ProfileScreen;
