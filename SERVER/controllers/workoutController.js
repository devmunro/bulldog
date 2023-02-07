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
    console.log("first")
    userInfo.workouts.push(createUserWorkout._id);
    console.log("second")
    console.log("secondBBB")
    await userInfo.save();
    console.log("third")

    res.status(201).json({
      userID: createUserWorkout.userID,
      name: createUserWorkout.name,
    });
  } catch (error) {
    res.status(400).json({error });
  }
};
