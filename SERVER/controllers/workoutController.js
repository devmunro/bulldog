import { Workout } from "../models/workoutSchema.js";


export const createWorkout = async (req, res) => {
  const { name } = req.body;
console.log(name)

  try {
    const createUserWorkout = await Workout.create({
      name: name,
    });
    res.status(201).json({
      name: createUserWorkout.name,
    });
  } catch (error) {
    res.status(400).json({ error: "workout not created" });
  }
};
