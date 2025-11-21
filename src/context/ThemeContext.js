/**
 * Theme Context
 * Refactored to use storageService and theme constants
 * Separation of concerns: theme state management separated from storage
 */

import { createContext, useContext, useEffect, useState } from "react";
import { getTheme, saveTheme } from "../services/storageService";
import { darkTheme, lightTheme } from "../theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  // Load theme from storage on app start
  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  const loadThemeFromStorage = async () => {
    try {
      const storedTheme = await getTheme();
      if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
        setTheme(storedTheme);
      } else if (storedTheme === null) {
        // If getTheme returns null (corrupted data was cleared), save default theme
        await saveTheme("light");
      }
    } catch (error) {
      console.error("Failed to load theme from storage:", error);
      // If error occurs, save default theme
      try {
        await saveTheme("light");
      } catch (saveError) {
        console.error("Failed to save default theme:", saveError);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      await saveTheme(newTheme);
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
