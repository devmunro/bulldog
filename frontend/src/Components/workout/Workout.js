import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createWorkout, findWorkout } from "../../features/exerciseSlice";

export default function Workout({ user }) {
  const dispatch = useDispatch();

  const [workoutCreateBox, setWorkoutCreateBox] = useState(false);
  const [name, setName] = useState("");


  //adds section in order to create a workout
  const handleCreateWorkoutClick = (e) => {
    e.preventDefault();
    setWorkoutCreateBox(!workoutCreateBox);
  };
  console.log(user.workouts)

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

    await dispatch(findWorkout(user.workouts))

  };
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
          {user.workouts > 0 && user.workouts.map(workout => {
  return workout;
})}

        </div>
      )}
    </div>
  );
}
