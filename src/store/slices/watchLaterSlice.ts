/**
 * Watch Later Slice
 * Redux slice for managing watch later movies
 * Pure reducer functions with no side effects
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../types/movie";

interface WatchLaterState {
  watchLater: Movie[];
}

const initialState: WatchLaterState = {
  watchLater: [],
};

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState,
  reducers: {
    /**
     * Add a movie to watch later
     */
    addToWatchLater: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const exists = state.watchLater.find((item) => item.id === movie.id);

      if (!exists) {
        state.watchLater.push(movie);
      }
    },

    /**
     * Remove a movie from watch later
     */
    removeFromWatchLater: (state, action: PayloadAction<string>) => {
      const movieId = action.payload;
      state.watchLater = state.watchLater.filter((item) => item.id !== movieId);
    },

    /**
     * Load watch later from storage (used during app initialization)
     */
    loadWatchLater: (state, action: PayloadAction<Movie[]>) => {
      state.watchLater = action.payload;
    },

    /**
     * Clear all watch later movies
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
export const selectWatchLater = (state: {
  watchLater: WatchLaterState;
}): Movie[] => state.watchLater.watchLater;

export const selectWatchLaterCount = (state: {
  watchLater: WatchLaterState;
}): number => state.watchLater.watchLater.length;

export const selectIsInWatchLater =
  (movieId: string) =>
  (state: { watchLater: WatchLaterState }): boolean =>
    state.watchLater.watchLater.some((item: Movie) => item.id === movieId);

// Export reducer
export default watchLaterSlice.reducer;
