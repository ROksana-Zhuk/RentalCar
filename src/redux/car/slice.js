import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations.js";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    resetCars: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
