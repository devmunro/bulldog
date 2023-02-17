import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWorkout, findWorkout } from "../../features/exerciseSlice";

export default function Workout({ user }) {
  const dispatch = useDispatch();

  const [workoutCreateBox, setWorkoutCreateBox] = useState(false);
  const [name, setName] = useState("");
  const [userWorkouts, setUserWorkouts] = useState([]);

  const workoutList = useSelector(state => state.exercise);


console.log(workoutList)
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

  const findUserWorkouts = useCallback(async () => {
    const response = await dispatch(findWorkout(user._id)); // Pass workout IDs as an array
    setUserWorkouts(response.payload);
  }, [dispatch, user]);

  useEffect(() => {
    findUserWorkouts();
  }, [findUserWorkouts]);

  return (
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
      {userWorkouts &&
        userWorkouts.map((workout) => {
          return (
            <ul>
              {" "}
              <li className="text-gray-500 p-4">{workout.name}</li>
              <li className="text-gray-500 p-4">{workout._id}</li>;
            </ul>
          );
        })}
    </div>
  );
}
