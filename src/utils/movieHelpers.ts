/**
 * Movie Utilities
 * Specific utilities for movie-related operations
 */

interface Movie {
  title: string;
  status: string;
  rating?: number;
  language?: string;
  overview?: string;
  [key: string]: any;
}

interface LanguageOption {
  label: string;
  value: string;
}

interface CardDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

/**
 * Get status color for a movie status
 */
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    Popular: "#FF6B6B",
    Trending: "#4ECDC4",
    Upcoming: "#FFD93D",
    "Top Rated": "#6BCB77",
  };

  return statusColors[status] || "#95A5A6";
};

/**
 * Generate default overview text for a movie
 */
export const getDefaultOverview = (movie: Movie): string => {
  return `${
    movie.title
  } is a ${movie.status.toLowerCase()} movie that has captivated audiences worldwide. With stunning visuals and compelling storytelling, this film delivers an unforgettable cinematic experience. The talented cast brings the characters to life in ways that will keep you engaged from start to finish.`;
};

/**
 * Format movie details for display
 */
export const formatMovieDetails = (movie: Movie) => {
  return {
    language: movie.language || "N/A",
    status: movie.status || "Unknown",
    rating: movie.rating ? `${movie.rating}/10` : "N/A",
    overview: movie.overview || getDefaultOverview(movie),
  };
};

/**
 * Get section title based on filters
 */
export const getSectionTitle = (
  searchQuery: string,
  languageFilter: string
): string => {
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
 */
export const getLanguageOptions = (): LanguageOption[] => {
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
 */
export const getMovieCardDimensions = (
  screenWidth: number,
  columns: number = 2,
  padding: number = 48
): CardDimensions => {
  const cardWidth = (screenWidth - padding) / columns;
  const cardHeight = cardWidth * 1.5; // 3:2 aspect ratio

  return {
    width: cardWidth,
    height: cardHeight,
    aspectRatio: 1.5,
  };
};
