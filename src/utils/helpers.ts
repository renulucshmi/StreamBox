/**
 * Helper Utilities
 * Pure utility functions for common operations
 */

interface Movie {
  id: string;
  title: string;
  rating?: number;
  status?: string;
  language?: string;
  [key: string]: any;
}

/**
 * Filter movies by search query
 */
export const filterMoviesBySearch = (
  movies: Movie[],
  query: string
): Movie[] => {
  if (!query || !query.trim()) {
    return movies;
  }

  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Filter movies by language
 */
export const filterMoviesByLanguage = (
  movies: Movie[],
  language: string
): Movie[] => {
  if (!language || language === "all") {
    return movies;
  }

  return movies.filter(
    (movie) => movie.language?.toLowerCase() === language.toLowerCase()
  );
};

/**
 * Filter movies by search query and language
 */
export const filterMovies = (
  movies: Movie[],
  searchQuery: string,
  languageFilter: string
): Movie[] => {
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
 */
export const isMovieInList = (movieList: Movie[], movieId: string): boolean => {
  return movieList.some((movie) => movie.id === movieId);
};

/**
 * Sort movies by rating (descending)
 */
export const sortMoviesByRating = (movies: Movie[]): Movie[] => {
  return [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0));
};

/**
 * Sort movies by title (alphabetically)
 */
export const sortMoviesByTitle = (movies: Movie[]): Movie[] => {
  return [...movies].sort((a, b) => a.title.localeCompare(b.title));
};

/**
 * Group movies by status
 */
export const groupMoviesByStatus = (
  movies: Movie[]
): Record<string, Movie[]> => {
  return movies.reduce((acc, movie) => {
    const status = movie.status || "Unknown";
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(movie);
    return acc;
  }, {} as Record<string, Movie[]>);
};

/**
 * Group movies by language
 */
export const groupMoviesByLanguage = (
  movies: Movie[]
): Record<string, Movie[]> => {
  return movies.reduce((acc, movie) => {
    const language = movie.language || "Unknown";
    if (!acc[language]) {
      acc[language] = [];
    }
    acc[language].push(movie);
    return acc;
  }, {} as Record<string, Movie[]>);
};

/**
 * Get unique languages from movies array
 */
export const getUniqueLanguages = (movies: Movie[]): string[] => {
  const languages = movies
    .map((movie) => movie.language)
    .filter((language): language is string => Boolean(language));
  return [...new Set(languages)];
};

/**
 * Get unique statuses from movies array
 */
export const getUniqueStatuses = (movies: Movie[]): string[] => {
  const statuses = movies
    .map((movie) => movie.status)
    .filter((status): status is string => Boolean(status));
  return [...new Set(statuses)];
};

/**
 * Format rating for display
 */
export const formatRating = (rating?: number, decimals: number = 1): string => {
  if (!rating && rating !== 0) {
    return "N/A";
  }
  return rating.toFixed(decimals);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix: string = "..."
): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + suffix;
};

/**
 * Capitalize first letter of a string
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
