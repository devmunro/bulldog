import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';



//API LINK
const API_URL = "https://bulldog-server.onrender.com/api/"

// register user
// export const registerUser = createAsyncThunk(
//   "auth/regUser",
//   async (userdata) => {
//     try {
//       const response = await axios.post(`${API_URL}signup`, userdata);
//       return response.data;
//     } catch (error) {
//       console.log(error.response.data.error);

//       throw new Error(error.response.data.error );
//     }
//   }
// );

//login user
export const loginUser = createAsyncThunk("auth/logUser", async (userdata) => {
  try {
    const response = await axios.post(`${API_URL}login`, userdata);

    console.log(response.data.token);
    if (response.data.token) {
      await AsyncStorage.setItem("token", response.data.token);

      // Serialize the token to a string before returning it
      return response.data.token;
    }
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});


// Get user details //
export const getUserDetails = createAsyncThunk("auth/getDetails", async () => {
  const userToken = await AsyncStorage.getItem("token");

  const headers = { Authorization: `Bearer ${userToken}` };

  try {
    const response = await axios.get(`${API_URL}profile`, { headers });

    if (response.data) {
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      await AsyncStorage.setItem(
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
  try {
    console.log("Clearing localStorage data...");

    // Retrieve the user token first before clearing all AsyncStorage data
    const userToken = await AsyncStorage.getItem("token");

    // Then remove all items
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("defaultWorkout");

    // Delete the user token from the server
    const headers = { Authorization: `Bearer ${userToken}` };

    const response = await axios.delete(`${API_URL}logout`, { headers });

    if (response.status !== 200) {
      throw new Error(`Failed to logout, server responded with status code ${response.status}`);
    }

    console.log("User has been logged out");
  } catch (error) {
    console.error('Failed to logout:', error);
    throw error;
  }
});

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    token:null,
    user:  null,
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
      // .addCase(registerUser.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(registerUser.fulfilled, (state) => {
      //   state.loading = false;
      //   state.success = true;
      //   AsyncStorage.removeItem("token"); // remove old user token
      // })
      // .addCase(registerUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // .addCase(getUserDetails.pending, (state) => {
      //   state.loading = true;
      // })
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
        state.token = null
      });
  },
});

export const { clearState } = userSlice.actions;
export default userSlice.reducer;
