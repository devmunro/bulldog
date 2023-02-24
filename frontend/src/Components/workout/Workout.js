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

export default function Workout({ user }) {
  const dispatch = useDispatch();

  const [workoutCreateBox, setWorkoutCreateBox] = useState(false);
  const [name, setName] = useState("");
  const [showExerciseForWorkout, setShowExerciseForWorkout] = useState(false);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const { defaultWorkout, loading } = useSelector((state) => state.fitness);
  const [currentWorkout, setCurrentWorkout] = useState();

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
    setCurrentWorkout(defaultWorkoutResponse.payload);
  };

  useEffect(() => {
    if (defaultWorkout) {
      dispatch(findSingleWorkout(defaultWorkout)).then((response) => {
        setCurrentWorkout(response.payload);
      });
    }
  }, [defaultWorkout, dispatch]);

  //handleShowExercises - display exercises for current workout

  const handleShowExercises = (e) => {
    e.preventDefault();

    setShowExerciseForWorkout(!showExerciseForWorkout);
  };

  return (
    <div className="bg-[#2B2946] h-screen flex justify-center px-4 w-full">
      {loading === false && (
        <div className="w-full">
          <button
            onClick={handleCreateWorkoutClick}
            className="bg-white px-4 py-2 my-2 rounded-md hover:bg-slate-300 "
          >
            Create Workout
          </button>
          {workoutCreateBox && (
            <div className="flex-col items-center flex bg-[#2B2946]">
              <h2 className="text-xl mt-4 font-bold text-white">
                Create a Workout
              </h2>
              <form
                className=" flex-col flex space-y-2 px-8 w-full h-full p-4 [&>*]:p-2 [&>*]:rounded-md [&>*]:border-2 [&>*]:border-gray-300"
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
          {currentWorkout && currentWorkout.exercises && (
            <div className="text-black p-4 bg-gradient-to-bl from-blue-700 via-blue-800 to-gray-900">
              <h2 className="font-bold">Current Workout</h2>

              {/* SHOW OR HIDE EXERCISES */}
              <div className="flex justify-between h-1/2 items-center gap-4 text-gray-400">
                
                <div className="mt-8 mx-8 space-y-4">
                <h2 className=" text-3xl font-semibold">{currentWorkout.name.toUpperCase()}</h2>

                <button className="items-baseline" onClick={handleShowExercises}>
                  {showExerciseForWorkout && (
                    <div className="flex">
                      <span>HIDE</span>
                      <ChevronDoubleUpIcon className="h-6 w-6 text-white-500 mx-2  hover:text-white" />
                    </div>
                  )}
                  {!showExerciseForWorkout && (
                    <div className="flex">
                      <span>SHOW MORE</span>
                      <ChevronDoubleDownIcon className="h-6 w-6 text-white-500 mx-2 hover:text-white" />
                    </div>
                  )}
                </button>
                </div>
                <div className="opacity-25">
                  <FirebaseStorage
                    imageBase="manworkingout.png"
      
                  />
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
                      <li className="">{workout.name}</li>
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
        </div>
      )}
      {loading === true && <Loading />}
    </div>
  );
}
