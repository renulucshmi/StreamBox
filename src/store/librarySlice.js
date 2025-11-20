import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
  watchLater: [],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      const movie = action.payload;
      // Check if movie already exists in favourites
      const exists = state.favourites.find((item) => item.id === movie.id);
      if (!exists) {
        state.favourites.push(movie);
      }
    },
    removeFromFavourites: (state, action) => {
      const movieId = action.payload;
      state.favourites = state.favourites.filter((item) => item.id !== movieId);
    },
    addToWatchLater: (state, action) => {
      const movie = action.payload;
      // Check if movie already exists in watch later
      const exists = state.watchLater.find((item) => item.id === movie.id);
      if (!exists) {
        state.watchLater.push(movie);
      }
    },
    removeFromWatchLater: (state, action) => {
      const movieId = action.payload;
      state.watchLater = state.watchLater.filter((item) => item.id !== movieId);
    },
  },
});

export const {
  addToFavourites,
  removeFromFavourites,
  addToWatchLater,
  removeFromWatchLater,
} = librarySlice.actions;

export default librarySlice.reducer;
