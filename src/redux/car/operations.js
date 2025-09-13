import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";



axios.defaults.baseURL = 'https://car-rental-api.goit.global/';



export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/cars");

      console.log('res.data', res.data);

      return res.data.cars;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchCars = createAsyncThunk("cars/fetchCars", async (filters, thunkAPI) => {
//     try {
//       const response = await axios.get("/cars", { params: filters });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   });