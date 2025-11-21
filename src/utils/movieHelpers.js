/**
 * Movie Utilities
 * Specific utilities for movie-related operations
 */

/**
 * Get status color for a movie status
 * @param {string} status - Movie status
 * @returns {string} Color hex code
 */
export const getStatusColor = (status) => {
  const statusColors = {
    Popular: "#FF6B6B",
    Trending: "#4ECDC4",
    Upcoming: "#FFD93D",
    "Top Rated": "#6BCB77",
  };

  return statusColors[status] || "#95A5A6";
};

/**
 * Generate default overview text for a movie
 * @param {Object} movie - Movie object
 * @returns {string} Default overview text
 */
export const getDefaultOverview = (movie) => {
  return `${
    movie.title
  } is a ${movie.status.toLowerCase()} movie that has captivated audiences worldwide. With stunning visuals and compelling storytelling, this film delivers an unforgettable cinematic experience. The talented cast brings the characters to life in ways that will keep you engaged from start to finish.`;
};

/**
 * Format movie details for display
 * @param {Object} movie - Movie object
 * @returns {Object} Formatted details
 */
export const formatMovieDetails = (movie) => {
  return {
    language: movie.language || "N/A",
    status: movie.status || "Unknown",
    rating: movie.rating ? `${movie.rating}/10` : "N/A",
    overview: movie.overview || getDefaultOverview(movie),
  };
};

/**
 * Get section title based on filters
 * @param {string} searchQuery - Current search query
 * @param {string} languageFilter - Current language filter
 * @returns {string} Section title
 */
export const getSectionTitle = (searchQuery, languageFilter) => {
  if (searchQuery) {
    return "Search Results";
  }

  if (languageFilter === "all") {
    return "All Movies";
  }

  return `${
    languageFilter.charAt(0).toUpperCase() + languageFilter.slice(1)
  } Movies`;
};

/**
 * Get available languages for filter dropdown
 * @returns {Array} Array of language options
 */
export const getLanguageOptions = () => {
  return [
    { label: "All Languages", value: "all" },
    { label: "English", value: "english" },
    { label: "Korean", value: "korean" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "German", value: "german" },
  ];
};

/**
 * Calculate movie grid layout
 * @param {number} screenWidth - Screen width
 * @param {number} columns - Number of columns (default: 2)
 * @param {number} padding - Total horizontal padding (default: 48)
 * @returns {Object} Layout dimensions
 */
export const getMovieCardDimensions = (
  screenWidth,
  columns = 2,
  padding = 48
) => {
  const cardWidth = (screenWidth - padding) / columns;
  const cardHeight = cardWidth * 1.5; // 3:2 aspect ratio

  return {
    width: cardWidth,
    height: cardHeight,
    aspectRatio: 1.5,
  };
};
