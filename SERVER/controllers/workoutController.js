import { Workout } from "../models/workoutSchema.js";
import { user } from "../models/userSchema.js";

export const createWorkout = async (req, res) => {
  const { userID, name } = req.body;

  try {
    const createUserWorkout = await Workout.create({
      userID,
      name,
    });

    //adds workout id to user who created it
    const userInfo = await user.findById(userID);

    userInfo.workouts.push(createUserWorkout._id);

    await userInfo.save();

    res.status(201).json({
      id: createUserWorkout._id,
      name: createUserWorkout.name,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const findworkouts = async (req, res) => {
  try {
    const { userID } = req.query;
    console.log("here", userID);
    const workouts = await Workout.find({ userID: userID });
    res.status(200).json(workouts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
