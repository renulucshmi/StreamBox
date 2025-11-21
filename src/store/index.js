/**
 * Redux Store Configuration
 * Configures Redux store with Redux Toolkit and persistence
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import favouritesReducer from "./slices/favouritesSlice";
import watchLaterReducer from "./slices/watchLaterSlice";

// Redux Persist configuration for favourites
const favouritesPersistConfig = {
  key: "favourites",
  storage: AsyncStorage,
  whitelist: ["favourites"], // Persist favourites array
};

// Redux Persist configuration for watch later
const watchLaterPersistConfig = {
  key: "watchLater",
  storage: AsyncStorage,
  whitelist: ["watchLater"], // Persist watchLater array
};

// Combine reducers with persistence
const rootReducer = combineReducers({
  favourites: persistReducer(favouritesPersistConfig, favouritesReducer),
  watchLater: persistReducer(watchLaterPersistConfig, watchLaterReducer),
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
