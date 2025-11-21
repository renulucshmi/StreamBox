/**
 * Storage Service (TypeScript)
 * Persistence layer for AsyncStorage
 * Keeps storage logic separate from components and contexts
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ThemeMode, User } from "../types";

// Storage keys
const STORAGE_KEYS = {
  USER: "streambox_user",
  THEME: "streambox_theme",
  FAVOURITES: "streambox_favourites",
  WATCH_LATER: "streambox_watch_later",
} as const;

/**
 * Generic function to save data to storage
 */
const saveData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error);
    throw error;
  }
};

/**
 * Generic function to get data from storage
 */
const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (!jsonValue) return null;

    // Try to parse JSON, return null if parsing fails
    try {
      return JSON.parse(jsonValue) as T;
    } catch (parseError) {
      console.error(`JSON parse error for key ${key}:`, parseError);
      // Clear corrupted data
      await AsyncStorage.removeItem(key);
      return null;
    }
  } catch (error) {
    console.error(`Error getting data for key ${key}:`, error);
    return null;
  }
};

/**
 * Generic function to remove data from storage
 */
const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data for key ${key}:`, error);
    throw error;
  }
};

/**
 * Clear all app data from storage
 */
const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
    throw error;
  }
};

// User-specific storage functions
export const saveUser = (userData: User): Promise<void> =>
  saveData(STORAGE_KEYS.USER, userData);
export const getUser = (): Promise<User | null> =>
  getData<User>(STORAGE_KEYS.USER);
export const removeUser = (): Promise<void> => removeData(STORAGE_KEYS.USER);

// Theme-specific storage functions
export const saveTheme = (theme: ThemeMode): Promise<void> =>
  saveData(STORAGE_KEYS.THEME, theme);
export const getTheme = (): Promise<ThemeMode | null> =>
  getData<ThemeMode>(STORAGE_KEYS.THEME);
export const removeTheme = (): Promise<void> => removeData(STORAGE_KEYS.THEME);

// Favourites-specific storage functions
export const saveFavourites = (favourites: number[]): Promise<void> =>
  saveData(STORAGE_KEYS.FAVOURITES, favourites);
export const getFavourites = (): Promise<number[] | null> =>
  getData<number[]>(STORAGE_KEYS.FAVOURITES);
export const removeFavourites = (): Promise<void> =>
  removeData(STORAGE_KEYS.FAVOURITES);

// Watch Later-specific storage functions
export const saveWatchLater = (watchLater: number[]): Promise<void> =>
  saveData(STORAGE_KEYS.WATCH_LATER, watchLater);
export const getWatchLater = (): Promise<number[] | null> =>
  getData<number[]>(STORAGE_KEYS.WATCH_LATER);
export const removeWatchLater = (): Promise<void> =>
  removeData(STORAGE_KEYS.WATCH_LATER);

// Export storage keys for reference
export { STORAGE_KEYS };

// Export utility functions
export const storage = {
  save: saveData,
  get: getData,
  remove: removeData,
  clear: clearAll,
};
