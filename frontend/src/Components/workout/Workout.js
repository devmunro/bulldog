import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findSingleWorkout,
  findWorkout,
  setDefaultWorkout,
} from "../../features/exerciseSlice";
import Loading from "../Loading";
import WorkoutPage from "../workoutPage";
import CreateWorkout from "./createWorkout";
import CurrentWorkout from "./currentWorkout";

export default function Workout({ user }) {
  const dispatch = useDispatch();

  const [userWorkouts, setUserWorkouts] = useState([]);
  const { defaultWorkout, loading, currentWorkout } = useSelector(
    (state) => state.fitness
  );
 console.log(defaultWorkout, currentWorkout)
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
      };
  
  useEffect(() => {
    if (defaultWorkout) {
      console.log("hi", defaultWorkout);
      const getCurrentWorkout = async () => {
        const response = await dispatch(findSingleWorkout(defaultWorkout));
        console.log(response);
      };
      getCurrentWorkout();
      console.log("hello");
    }
  }, [defaultWorkout, dispatch]);


  const handleStartWorkoutClick = (workout) => {
    console.log(workout);
    return <WorkoutPage workout={workout} />;
  };

  return (
    <div className="bg-[#2B2946] md:m-2 justify-center flex-col">
      {loading === false && (
        <div className="w-full">
          {/* // create workout */}
          <CreateWorkout user={user} findUserWorkouts={findUserWorkouts} />
          {/* //currentWORKOUT */}
          {currentWorkout && <CurrentWorkout currentWorkout={currentWorkout} />}
          {!currentWorkout && <div>No current workout</div>}

          {/* OTHER WORKOUTs */}
          <div className="text-gray-500 my-8 ">
            <h2 className="font-bold">Other Workouts</h2>
            {userWorkouts.length > 0 &&
              userWorkouts.map((workout) => {
                if (workout?._id !== currentWorkout?._id) {
                  // Check if workout has the same ID as default workout

                  return (
                    <ul className="flex w-full p-8 justify-between bg-gradient-to-l from-gray-700 via-gray-900 to-black">
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
              })}
          </div>
        </div>
      )}

      {loading === true && <Loading />}
    </div>
  );
}
