import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations.js";

const carsSlice = createSlice({
    name: "cars",
    initialState: {
      items: [],
      page: 1,
      totalCars: 0,
      loading: false,
      error: null,
    },
    reducers: {
      resetCars: (state) => {
        state.items = [];
        state.page = 1;
        state.totalCars = 0;
      },
      setPage: (state, action) => {
        state.page = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCars.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCars.fulfilled, (state, action) => {
          state.loading = false;
          if (state.page === 1) {
            state.items = action.payload.cars;
          } else {
            state.items = [...state.items, ...action.payload.cars];
          }
          state.totalCars = action.payload.total;
        })
        .addCase(fetchCars.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  export const { resetCars, setPage } = carsSlice.actions;
  export default carsSlice.reducer;