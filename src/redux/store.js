


import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./car/slice.js";
import filtersReducer from "./filters/slice.js";
import favoritesReducer from "./favorite/slice.js";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});