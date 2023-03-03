import express from "express";
import { workoutCompleted } from "../controllers/workoutStatsController.js";


export const WorkoutStatsRouter = () => {
  const workoutStatsRouter = express();
  // full route example /api/workoutStats/completeworkout
  workoutRouter.post("/completeworkout", workoutCompleted); //


  return workoutStatsRouter;
};
