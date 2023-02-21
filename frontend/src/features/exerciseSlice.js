import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//API LINK
const API_URL = process.env.REACT_APP_API_BASE_URL;

// fetch Exercises3
export const fetchExercise = createAsyncThunk(
  "fitness/fetchCards",

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
  "fitness/createWorkout",
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

      return { workout: response.data.id, data: response.data };
    } catch (error) {
      console.log(error);
    }
  }
);

//find all workouts
export const findWorkout = createAsyncThunk(
  "fitness/findWorkout",
  async (userID) => {
    console.log(userID);
    try {
      const response = await axios.get(`${API_URL}workout/findworkouts`, {
        params: { userID },
      });
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// add exercise to current workout
export const addExercise = createAsyncThunk(
  "fitness/addExercise",
  async (exercise) => {
    try {
      const response = await axios.put(
        `${API_URL}workout/addexercise`,
        exercise
      );
    } catch (error) {}
  }
);

//find dfault workout
export const findSingleWorkout = createAsyncThunk(
  "fitness/findSingleWorkout",
  async (workoutID) => {
    try {
      const response = await axios.get(`${API_URL}workout/findsingleworkout`, {
        params: { workoutID },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//set default workout
export const setDefaultWorkout = createAsyncThunk(
  "fitness/setDefaultWorkout",
  async (userWorkoutID) => {
    console.log(userWorkoutID);
    try {
      const response = await axios.put(
        `${API_URL}workout/setdefaultworkout`,
        userWorkoutID
      );
      console.log(response);

      localStorage.setItem("defaultWorkout", response.data.workoutID);
      return { defaultWorkout: response.data.workoutID };
    } catch (error) {
      console.log(error);
    }
  }
);

export const exerciseSlice = createSlice({
  name: "fitness",
  initialState: {
    defaultWorkout: localStorage.getItem("defaultWorkout"),
    loading: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createWorkout.fulfilled, (state, action) => {});
    builder.addCase(findWorkout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(findWorkout.fulfilled, (state, action) => {
      state.loading = false;
      state.userWorkouts = action.payload;
    });
    builder.addCase(findSingleWorkout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(findSingleWorkout.fulfilled, (state, action) => {
      state.loading = false;
      state.userWorkouts = action.payload;
    });
    builder.addCase(setDefaultWorkout.fulfilled, (state, action) => {
      console.log("Default workout set to:", action.payload.defaultWorkout);

      state.defaultWorkout = action.payload.defaultWorkout;
    });
  },
});
export default exerciseSlice.reducer;
