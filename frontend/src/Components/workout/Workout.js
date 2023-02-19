import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkout,
  findSingleWorkout,
  findWorkout,
  setDefaultWorkout,
} from "../../features/exerciseSlice";
import Loading from "../Loading";

export default function Workout({ user }) {
  const dispatch = useDispatch();

  const [workoutCreateBox, setWorkoutCreateBox] = useState(false);
  const [name, setName] = useState("");
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState();

  const { defaultWorkout, loading } = useSelector((state) => state.fitness);

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
  const findUserWorkouts = useCallback(async () => {
    const response = await dispatch(findWorkout(user._id)); // Pass workout IDs as an array
    setUserWorkouts(response.payload);
  }, [dispatch, user]);

  useEffect(() => {
    findUserWorkouts();
  }, [findUserWorkouts]);

  //### FIND CURRENT WORKOUT
  useEffect(() => {
    const getCurrentWorkout = async () => {
      const getWorkout = await dispatch(findSingleWorkout(defaultWorkout));
      console.log(getWorkout.payload);
      setCurrentWorkout(getWorkout.payload);
    };

    getCurrentWorkout();
  }, [defaultWorkout, dispatch]);

  // set current workout
  const handleSetDefault = (e) => {
    e.preventDefault(e);

    const userDetails = {
      userID: user._id,
      workoutID: e.target.value,
    };
    console.log(userDetails);
    setUserCurrentWorkout(userDetails);
  };

  const setUserCurrentWorkout = async (userDetails) => {
    dispatch(setDefaultWorkout(userDetails));
  };

  return (
    <div>
      {loading === false && (
        <div className="bg-white">
          <button
            onClick={handleCreateWorkoutClick}
            className="border-2 border-gray-400 px-2 m-2"
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
          {currentWorkout && (
            <div className="text-black p-4">
              <h2 className="font-bold">Current Workout</h2>
              <h2>{currentWorkout.name}</h2>
              <h2>{currentWorkout._id}</h2>

              {currentWorkout.exercises.map((exercise) => {
                return (
                  <ul key={exercise._id} className="flex">
                    <li className="text-gray-500 p-4">{exercise._id}</li>
                    <li className="text-gray-500 p-4">{exercise.sets}sets</li>
                    <li className="text-gray-500 p-4">{exercise.reps}reps</li>
                    <li className="text-gray-500 p-4">{exercise.weight}kg</li>
                  </ul>
                );
              })}
            </div>
          )}
          <div className="text-gray-500 p-4">
            <h2 className="font-bold">Other Workouts</h2>
            {userWorkouts &&
              userWorkouts.map((workout) => {
                if (workout._id !== defaultWorkout) {
                  // Check if workout has the same ID as default workout

                  return (
                    <ul className="flex m-4">
                      <li className="">{workout.name}</li>
                      <button
                        className="px-2 border-2 border-blue-800"
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
