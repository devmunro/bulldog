import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//API LINK
const API_URL = process.env.REACT_APP_API_BASE_URL;

// register user
export const registerUser = createAsyncThunk(
  "auth/regUser",
  async (userdata) => {
    try {
      const response = await axios.post(`${API_URL}signup`, userdata);
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error );
    }
  }
);

//login user
export const loginUser = createAsyncThunk("auth/logUser", async (userdata) => {
  try {
    const response = await axios.post(`${API_URL}login`, userdata);

    console.log(response.data);
    if (response.data.token) {
      localStorage.setItem("token", JSON.stringify(response.data.token));

      return response.data;
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Get user details //

export const getUserDetails = createAsyncThunk("auth/getDetails", async () => {
  const userToken = JSON.parse(localStorage.getItem("token"));

  const headers = { Authorization: `Bearer ${userToken}` };

  try {
    const response = await axios.get(`${API_URL}profile`, { headers });

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem(
        "defaultWorkout",
        JSON.stringify(response.data.defaultWorkout)
      );

      return { user: response.data };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
});

// LOGOUT

export const logout = createAsyncThunk("auth/logout", async () => {
  // Clear the localStorage items for user and token

  console.log("Clearing localStorage data...");

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("defaultWorkout");

  // delete the user token from the server
  const userToken = JSON.parse(localStorage.getItem("token"));
  const headers = { Authorization: `Bearer ${userToken}` };

  try {
    await axios.delete(`${API_URL}logout`, { headers });
    console.log("User has been logged out");
    return;
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    token: JSON.parse(localStorage.getItem("token")) || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
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
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        localStorage.removeItem("token"); // remove old user token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = JSON.parse(localStorage.getItem("token"));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("user"); // remove user data from local storage
        localStorage.removeItem("token"); // remove user token from local storage
      });
  },
});

export const { clearState } = userSlice.actions;
export default userSlice.reducer;
