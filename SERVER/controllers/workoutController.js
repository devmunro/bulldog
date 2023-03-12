import { Workout } from "../models/workoutSchema.js";
import { user } from "../models/userSchema.js";
import { Exercise } from "../models/exerciseSchema.js";

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
    userInfo.defaultWorkout = createUserWorkout._id;

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

// get default workout

export const findSingleWorkout = async (req, res) => {
  try {
    const { workoutID } = req.query;
    console.log(workoutID);
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
  const selectedFullWorkout = await Workout.findById(selectedWorkout);

  const selectedExercise = await Exercise.findById(exerciseID);
  console.log(selectedExercise);
  selectedFullWorkout.exercises.push({
    exercise: exerciseID,
    name: selectedExercise.name,
    body_type: selectedExercise.body_type,
    equipment: selectedExercise.equipment,
    sets: exerciseSets,
    reps: exerciseReps,
    weight: exerciseWeight,
  });

  await selectedFullWorkout.save();

  res
    .status(200)
    .send(`${selectedExercise.name} added to ${selectedFullWorkout.name}`);
};

//###SET A WORKOUT TO DEFAULT###
export const setDefaultWorkout = async (req, res) => {
  const { userID, workoutID } = req.body;

  const matchedUser = await user.findById(userID);

  matchedUser.defaultWorkout = workoutID;

  await matchedUser.save();

  res.status(200).json({ workoutID });
};


//###DELETE EXERCISE FROM WORKOUT
export const deleteExercise = async (req, res) => {
  const selectedExercise = req.body;

  try {
    const matchedWorkout = await Workout.findById(selectedExercise.workoutID);

    const updatedExercises = matchedWorkout.exercises.filter(
      (exercise) => exercise._id.toString() !== selectedExercise.exerciseID
    );

    await Workout.updateOne(
      { _id: selectedExercise.workoutID },
      { exercises: updatedExercises }
    );
    const updatedWorkout = await Workout.findById(selectedExercise.workoutID);

    res.status(200).json({
      message: "Exercise deleted successfully.",
      updatedWorkout: updatedWorkout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


//### EDIT EXERCISES IN CURRENT WORKOUT
export const editExercise = async (req, res) => {
  const { id, exerciseDetails } = req.body;

  try {
    const matchedWorkout = await Workout.findById(id);

    const updatedExercises = matchedWorkout.exercises.map((exercise) => {
      const matchedExercise = exerciseDetails[exercise._id.toString()];
      return matchedExercise ? { ...exercise, ...matchedExercise } : exercise;
    });
console.log(updatedExercises)
    matchedWorkout.exercises = updatedExercises;
    const updatedWorkout = await matchedWorkout.save();

    res.status(200).json({ updatedWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
