/**
 * Utils Index
 * Central export point for all utility functions
 */

// Validation utilities
export {
  isValidForm,
  validateEmail,
  validateLoginForm,
  validatePassword,
  validatePasswordsMatch,
  validateRegistrationForm,
  validateUsername,
} from "./validation";

// Helper utilities
export {
  capitalizeFirstLetter,
  debounce,
  filterMovies,
  filterMoviesByLanguage,
  filterMoviesBySearch,
  formatRating,
  getUniqueLanguages,
  getUniqueStatuses,
  groupMoviesByLanguage,
  groupMoviesByStatus,
  isMovieInList,
  sortMoviesByRating,
  sortMoviesByTitle,
  truncateText,
} from "./helpers";

// Movie-specific utilities
export {
  formatMovieDetails,
  getDefaultOverview,
  getLanguageOptions,
  getMovieCardDimensions,
  getSectionTitle,
  getStatusColor,
} from "./movieHelpers";
