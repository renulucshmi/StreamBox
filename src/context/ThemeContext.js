import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const STORAGE_KEY = "streambox_theme";

// Light theme colors
export const lightTheme = {
  mode: "light",
  colors: {
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
    statusBar: "dark-content",
    searchPlaceholder: "#999999",
    shadowColor: "#000000",
    overlay: "rgba(0, 0, 0, 0.7)",
    emptyIcon: "#cccccc",
  },
};

// Dark theme colors
export const darkTheme = {
  mode: "dark",
  colors: {
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
    statusBar: "light-content",
    searchPlaceholder: "#7A7A82",
    shadowColor: "#000000",
    overlay: "rgba(0, 0, 0, 0.85)",
    emptyIcon: "#3A3A40",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  // Load theme from storage on app start
  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  const loadThemeFromStorage = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
        setTheme(storedTheme);
      }
    } catch (error) {
      console.error("Failed to load theme from storage:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      await AsyncStorage.setItem(STORAGE_KEY, newTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themeMode: theme,
        toggleTheme,
        loading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
