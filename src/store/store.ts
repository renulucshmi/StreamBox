import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import favouritesReducer from "./slices/favouritesSlice";
import watchLaterReducer from "./slices/watchLaterSlice";

// Redux Persist configuration for watch later
const watchLaterPersistConfig = {
  key: "watchLater",
  storage: AsyncStorage,
  whitelist: ["watchLater"],
};

// Redux Persist configuration for favourites
const favouritesPersistConfig = {
  key: "favourites",
  storage: AsyncStorage,
  whitelist: ["favourites"],
};

const rootReducer = combineReducers({
  favourites: persistReducer(favouritesPersistConfig, favouritesReducer),
  watchLater: persistReducer(watchLaterPersistConfig, watchLaterReducer),
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

// Infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
