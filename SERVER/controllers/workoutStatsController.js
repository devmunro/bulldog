import { Workout } from "../models/workoutSchema.js";
import { user } from "../models/userSchema.js"; 
import { Exercise } from "../models/exerciseSchema.js";
import { WorkoutStats } from "../models/workoutStatsSchema.js";

export const workoutCompleted = async (req, res) => {
  const workoutStat = req.body;

  const newWorkoutStat = new WorkoutStats(workoutStat);

  try {
    await newWorkoutStat.save();
    res.status(201).json(newWorkoutStat);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};