import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const currentUser = JSON.parse(localStorage.getItem("user"));

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

      localStorage.setItem("defaultWorkout", JSON.stringify(response.data.id));
      return { workout: response.data.id, data: response.data };
    } catch (error) {
      console.log(error);
    }
  }
);

//find all workouts
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

//find dfault workout
export const findSingleWorkout = createAsyncThunk(
  "exercise/findSingleWorkout",
  async (workoutID) => {
    console.log(workoutID);
    try {
      const response = await axios.get(`${API_URL}workout/findsingleworkout`, {
        params: { workoutID },
      });
      localStorage.setItem("defaultWorkout", JSON.stringify(response.data.id));


      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addExercise = createAsyncThunk(
  "exercise/addExercise",
  async (exercise) => {
    try {
      const response = await axios.put(
        `${API_URL}workout/addexercise`,
        exercise
      );
    } catch (error) {}
  }
);

export const setDefaultWorkout = createAsyncThunk(
  "exercise/setDefaultWorkout",
  async (userWorkoutID) => {
    console.log(userWorkoutID);
    try {
      const response = await axios.put(
        `${API_URL}workout/setdefaultworkout`,
        userWorkoutID
      );
      console.log(response);
      localStorage.setItem(
        "defaultWorkout",
        JSON.stringify(response.data.workoutID)
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    defaultWorkout: "",
    loading: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createWorkout.fulfilled, (state, action) => {
      state.defaultWorkout = action.payload.workout;
    });
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
      state.defaultWorkout = action.payload.workout;
    });
  },
});
export default exerciseSlice.reducer;
