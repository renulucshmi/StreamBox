/**
 * Watch Later Slice
 * Redux slice for managing watch later movies
 * Pure reducer functions with no side effects
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchLater: [],
};

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState,
  reducers: {
    /**
     * Add a movie to watch later
     * @param {Object} state - Current state
     * @param {Object} action - Action with movie payload
     */
    addToWatchLater: (state, action) => {
      const movie = action.payload;
      const exists = state.watchLater.find((item) => item.id === movie.id);

      if (!exists) {
        state.watchLater.push(movie);
      }
    },

    /**
     * Remove a movie from watch later
     * @param {Object} state - Current state
     * @param {Object} action - Action with movie ID payload
     */
    removeFromWatchLater: (state, action) => {
      const movieId = action.payload;
      state.watchLater = state.watchLater.filter((item) => item.id !== movieId);
    },

    /**
     * Load watch later from storage (used during app initialization)
     * @param {Object} state - Current state
     * @param {Object} action - Action with watch later array payload
     */
    loadWatchLater: (state, action) => {
      state.watchLater = action.payload;
    },

    /**
     * Clear all watch later movies
     * @param {Object} state - Current state
     */
    clearWatchLater: (state) => {
      state.watchLater = [];
    },
  },
});

// Export actions
export const {
  addToWatchLater,
  removeFromWatchLater,
  loadWatchLater,
  clearWatchLater,
} = watchLaterSlice.actions;

// Selectors
export const selectWatchLater = (state) => state.watchLater.watchLater;
export const selectWatchLaterCount = (state) =>
  state.watchLater.watchLater.length;
export const selectIsInWatchLater = (movieId) => (state) =>
  state.watchLater.watchLater.some((item) => item.id === movieId);

// Export reducer
export default watchLaterSlice.reducer;
