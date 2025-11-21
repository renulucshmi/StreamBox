/**
 * Theme Type Definitions
 */

export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  borderLight: string;
  primary: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  tabBar: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;
  statusBar: "light-content" | "dark-content";
  searchPlaceholder: string;
  shadowColor: string;
  overlay: string;
  emptyIcon: string;
};

export type StatusColors = {
  Popular: string;
  Trending: string;
  Upcoming: string;
  "Top Rated": string;
  default: string;
};

export type CommonColors = {
  white: string;
  black: string;
  transparent: string;
  rating: string;
  favourite: string;
};

export type Theme = {
  mode: ThemeMode;
  colors: ThemeColors;
  statusColors: StatusColors;
  commonColors: CommonColors;
  spacing: Record<string, number>;
  padding: Record<string, number>;
  margin: Record<string, number>;
  borderRadius: Record<string, number>;
  borderWidth: Record<string, number>;
  fontSize: Record<string, number>;
  fontWeight: Record<string, string>;
  lineHeight: Record<string, number>;
  textStyles: Record<string, any>;
};
