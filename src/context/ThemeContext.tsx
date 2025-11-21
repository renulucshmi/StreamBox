/**
 * Theme Context (TypeScript)
 * Refactored to use storageService and theme constants
 * Separation of concerns: theme state management separated from storage
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { getTheme, saveTheme } from "../services/storageService";
import { darkTheme, lightTheme } from "../theme";
import type { Theme, ThemeContextType, ThemeMode } from "../types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [loading, setLoading] = useState<boolean>(true);

  // Load theme from storage on app start
  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  const loadThemeFromStorage = async (): Promise<void> => {
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

  const toggleTheme = async (): Promise<void> => {
    try {
      const newTheme: ThemeMode = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      await saveTheme(newTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  const currentTheme = (theme === "light" ? lightTheme : darkTheme) as Theme;

  const value: ThemeContextType = {
    theme: currentTheme,
    themeMode: theme,
    toggleTheme,
    loading,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
