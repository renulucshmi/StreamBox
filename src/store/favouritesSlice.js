import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "streambox_favourites";

const initialState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
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
    loadFavourites: (state, action) => {
      state.favourites = action.payload;
    },
  },
});

export const { addToFavourites, removeFromFavourites, loadFavourites } =
  favouritesSlice.actions;

// Selectors
export const selectFavourites = (state) => state.favourites.favourites;

// AsyncStorage helper functions
export const saveFavouritesToStorage = async (favourites) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  } catch (error) {
    console.error("Error saving favourites:", error);
  }
};

export const loadFavouritesFromStorage = async () => {
  try {
    const favouritesJson = await AsyncStorage.getItem(STORAGE_KEY);
    return favouritesJson ? JSON.parse(favouritesJson) : [];
  } catch (error) {
    console.error("Error loading favourites:", error);
    return [];
  }
};

export default favouritesSlice.reducer;
