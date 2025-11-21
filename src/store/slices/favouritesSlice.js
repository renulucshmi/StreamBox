/**
 * Favourites Slice
 * Redux slice for managing favourite movies
 * Pure reducer functions with no side effects
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    /**
     * Add a movie to favourites
     * @param {Object} state - Current state
     * @param {Object} action - Action with movie payload
     */
    addToFavourites: (state, action) => {
      const movie = action.payload;
      const exists = state.favourites.find((item) => item.id === movie.id);

      if (!exists) {
        state.favourites.push(movie);
      }
    },

    /**
     * Remove a movie from favourites
     * @param {Object} state - Current state
     * @param {Object} action - Action with movie ID payload
     */
    removeFromFavourites: (state, action) => {
      const movieId = action.payload;
      state.favourites = state.favourites.filter((item) => item.id !== movieId);
    },

    /**
     * Load favourites from storage (used during app initialization)
     * @param {Object} state - Current state
     * @param {Object} action - Action with favourites array payload
     */
    loadFavourites: (state, action) => {
      state.favourites = action.payload;
    },

    /**
     * Clear all favourites
     * @param {Object} state - Current state
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
export const selectFavourites = (state) => state.favourites.favourites;
export const selectFavouritesCount = (state) =>
  state.favourites.favourites.length;
export const selectIsFavourite = (movieId) => (state) =>
  state.favourites.favourites.some((item) => item.id === movieId);

// Export reducer
export default favouritesSlice.reducer;
