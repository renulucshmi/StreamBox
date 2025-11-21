/**
 * ProfileScreen Component (TypeScript)
 * Displays user profile information, settings, and navigation options
 * Features: User info, dark mode toggle, navigation to favourites/watch later, logout
 */

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileRow from "../components/ProfileRow";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import type { RootStackParamList } from "../types/navigation";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, themeMode, toggleTheme } = useTheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  // Get user initials for avatar
  const getUserInitial = (): string => {
    if (!user?.username) return "G";
    return user.username.charAt(0).toUpperCase();
  };

  // Handle logout with confirmation
  const handleLogout = (): void => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Navigate to Favourites screen
  const navigateToFavourites = (): void => {
    navigation.navigate("Favourites");
  };

  // Navigate to Watch Later screen (placeholder for now)
  const navigateToWatchLater = (): void => {
    Alert.alert("Watch Later", "This feature is coming soon!", [
      { text: "OK" },
    ]);
  };

  // Edit profile placeholder
  const handleEditProfile = (): void => {
    Alert.alert("Edit Profile", "This feature is coming soon!", [
      { text: "OK" },
    ]);
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

        {/* Profile Options Section */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
          >
            Profile Options
          </Text>
          <View
            style={[
              styles.rowsContainer,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <ProfileRow
              icon="edit-3"
              label="Edit Profile"
              onPress={handleEditProfile}
              showArrow={true}
            />
            <ProfileRow
              icon="heart"
              label="My Favourites"
              onPress={navigateToFavourites}
              showArrow={true}
              iconColor={theme.colors.error}
            />
            <ProfileRow
              icon="bookmark"
              label="Watch Later"
              onPress={navigateToWatchLater}
              showArrow={true}
            />
          </View>
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
          >
            App Settings
          </Text>
          <View
            style={[
              styles.rowsContainer,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <ProfileRow
              icon={themeMode === "dark" ? "moon" : "sun"}
              label="Dark Mode"
              showSwitch={true}
              switchValue={themeMode === "dark"}
              onSwitchChange={toggleTheme}
              showArrow={false}
            />
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={[styles.logoutButton, { borderColor: theme.colors.error }]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Feather name="log-out" size={20} color={theme.colors.error} />
            <Text style={[styles.logoutText, { color: theme.colors.error }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Spacing */}
        <View style={styles.footer} />
      </ScrollView>
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
  rowsContainer: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    gap: 10,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: "600",
  },
  footer: {
    height: 40,
  },
});

export default ProfileScreen;
