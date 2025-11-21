/**
 * Storage Service
 * Persistence layer for AsyncStorage
 * Keeps storage logic separate from components and contexts
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage keys
const STORAGE_KEYS = {
  USER: "streambox_user",
  THEME: "streambox_theme",
  FAVOURITES: "streambox_favourites",
  WATCH_LATER: "streambox_watch_later",
};

/**
 * Generic function to save data to storage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {Promise<void>}
 */
const saveData = async (key, value) => {
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
 * @param {string} key - Storage key
 * @returns {Promise<any>} Retrieved value or null
 */
const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (!jsonValue) return null;

    // Try to parse JSON, return null if parsing fails
    try {
      return JSON.parse(jsonValue);
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
 * @param {string} key - Storage key
 * @returns {Promise<void>}
 */
const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data for key ${key}:`, error);
    throw error;
  }
};

/**
 * Clear all app data from storage
 * @returns {Promise<void>}
 */
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
    throw error;
  }
};

// User-specific storage functions
export const saveUser = (userData) => saveData(STORAGE_KEYS.USER, userData);
export const getUser = () => getData(STORAGE_KEYS.USER);
export const removeUser = () => removeData(STORAGE_KEYS.USER);

// Theme-specific storage functions
export const saveTheme = (theme) => saveData(STORAGE_KEYS.THEME, theme);
export const getTheme = () => getData(STORAGE_KEYS.THEME);
export const removeTheme = () => removeData(STORAGE_KEYS.THEME);

// Favourites-specific storage functions
export const saveFavourites = (favourites) =>
  saveData(STORAGE_KEYS.FAVOURITES, favourites);
export const getFavourites = () => getData(STORAGE_KEYS.FAVOURITES);
export const removeFavourites = () => removeData(STORAGE_KEYS.FAVOURITES);

// Watch Later-specific storage functions
export const saveWatchLater = (watchLater) =>
  saveData(STORAGE_KEYS.WATCH_LATER, watchLater);
export const getWatchLater = () => getData(STORAGE_KEYS.WATCH_LATER);
export const removeWatchLater = () => removeData(STORAGE_KEYS.WATCH_LATER);

// Export storage keys for reference
export { STORAGE_KEYS };

// Export utility functions
export const storage = {
  save: saveData,
  get: getData,
  remove: removeData,
  clear: clearAll,
};
