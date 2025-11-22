/**
 * NotificationsScreen
 * Manage notification preferences with toggles
 */

import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../components/IconButton";
import { useTheme } from "../context/ThemeContext";

const STORAGE_KEY = "@notifications_preferences";

export default function NotificationsScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [newReleases, setNewReleases] = useState(true);
  const [recommendations, setRecommendations] = useState(true);
  const [appAnnouncements, setAppAnnouncements] = useState(false);

  // Load preferences from AsyncStorage
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const prefs = JSON.parse(saved);
        setNewReleases(prefs.newReleases ?? true);
        setRecommendations(prefs.recommendations ?? true);
        setAppAnnouncements(prefs.appAnnouncements ?? false);
      }
    } catch (error) {
      console.error("Error loading notification preferences:", error);
    }
  };

  const savePreferences = async (
    releases: boolean,
    recs: boolean,
    announcements: boolean
  ) => {
    try {
      const prefs = {
        newReleases: releases,
        recommendations: recs,
        appAnnouncements: announcements,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (error) {
      console.error("Error saving notification preferences:", error);
    }
  };

  const handleNewReleasesToggle = (value: boolean) => {
    setNewReleases(value);
    savePreferences(value, recommendations, appAnnouncements);
  };

  const handleRecommendationsToggle = (value: boolean) => {
    setRecommendations(value);
    savePreferences(newReleases, value, appAnnouncements);
  };

  const handleAnnouncementsToggle = (value: boolean) => {
    setAppAnnouncements(value);
    savePreferences(newReleases, recommendations, value);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.colors.statusBar}
        backgroundColor={theme.colors.background}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <IconButton
          iconName="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Notifications
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info Section */}
        <View style={styles.infoSection}>
          <Feather
            name="bell"
            size={48}
            color={theme.colors.primary}
            style={styles.infoIcon}
          />
          <Text style={[styles.infoTitle, { color: theme.colors.text }]}>
            Manage Notifications
          </Text>
          <Text
            style={[
              styles.infoDescription,
              { color: theme.colors.textSecondary },
            ]}
          >
            Choose what notifications you'd like to receive. Changes are saved
            automatically.
          </Text>
        </View>

        {/* Settings List */}
        <View
          style={[
            styles.settingsList,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
        >
          {/* New Releases */}
          <View
            style={[
              styles.settingRow,
              { borderBottomColor: theme.colors.border },
            ]}
          >
            <View style={styles.settingLeft}>
              <Feather
                name="film"
                size={22}
                color={theme.colors.text}
                style={styles.settingIcon}
              />
              <View style={styles.settingTextContainer}>
                <Text
                  style={[styles.settingLabel, { color: theme.colors.text }]}
                >
                  New Releases
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Get notified about new movies and shows
                </Text>
              </View>
            </View>
            <Switch
              value={newReleases}
              onValueChange={handleNewReleasesToggle}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Recommendations */}
          <View
            style={[
              styles.settingRow,
              { borderBottomColor: theme.colors.border },
            ]}
          >
            <View style={styles.settingLeft}>
              <Feather
                name="star"
                size={22}
                color={theme.colors.text}
                style={styles.settingIcon}
              />
              <View style={styles.settingTextContainer}>
                <Text
                  style={[styles.settingLabel, { color: theme.colors.text }]}
                >
                  Recommendations
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Personalized content suggestions for you
                </Text>
              </View>
            </View>
            <Switch
              value={recommendations}
              onValueChange={handleRecommendationsToggle}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* App Announcements */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Feather
                name="info"
                size={22}
                color={theme.colors.text}
                style={styles.settingIcon}
              />
              <View style={styles.settingTextContainer}>
                <Text
                  style={[styles.settingLabel, { color: theme.colors.text }]}
                >
                  App Announcements
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Updates about new features and improvements
                </Text>
              </View>
            </View>
            <Switch
              value={appAnnouncements}
              onValueChange={handleAnnouncementsToggle}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  infoSection: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  infoIcon: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  settingsList: {
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 80,
    borderBottomWidth: 0.5,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 16,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  noteSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
});
