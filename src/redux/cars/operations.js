import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from '../ui/slice.js';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { page } = state.cars;
    const { brand, rentalPrice, minMileage, maxMileage } = state.filters;

    try {
      thunkAPI.dispatch(setLoading(true));

      const params = {
        page,
        limit: 12,
      };

      if (brand !== null && brand !== undefined && brand !== '') params.brand = brand;

      if (rentalPrice !== null && rentalPrice !== undefined && rentalPrice !== '') {
        const rp = Number(rentalPrice);
        if (!Number.isNaN(rp)) params.rentalPrice = rp;
      }

      const kmToMiles = (km) => {
        if (km === null || km === undefined || km === '') return undefined;
        return Number((Number(km) / 1.60934).toFixed(2));
      };

      const minMiles = kmToMiles(minMileage);
      const maxMiles = kmToMiles(maxMileage);

      if (minMiles !== undefined) params.minMileage = minMiles;
      if (maxMiles !== undefined) params.maxMileage = maxMiles;

      const res = await axios.get("/cars", { params, signal: thunkAPI.signal });

      return {
        cars: res.data.cars,
        total: res.data.totalCars,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);