import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//API LINK // main url
const API_URL = process.env.REACT_APP_API_BASE_URL;

// fetch Exercises3
export const fetchExercise = createAsyncThunk(
  "fitness/fetchExercise",

  async (category) => {
    try {
      const response = await axios.get(`${API_URL}exercises?type=${category}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllExercises = createAsyncThunk(
  "fitness/getAllExercises",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/exercises/getallexercises`);
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
      localStorage.setItem("currentWorkout", JSON.stringify(response.data));
      return response.data;
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
    console.log("here",exercise)
    try {
      const response = await axios.put(
        `${API_URL}workout/addexercise`,
        exercise
      );
      return { message: response.data };
    } catch (error) {}
  }
);

//find dfault workout
export const findSingleWorkout = createAsyncThunk(
  "fitness/findSingleWorkout",
  async (workoutID) => {
    console.log("text", workoutID);
    try {
      const response = await axios.get(`${API_URL}workout/findsingleworkout`, {
        params: { workoutID },
      });
      console.log("the response", response);
      localStorage.setItem("currentWorkout", JSON.stringify(response.data));
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
  
      return { defaultWorkout: response.data.workoutID };
    } catch (error) {
      console.log(error);
    }
  }
);

export const completeWorkout = createAsyncThunk(
  "fitness/completeWorkout",
  async (workoutData) => {
    console.log("COMPLETE WORKOUT:", workoutData);
    try {
      const response = await axios.post(
        `${API_URL}workoutStats/completeworkout`,
        workoutData
      );

      return {
        message: "WORKOUT COMPLETED",
        exerciseComplete: workoutData.length,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserWorkoutStats = createAsyncThunk(
  "fitness/getUserWorkoutStats",
  async (userID) => {
    console.log("user", userID);

    try {
      const response = await axios.get(`${API_URL}workoutStats/getuserstats`, {
        params: { userID: userID },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteExercise = createAsyncThunk(
  "fitness/deleteExercise",
  async (selectedExercise) => {
    console.log("del", selectedExercise);

    try {
      const response = await axios.delete(`${API_URL}workout/deleteexercise`, {
        data: selectedExercise,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editExercise = createAsyncThunk(
  "fitness/editExercise",
  async (details) => {
    console.log("edit", details);

    try {
      const response = await axios.put(`${API_URL}workout/editexercise`, {
        id: details.currentID,
        exerciseDetails: details.exerciseInputs,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const exerciseSlice = createSlice({
  name: "fitness",
  initialState: {
    currentWorkout: null,
    loading: false,
    alert: null,
    completeExercises: [],
  },

  reducers: {
    resetAlert: (state) => {
      state.alert = null;
    },
    resetWorkout: (state) => {
      state.currentWorkout = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createWorkout.fulfilled, (state, action) => {
      state.currentWorkout = action.payload.workout;
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
      state.currentWorkout = action.payload;
    });
     builder.addCase(addExercise.fulfilled, (state, action) => {
      state.alert = action.payload.message;
    });
    builder.addCase(deleteExercise.fulfilled, (state, action) => {
      state.currentWorkout = action.payload.updatedWorkout;
    });
    builder.addCase(editExercise.fulfilled, (state, action) => {
      state.currentWorkout = action.payload.updatedWorkout;
    });
  
  },
});

export const { resetAlert, resetWorkout } = exerciseSlice.actions;

export default exerciseSlice.reducer;
