import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createWorkout } from "../../features/exerciseSlice";

export default function Workout() {
  const dispatch = useDispatch();

  const [workoutCreateBox, setWorkoutCreateBox] = useState(false);
  const [name, setName] = useState("");

  const handleCreateWorkoutClick = (e) => {
    e.preventDefault();
    setWorkoutCreateBox(!workoutCreateBox);
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };


  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
   const workoutForm = {
        "name": name
    }
    dispatch(createWorkout(workoutForm));
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
        </div>
      )}
    </div>
  );
}
