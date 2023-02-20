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
  const { defaultWorkout, loading } = useSelector((state) => state.fitness);
  console.log(userWorkouts);
  console.log(localStorage.getItem("defaultWorkout"));
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
    const response = await dispatch(findWorkout(user._id)); // Pass workout IDs as an array
    setUserWorkouts(response.payload);
    console.log(response.payload);
    const defaultWorkoutResponse = await dispatch(
      findSingleWorkout(defaultWorkout)
    );
    setCurrentWorkout(defaultWorkoutResponse.payload);
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
    const defaultWorkoutResponse = await dispatch(findSingleWorkout(workoutID));
    setCurrentWorkout(defaultWorkoutResponse.payload);
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
              currentWorkout &&
              userWorkouts.map((workout) => {
                if (workout._id !== currentWorkout._id) {
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
