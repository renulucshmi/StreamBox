/**
 * Favourites Slice
 * Redux slice for managing favourite movies
 * Pure reducer functions with no side effects
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../types/movie";

interface FavouritesState {
  favourites: Movie[];
}

const initialState: FavouritesState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    /**
     * Add a movie to favourites
     */
    addToFavourites: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const exists = state.favourites.find((item) => item.id === movie.id);

      if (!exists) {
        state.favourites.push(movie);
      }
    },

    /**
     * Remove a movie from favourites
     */
    removeFromFavourites: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      state.favourites = state.favourites.filter((item) => item.id !== movieId);
    },

    /**
     * Load favourites from storage (used during app initialization)
     */
    loadFavourites: (state, action: PayloadAction<Movie[]>) => {
      state.favourites = action.payload;
    },

    /**
     * Clear all favourites
     */
    clearFavourites: (state) => {
      state.favourites = [];
    },
  },
});

// Export actions
export const {
  addToFavourites,
  removeFromFavourites,
  loadFavourites,
  clearFavourites,
} = favouritesSlice.actions;

// Selectors
export const selectFavourites = (state: {
  favourites: FavouritesState;
}): Movie[] => state.favourites.favourites;

export const selectFavouritesCount = (state: {
  favourites: FavouritesState;
}): number => state.favourites.favourites.length;

export const selectIsFavourite =
  (movieId: number) =>
  (state: { favourites: FavouritesState }): boolean =>
    state.favourites.favourites.some((item: Movie) => item.id === movieId);

// Export reducer
export default favouritesSlice.reducer;
