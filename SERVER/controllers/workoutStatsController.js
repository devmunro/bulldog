import { Workout } from "../models/workoutSchema.js";
import { user } from "../models/userSchema.js"; 
import { Exercise } from "../models/exerciseSchema.js";
import { WorkoutStats } from "../models/workoutStatsSchema.js";

export const workoutCompleted = async (req, res) => {
  const workoutStat = req.body;

  const newWorkoutStat = new WorkoutStats(workoutStat);
  const workoutID = workoutStat.workoutID
  try {
    await newWorkoutStat.save();
   
  // Update user collection with workout ID
  const userID = workoutStat.userID;
  const userMatched = await user.findById(userID);
  userMatched.workoutStats.push(workoutID);
  await userMatched.save();


    res.status(201).json(newWorkoutStat);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const getUserWorkoutStats = async (req, res) => {
  const userID = req.user.id;
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

  try {
    const workoutStats = await WorkoutStats.find({
      userID: userID,
      createdAt: { $gte: startDate, $lt: endDate },
    });

    res.status(200).json(workoutStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};