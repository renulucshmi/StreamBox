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

export type Spacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type Theme = {
  mode: ThemeMode;
  colors: ThemeColors;
  statusColors: StatusColors;
  commonColors: CommonColors;
  spacing: Spacing;
  padding: Spacing;
  margin: Spacing;
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  borderWidth: {
    thin: number;
    medium: number;
    thick: number;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  fontWeight: {
    light: "300";
    regular: "400";
    medium: "500";
    semibold: "600";
    bold: "700";
    extrabold: "800";
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
  textStyles: Record<string, unknown>;
};
