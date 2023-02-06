import Workout from "../../frontend/src/Components/workout/Workout";

export const createWorkout = async (req, res) => {
  const { name } = req.body;

  try {
    const createUserWorkout = await workouts.create({
      name,
    });
    res.status(201).json({
      name: createUserWorkout.name,
    });
  } catch (error) {
    res.status(400).json({ error: "workout not created" });
  }
};
