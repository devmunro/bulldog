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
            className="flex w-full p-8 justify-between bg-gradient-to-l from-gray-700 via-gray-900 to-black"
          >
            <li className="w-1/2">{workout.name.toUpperCase()}</li>
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
      return null;
    });

  // Render the workout component

  return (
    <>
      <CreateWorkout
        user={user}
        findUserWorkouts={() => dispatch(findWorkout(user._id))}
      />
      <div className="flex w-full">
        {!loading && (
          <div className="w-1/2">
            {currentWorkout ? (
              <CurrentWorkout currentWorkout={currentWorkout} />
            ) : (
              <div>No current workout</div>
            )}
          </div>
        )}
        <div className="text-gray-500 my-8 ">
          <h2 className="font-bold">Other Workouts</h2>
          {userWorkouts.length > 0 && renderOtherWorkouts()}
        </div>
        {loading && <Loading />}
      </div>
    </>
  );
}
