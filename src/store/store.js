import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import libraryReducer from "./librarySlice";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["library"], // Only persist library slice
};

const persistedReducer = persistReducer(persistConfig, libraryReducer);

export const store = configureStore({
  reducer: {
    library: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
