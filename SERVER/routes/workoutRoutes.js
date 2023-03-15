import express from "express";
import {
  createWorkout,
  findworkouts,
  addExercise,
  findSingleWorkout,
  setDefaultWorkout,
  deleteExercise,
  editExercise,
} from "../controllers/workoutController.js";

export const WorkoutRouter = () => {
  const workoutRouter = express();
  // full route example /api/workout/createworkout
  workoutRouter.post("/createworkout", createWorkout); //
  workoutRouter.get("/findworkouts", findworkouts); //
  workoutRouter.get("/findsingleworkout", findSingleWorkout); //
  workoutRouter.put("/addexercise", addExercise); //
  workoutRouter.put("/setdefaultworkout", setDefaultWorkout); //
  workoutRouter.delete("/deleteexercise", deleteExercise); //
  workoutRouter.put("/editexercise", editExercise); //



  return workoutRouter;
};
