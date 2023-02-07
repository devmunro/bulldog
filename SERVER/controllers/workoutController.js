import { Workout } from "../models/workoutSchema.js";

export const createWorkout = async (req, res) => {
  const { userID, name } = req.body;
  console.log(req.body)
console.log(userID)
  try {
    const createUserWorkout = await Workout.create({
      userID,
      name,
    });
    res.status(201).json({
      userID: createUserWorkout.userID,
      name: createUserWorkout.name,
    });
  } catch (error) {
    res.status(400).json({ error: "workout not created" });
  }
};
