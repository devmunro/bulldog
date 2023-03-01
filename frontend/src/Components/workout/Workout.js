import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkout,
  findSingleWorkout,
  findWorkout,
  setDefaultWorkout,
} from "../../features/exerciseSlice";
import ExerciseList from "../ExerciseList";
import Loading from "../Loading";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/solid";
import FirebaseStorage from "../../images/firebaseStorage";
import WorkoutPage from "../workoutPage";

export default function Workout({ user }) {
  const dispatch = useDispatch();

  const [workoutCreateBox, setWorkoutCreateBox] = useState(false);
  const [name, setName] = useState("");
  const [showExerciseForWorkout, setShowExerciseForWorkout] = useState(false);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const { defaultWorkout, loading, currentWorkout } = useSelector((state) => state.fitness);
 
  console.log(currentWorkout)
  console.log(defaultWorkout)
  //### WORKOUT CREATION ###
  //adds section in order to create a workout
  const handleCreateWorkoutClick = (e) => {
    e.preventDefault();
    setWorkoutCreateBox(!workoutCreateBox);
  };

  //to be able to write workout name
  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const workoutForm = {
      userID: user._id,
      name: name,
    };

    await dispatch(createWorkout(workoutForm));

    findUserWorkouts();
  };

  //### FIND ALL USER WORKOUTS
  async function findUserWorkouts() {
    if (user.workouts <= 0) {
      console.log("none");
      return;
    }
    console.log(user.workouts);
    const response = await dispatch(findWorkout(user._id)); // Pass workout IDs as an array
    setUserWorkouts(response.payload);
  }

  useEffect(() => {
    findUserWorkouts();
  }, []);

  //### SET CURRENT WORKOUT
  const handleSetDefault = async (e) => {
    e.preventDefault(e);

    const workoutID = e.target.value;
    const userDetails = {
      userID: user._id,
      workoutID: workoutID,
    };

    await dispatch(setDefaultWorkout(userDetails));
    if (defaultWorkout === undefined) {
      console.log("no default workout yet");
      return;
    }
    const defaultWorkoutResponse = await dispatch(findSingleWorkout(workoutID));
    console.log(defaultWorkoutResponse)
   
  };

  useEffect(() => {
    if (defaultWorkout) {
      console.log("hi", defaultWorkout)
      const getCurrentWorkout = async () => {
        const response = await dispatch(findSingleWorkout(defaultWorkout))
        console.log(response)
      }
      getCurrentWorkout();
      console.log("hello")
    }
  }, [defaultWorkout, dispatch]);

  //handleShowExercises - display exercises for current workout

  const handleShowExercises = (e) => {
    e.preventDefault();

    setShowExerciseForWorkout(!showExerciseForWorkout);
  };

  const handleStartWorkoutClick = (workout) => {
    console.log(workout);
    return <WorkoutPage workout={workout} />;
  };

  return (
   <div className="bg-[#2B2946] md:m-2 justify-center flex-col">
  {loading === false && (
    <div className="w-full">
      <div>  
          <button
            onClick={handleCreateWorkoutClick}
            className="bg-white px-1 py-2 my-2 rounded-md hover:bg-slate-300 "
          >
            Create Workout
          </button>
          {workoutCreateBox && (
            <div className="flex-col items-center flex bg-[#2B2946]">
              <h2 className="text-xl mt-4 font-bold text-white">
                Create a Workout
              </h2>
              <form
                className=" flex-col flex space-y-2 px-4 w-full h-full p-4 [&>*]:p-2 [&>*]:rounded-md [&>*]:border-2 [&>*]:border-gray-300"
                onSubmit={handleSubmit}
              >
                <input
                  name="name"
                  id="name"
                  placeholder="Type Workout Name"
                  onChange={handleInputChange}
                  required
                />
                <button>Submit</button>
              </form>
            </div>
            
          )}
          </div>
          {currentWorkout && currentWorkout.exercises && (
            <div className="text-black bg-gradient-to-bl from-blue-700 via-blue-800 to-gray-900">
              {/* SHOW OR HIDE EXERCISES */}
              <div className="flex justify-between h-1/2 items-center gap-4 text-gray-400">
                <div className="mt-8 mx-8 space-y-4">
                  <h2 className="font-bold">Current Workout</h2>
                  <h2 className=" text-3xl font-semibold">
                    {currentWorkout.name.toUpperCase()}
                  </h2>

                  <button
                    className="items-baseline btn-secondary"
                    onClick={handleShowExercises}
                  >
                    {showExerciseForWorkout && (
                      <div className="flex">
                        <span>HIDE</span>
                        <ChevronDoubleUpIcon className="h-6 w-6 text-white-500 mx-2" />
                      </div>
                    )}
                    {!showExerciseForWorkout && (
                      <div className="flex">
                        <span>SHOW</span>
                        <ChevronDoubleDownIcon className="h-6 w-6 text-white-500 ml-2" />
                      </div>
                    )}
                  </button>
                </div>
                <div className="opacity-25">
                  <FirebaseStorage imageBase="manworkingout.png" />
                </div>
              </div>

              {showExerciseForWorkout && (
                <ExerciseList
                  exerciseList={currentWorkout.exercises}
                  loading={loading}
                  buttonText="Edit"
                  isDisabled
                />
              )}
            </div>
          )}
          {!currentWorkout && <div>No current workout</div>}
          <div className="text-gray-500 p-4">
            <h2 className="font-bold">Other Workouts</h2>
            {userWorkouts &&
              currentWorkout &&
              userWorkouts.map((workout) => {
                if (workout._id !== currentWorkout._id) {
                  // Check if workout has the same ID as default workout

                  return (
                    <ul className="flex m-4 p-8 justify-between bg-gradient-to-l from-gray-700 via-gray-900 to-black">
                      <li className="">{workout.name.toUpperCase()}</li>
                      <button
                        className="btn-primary"
                        onClick={handleSetDefault}
                        value={workout._id}
                      >
                        Set as Default
                      </button>
                    </ul>
                  );
                }
              })}
          </div>

          {/* <WorkoutPage workout={currentWorkout} /> */}
        </div>
      )}

      {loading === true && <Loading />}
    </div>
  );
}
