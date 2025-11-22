/**
 * Services Index
 * Central export point for all services
 */

// Movie service
export {
  fetchMovieById,
  fetchMovies,
  fetchMoviesByLanguage,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  searchMovies,
} from "./movieService";

// Auth service
export {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  verifyToken,
} from "./authService";

// Storage service
export {
  STORAGE_KEYS,
  getFavourites,
  getTheme,
  getUser,
  getWatchLater,
  removeFavourites,
  removeTheme,
  removeUser,
  removeWatchLater,
  saveFavourites,
  saveTheme,
  saveUser,
  saveWatchLater,
  storage,
} from "./storageService";
