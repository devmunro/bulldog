import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//API LINK
const API_URL = process.env.REACT_APP_API_BASE_URL;

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

export const createWorkout = createAsyncThunk(
  "exercise/createWorkout",
  async (workoutCreateData) => {
    try {
      const response = await axios.post(
        `${API_URL}workout/createworkout`,
        workoutCreateData
      );

      if (response) {
        const currentUser = JSON.parse(localStorage.getItem("user"));

        // Update the user workout
        const updatedUser = {
          ...currentUser,
          workouts: currentUser.workouts.concat(response.data),
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        console.log(response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findWorkout = createAsyncThunk(
  "exercise/findWorkout",
  async (userID) => {
    console.log(userID);
    try {
      const response = await axios.get(`${API_URL}workout/findworkouts`, {
        params: { userID },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    workoutList: [],
  },

  reducers: {},
  
});
export default exerciseSlice.reducer;
