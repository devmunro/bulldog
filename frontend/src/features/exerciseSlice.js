import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//API LINK
const API_URL = "/api/";

// fetch Exercises
export const fetchExercise = createAsyncThunk(
  "exercise/fetchCards",
  async (category) => {
    try {
      const response = await axios.get(`${API_URL}exercises?type=${category}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState: [],
});

export default exerciseSlice.reducer;
