/**
 * App Constants
 * Centralized constants for the entire application
 */

// Storage keys
export const STORAGE_KEYS = {
  USER: "streambox_user",
  THEME: "streambox_theme",
  FAVOURITES: "streambox_favourites",
  WATCH_LATER: "streambox_watch_later",
};

// API configuration (for future real API integration)
export const API_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p",
  TIMEOUT: 10000,
};

// Movie grid configuration
export const MOVIE_GRID = {
  COLUMNS: 2,
  ASPECT_RATIO: 1.5,
  SPACING: 16,
};

// Language options
export const LANGUAGE_OPTIONS = [
  { label: "All Languages", value: "all" },
  { label: "English", value: "english" },
  { label: "Korean", value: "korean" },
  { label: "Spanish", value: "spanish" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
];

// Movie status types
export const MOVIE_STATUS = {
  POPULAR: "Popular",
  TRENDING: "Trending",
  UPCOMING: "Upcoming",
  TOP_RATED: "Top Rated",
};

// Validation rules
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MIN_USERNAME_LENGTH: 3,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME_REGEX: /^[a-zA-Z0-9_]+$/,
};

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: "Something went wrong. Please try again.",
  NETWORK: "Network error. Please check your connection.",
  AUTH_FAILED: "Authentication failed. Please try again.",
  INVALID_CREDENTIALS: "Invalid email or password.",
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: "Login successful!",
  REGISTER: "Registration successful!",
  ADDED_TO_FAVOURITES: "Added to Favourites!",
  REMOVED_FROM_FAVOURITES: "Removed from Favourites!",
  ADDED_TO_WATCH_LATER: "Added to Watch Later!",
  REMOVED_FROM_WATCH_LATER: "Removed from Watch Later!",
};

// Screen names (for navigation)
export const SCREENS = {
  HOME: "Home",
  DETAILS: "Details",
  TRENDING: "Trending",
  FAVOURITES: "Favourites",
  WATCH_LATER: "WatchLater",
  PROFILE: "Profile",
  LOGIN: "Login",
  REGISTER: "Register",
};

// Animation durations (in milliseconds)
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};
