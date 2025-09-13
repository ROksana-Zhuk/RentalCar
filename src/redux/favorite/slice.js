import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      if (!state.find(car => car.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      return state.filter(car => car.id !== action.payload);
    },
    clearFavorites: () => {
      return [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;