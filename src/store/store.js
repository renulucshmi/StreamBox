import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import favouritesReducer from "./favouritesSlice";
import libraryReducer from "./librarySlice";

// Redux Persist configuration for library
const libraryPersistConfig = {
  key: "library",
  storage: AsyncStorage,
  whitelist: ["watchLater"], // Only persist watchLater in library
};

// Redux Persist configuration for favourites
const favouritesPersistConfig = {
  key: "favourites",
  storage: AsyncStorage,
  whitelist: ["favourites"], // Persist favourites
};

const rootReducer = combineReducers({
  library: persistReducer(libraryPersistConfig, libraryReducer),
  favourites: persistReducer(favouritesPersistConfig, favouritesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
