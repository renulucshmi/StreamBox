/**
 * SubscriptionScreen
 * Display subscription information and upgrade option (demo only)
 */

import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../components/IconButton";
import { useTheme } from "../context/ThemeContext";

export default function SubscriptionScreen({ navigation }: any) {
  const { theme } = useTheme();

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
          Subscription
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Icon Section */}
        <View style={styles.iconSection}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.colors.primary + "20" },
            ]}
          >
            <Feather
              name="credit-card"
              size={48}
              color={theme.colors.primary}
            />
          </View>
        </View>

        {/* Current Plan Card */}
        <View style={styles.planSection}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
          >
            Current Plan
          </Text>
          <View
            style={[
              styles.planCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.planHeader}>
              <View>
                <Text style={[styles.planName, { color: theme.colors.text }]}>
                  Basic Plan
                </Text>
                <Text
                  style={[
                    styles.planStatus,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Demo Account
                </Text>
              </View>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: theme.colors.primary + "20" },
                ]}
              >
                <Text
                  style={[styles.badgeText, { color: theme.colors.primary }]}
                >
                  FREE
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Features */}
            <View style={styles.features}>
              <View style={styles.featureRow}>
                <Feather
                  name="check-circle"
                  size={20}
                  color="#4CAF50"
                  style={styles.featureIcon}
                />
                <Text
                  style={[styles.featureText, { color: theme.colors.text }]}
                >
                  Browse unlimited movies and shows
                </Text>
              </View>
              <View style={styles.featureRow}>
                <Feather
                  name="check-circle"
                  size={20}
                  color="#4CAF50"
                  style={styles.featureIcon}
                />
                <Text
                  style={[styles.featureText, { color: theme.colors.text }]}
                >
                  Add favourites and watch later lists
                </Text>
              </View>
              <View style={styles.featureRow}>
                <Feather
                  name="check-circle"
                  size={20}
                  color="#4CAF50"
                  style={styles.featureIcon}
                />
                <Text
                  style={[styles.featureText, { color: theme.colors.text }]}
                >
                  Filter by language and genre
                </Text>
              </View>
              <View style={styles.featureRow}>
                <Feather
                  name="x-circle"
                  size={20}
                  color="#9E9E9E"
                  style={styles.featureIcon}
                />
                <Text
                  style={[
                    styles.featureText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  No streaming (demo only)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Upgrade Button */}
        <View style={styles.upgradeSection}>
          <TouchableOpacity
            style={[
              styles.upgradeButton,
              {
                backgroundColor: theme.colors.border,
                borderColor: theme.colors.border,
              },
            ]}
            activeOpacity={0.7}
            disabled={true}
          >
            <Feather name="star" size={20} color={theme.colors.textSecondary} />
            <Text
              style={[
                styles.upgradeButtonText,
                { color: theme.colors.textSecondary },
              ]}
            >
              Upgrade Plan
            </Text>
          </TouchableOpacity>
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
  iconSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  planSection: {
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
  planCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  planName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  planStatus: {
    fontSize: 14,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  features: {
    gap: 12,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  featureIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  upgradeSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  upgradeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 10,
  },
  upgradeButtonText: {
    fontSize: 17,
    fontWeight: "600",
  },
  noteSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  noteCard: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  noteIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
