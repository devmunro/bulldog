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

export const findSingleWorkout = async (req, res) => {
  try {
    const { workoutID } = req.query;

    const workouts = await Workout.findById(workoutID);
    res.status(200).json(workouts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const addExercise = async (req, res) => {
  const {
    exerciseID,
    exerciseSets,
    exerciseReps,
    exerciseWeight,
    selectedWorkout,
  } = req.body;

  console.log(selectedWorkout);
  const selectedFullWorkout = await Workout.findById(selectedWorkout);

  console.log(selectedFullWorkout);

  selectedFullWorkout.exercises.push({
    exercise: exerciseID,
    sets: exerciseSets,
    reps: exerciseReps,
    weight: exerciseWeight,
  });

  await selectedFullWorkout.save();

  res.status(200).send("Exercise added to workout");
};

//###SET A WORKOUT TO DEFAULT###
export const setDefaultWorkout = async (req, res) => {
  const { userID, workoutID } = req.body;

  const matchedUser = await user.findById(userID);

  matchedUser.defaultWorkout.push({
    defaultWorkout: workoutID,
  });

  await matchedUser.save();

  res.status(200).send("Current workout Selected");

};

//###GET CURRENT WORKOUT

export const getDefaultWorkout = (req, res) => {};
