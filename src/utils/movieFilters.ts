/**
 * Movie Filter Utilities
 * Shared filtering logic for all screens
 */

import { Movie } from "../types/movie";

export function filterMovies(
  movies: Movie[],
  selectedLanguages: string[],
  selectedGenres: string[]
): Movie[] {
  return movies.filter((movie) => {
    // Language filter - if empty, ignore
    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.includes(movie.language);

    // Genre filter - if empty, ignore
    // Otherwise, at least one movie genre must be in selectedGenres
    const matchesGenre =
      selectedGenres.length === 0 ||
      movie.genres.some((genre) => selectedGenres.includes(genre));

    return matchesLanguage && matchesGenre;
  });
}

// Extract unique languages from movie list
export function getUniqueLanguages(movies: Movie[]): string[] {
  const languages = new Set<string>();
  movies.forEach((movie) => languages.add(movie.language));
  return Array.from(languages).sort();
}

// Extract unique genres from movie list
export function getUniqueGenres(movies: Movie[]): string[] {
  const genres = new Set<string>();
  movies.forEach((movie) => {
    movie.genres.forEach((genre) => genres.add(genre));
  });
  return Array.from(genres).sort();
}
