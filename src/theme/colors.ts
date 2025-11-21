/**
 * Color Constants (TypeScript)
 * Centralized color definitions for light and dark themes
 */

import type { CommonColors, StatusColors, ThemeColors } from "../types/theme";

// Light theme colors
export const LIGHT_COLORS: ThemeColors = {
  background: "#F8F9FA",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  text: "#000000",
  textSecondary: "#666666",
  textTertiary: "#999999",
  border: "#E5E5E5",
  borderLight: "#F0F0F0",
  primary: "#007AFF",
  error: "#FF6B6B",
  success: "#6BCB77",
  warning: "#FFD93D",
  info: "#4ECDC4",
  tabBar: "#FFFFFF",
  tabBarBorder: "#E5E5EA",
  tabBarActive: "#007AFF",
  tabBarInactive: "#8E8E93",
  statusBar: "dark-content" as const,
  searchPlaceholder: "#999999",
  shadowColor: "#000000",
  overlay: "rgba(0, 0, 0, 0.7)",
  emptyIcon: "#cccccc",
};

// Dark theme colors
export const DARK_COLORS: ThemeColors = {
  background: "#0B0B0F",
  surface: "#1A1A1F",
  card: "#232329",
  text: "#FFFFFF",
  textSecondary: "#B0B0B8",
  textTertiary: "#7A7A82",
  border: "#2A2A30",
  borderLight: "#3A3A40",
  primary: "#0A84FF",
  error: "#FF6B6B",
  success: "#6BCB77",
  warning: "#FFD93D",
  info: "#4ECDC4",
  tabBar: "#1A1A1F",
  tabBarBorder: "#2A2A30",
  tabBarActive: "#0A84FF",
  tabBarInactive: "#7A7A82",
  statusBar: "light-content" as const,
  searchPlaceholder: "#7A7A82",
  shadowColor: "#000000",
  overlay: "rgba(0, 0, 0, 0.85)",
  emptyIcon: "#3A3A40",
};

// Movie status colors (same for both themes)
export const STATUS_COLORS: StatusColors = {
  Popular: "#FF6B6B",
  Trending: "#4ECDC4",
  Upcoming: "#FFD93D",
  "Top Rated": "#6BCB77",
  default: "#95A5A6",
};

// Common colors used across the app
export const COMMON_COLORS: CommonColors = {
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
  rating: "#FFD93D",
  favourite: "#FF6B6B",
};
