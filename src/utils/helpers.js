/**
 * Helper Utilities
 * Pure utility functions for common operations
 */

/**
 * Filter movies by search query
 * @param {Array} movies - Array of movie objects
 * @param {string} query - Search query
 * @returns {Array} Filtered movies
 */
export const filterMoviesBySearch = (movies, query) => {
  if (!query || !query.trim()) {
    return movies;
  }

  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Filter movies by language
 * @param {Array} movies - Array of movie objects
 * @param {string} language - Language filter ('all' or specific language)
 * @returns {Array} Filtered movies
 */
export const filterMoviesByLanguage = (movies, language) => {
  if (!language || language === "all") {
    return movies;
  }

  return movies.filter(
    (movie) => movie.language.toLowerCase() === language.toLowerCase()
  );
};

/**
 * Filter movies by search query and language
 * @param {Array} movies - Array of movie objects
 * @param {string} searchQuery - Search query
 * @param {string} languageFilter - Language filter
 * @returns {Array} Filtered movies
 */
export const filterMovies = (movies, searchQuery, languageFilter) => {
  let filtered = movies;

  // Apply search filter
  if (searchQuery && searchQuery.trim()) {
    filtered = filterMoviesBySearch(filtered, searchQuery);
  }

  // Apply language filter
  if (languageFilter && languageFilter !== "all") {
    filtered = filterMoviesByLanguage(filtered, languageFilter);
  }

  return filtered;
};

/**
 * Check if movie exists in a list by ID
 * @param {Array} movieList - Array of movie objects
 * @param {string} movieId - Movie ID to check
 * @returns {boolean} True if movie exists
 */
export const isMovieInList = (movieList, movieId) => {
  return movieList.some((movie) => movie.id === movieId);
};

/**
 * Sort movies by rating (descending)
 * @param {Array} movies - Array of movie objects
 * @returns {Array} Sorted movies
 */
export const sortMoviesByRating = (movies) => {
  return [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0));
};

/**
 * Sort movies by title (alphabetically)
 * @param {Array} movies - Array of movie objects
 * @returns {Array} Sorted movies
 */
export const sortMoviesByTitle = (movies) => {
  return [...movies].sort((a, b) => a.title.localeCompare(b.title));
};

/**
 * Group movies by status
 * @param {Array} movies - Array of movie objects
 * @returns {Object} Object with movies grouped by status
 */
export const groupMoviesByStatus = (movies) => {
  return movies.reduce((acc, movie) => {
    const status = movie.status || "Unknown";
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(movie);
    return acc;
  }, {});
};

/**
 * Group movies by language
 * @param {Array} movies - Array of movie objects
 * @returns {Object} Object with movies grouped by language
 */
export const groupMoviesByLanguage = (movies) => {
  return movies.reduce((acc, movie) => {
    const language = movie.language || "Unknown";
    if (!acc[language]) {
      acc[language] = [];
    }
    acc[language].push(movie);
    return acc;
  }, {});
};

/**
 * Get unique languages from movies array
 * @param {Array} movies - Array of movie objects
 * @returns {Array} Array of unique languages
 */
export const getUniqueLanguages = (movies) => {
  const languages = movies
    .map((movie) => movie.language)
    .filter((language) => language);
  return [...new Set(languages)];
};

/**
 * Get unique statuses from movies array
 * @param {Array} movies - Array of movie objects
 * @returns {Array} Array of unique statuses
 */
export const getUniqueStatuses = (movies) => {
  const statuses = movies
    .map((movie) => movie.status)
    .filter((status) => status);
  return [...new Set(statuses)];
};

/**
 * Format rating for display
 * @param {number} rating - Rating value
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted rating
 */
export const formatRating = (rating, decimals = 1) => {
  if (!rating && rating !== 0) {
    return "N/A";
  }
  return rating.toFixed(decimals);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add when truncated (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength, suffix = "...") => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + suffix;
};

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
