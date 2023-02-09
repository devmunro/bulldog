import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//API LINK
const API_URL = "https://bulldog-hx233d6wy-devmunro.vercel.app/api/";

// register user
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

// login user
export const loginUser = createAsyncThunk("auth/logUser", async (userdata) => {
  try {
    const response = await axios.post(`${API_URL}login`, userdata);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    userData: JSON.parse(localStorage.getItem("user")) || null,
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
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
      state.success = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { clearState } = userSlice.actions;
export default userSlice.reducer;
