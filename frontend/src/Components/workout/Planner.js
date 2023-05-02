import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findSingleWorkout,
  findWorkout,
  setDefaultWorkout,
} from "../../features/exerciseSlice";
import Loading from "../Loading";
import CreateWorkout from "./createWorkout";
import CurrentWorkout from "./currentWorkout";
import { getUserDetails } from "../../features/userSlice";

export default function Workout({ user }) {
  const dispatch = useDispatch();

  // State for storing user workouts
  const [userWorkouts, setUserWorkouts] = useState([]);

  //  Get loading and currentWorkout states from Redux
  const { loading, currentWorkout } = useSelector((state) => state.fitness);

  const [workoutCreateBox, setWorkoutCreateBox] = useState(false);

  //### EFFECT for fetching user workouts and setting them to userWorkouts state
  useEffect(() => {
    if (user.workouts <= 0) return;

    dispatch(findWorkout(user._id)).then((response) => {
      setUserWorkouts(response.payload);
    });
  }, [dispatch, user]);

  
  

  //### EFFECT for fetching the current workout (default workout) and storing it in Redux state
  useEffect(() => {
    if (user.defaultWorkout) {
      dispatch(findSingleWorkout(user.defaultWorkout));
    }
  }, [user.defaultWorkout, dispatch]);

  //#### HANDLER for setting the current (default) workout
  const handleSetDefault = async (e) => {
    e.preventDefault(e);
    // Update the default workout in the backend and Redux state
    await dispatch(
      setDefaultWorkout({ userID: user._id, workoutID: e.target.value })
    );
    // Fetch the updated user details after setting the default workout
    await dispatch(getUserDetails());
  };

  //#### FUNCTION for rendering other workouts in the list
  const renderOtherWorkouts = () =>
    userWorkouts.map((workout) => {
      if (workout._id !== currentWorkout?._id) {
        return (
          <ul
            key={workout._id}
            className="text-white bg-tertiary my-4 rounded-xl h-36"
          >
            <li className="flex justify-between items-end h-full">
              <h2 className="text-2xl font-semibold items-end p-4">
                {workout.name.toUpperCase()}
              </h2>
              <div className="p-4">
                <button
                  className="btn-secondary-longer"
                  onClick={handleSetDefault}
                  value={workout._id}
                >
                  Set as Default
                </button>
              </div>
            </li>
          </ul>
        );
      }
      return null;
    });

  // Render the workout component

  return (
    <div className="relative">
      {workoutCreateBox && (<div className="w-full h-screen bg-black opacity-80 z-5 absolute"></div>)}
        <div className="w-full defaultFont">
          <div className="w-full">
            <h2 className=" pb-4 sub-heading ">Planner</h2>
          </div>
          <CreateWorkout
            user={user}
            findUserWorkouts={() => dispatch(findWorkout(user._id))}
            setWorkoutCreateBox={setWorkoutCreateBox}
            workoutCreateBox={workoutCreateBox}
          />
          {!loading && (
          <div className="lg:flex w-full gap-8">
            <div className="lg:w-1/2">
              {currentWorkout ? (
                <CurrentWorkout currentWorkout={currentWorkout} />
              ) : (
                <div>No current workout</div>
              )}
            </div>

            <div className="lg:w-1/2">
              {userWorkouts.length > 0 && renderOtherWorkouts()}
            </div>
          </div>
          )}
        </div>
      
      {loading && <Loading hScreen={"h-screen"} />}
    </div>
  );
}
