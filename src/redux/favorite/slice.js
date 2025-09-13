import { createSlice } from "@reduxjs/toolkit";

const FAVORITES_STORAGE_KEY = "favorites";

const getInitialFavorites = () => {
  const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: getInitialFavorites(),
  reducers: {
    addFavorite: (state, action) => {
      if (!state.find((car) => car.id === action.payload.id)) {
        state.push(action.payload);
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state));
      }
    },
    removeFavorite: (state, action) => {
      const filtered = state.filter((car) => car.id !== action.payload);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(filtered));
      return filtered;
    },
    clearFavorites: () => {
      localStorage.removeItem(FAVORITES_STORAGE_KEY);
      return [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;