import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types/movie";

interface LibraryState {
  favourites: Movie[];
  watchLater: Movie[];
}

const initialState: LibraryState = {
  favourites: [],
  watchLater: [],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const exists = state.favourites.find((item) => item.id === movie.id);
      if (!exists) {
        state.favourites.push(movie);
      }
    },
    removeFromFavourites: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      state.favourites = state.favourites.filter((item) => item.id !== movieId);
    },
    addToWatchLater: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const exists = state.watchLater.find((item) => item.id === movie.id);
      if (!exists) {
        state.watchLater.push(movie);
      }
    },
    removeFromWatchLater: (state, action: PayloadAction<number>) => {
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
