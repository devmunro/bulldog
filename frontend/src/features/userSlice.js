import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//API LINK
const API_URL = "/api/";

// fetch Exercises
export const registerUser = createAsyncThunk(
  "auth/regUser",
  async (userdata) => {
    try {
      const response = await axios.post(`${API_URL}signup`, userdata);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    clearState: (state) => {
      state.error = null;
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { clearState } = userSlice.actions;
export default userSlice.reducer;
