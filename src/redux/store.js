import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/slice.js";
// import brandsReducer from "./brands/slice.js";
import filtersReducer from './filters/slice.js';
import favoriteReducer from './favorite/slice.js';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedFavoritesReducer = persistReducer(
  {
    key: "favorites",
    storage,
    whitelist: ["favorites"],
  },
  favoriteReducer
);

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    // brands: brandsReducer,
    filters: filtersReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);