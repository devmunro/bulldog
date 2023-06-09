import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//API LINK // main url
const API_URL = process.env.REACT_APP_API_BASE_URL

console.log(API_URL)

// getbodyweight
export const getBodyWeight = createAsyncThunk(
  "body/fetchBodyWeight",

  async (user) => {
    console.log("bodyweight redux user", user)
    try {
      const response = await axios.get(`${API_URL}bodyStats/?userID=${user}`);

      console.log("bodyweight redux RESPONSE", response.data)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const bodyStatSlice = createSlice({
  name: "body",
  initialState: {
    bodyWeight: null,
    status: "idle",
    error: null,
  },
  reducers: {
    //...
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBodyWeight.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBodyWeight.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched data to the state
        state.bodyWeight = action.payload;
      })
      .addCase(getBodyWeight.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bodyStatSlice.reducer;
