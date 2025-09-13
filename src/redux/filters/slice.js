
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: null,
  rentalPrice: null,
  minMileage: null,
  maxMileage: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setPrice: (state, action) => {
      state.rentalPrice = action.payload;
    },
    setMileageFrom: (state, action) => {
      state.minMileage = action.payload;
    },
    setMileageTo: (state, action) => {
      state.maxMileage = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setBrand, setPrice, setMileageFrom, setMileageTo, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;