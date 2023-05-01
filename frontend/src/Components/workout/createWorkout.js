import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createWorkout } from "../../features/exerciseSlice";
import { getUserDetails } from "../../features/userSlice";

function CreateWorkout({user, findUserWorkouts }) {
    const [workoutCreateBox, setWorkoutCreateBox] = useState(false);
    const [name, setName] = useState("");
    const dispatch = useDispatch();
   

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
    await dispatch(getUserDetails()); // Fetch the updated user details after setting the default workout
  };



  return (
    <div>
      <button
        onClick={handleCreateWorkoutClick}
        className="btn-primary-longer"
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
  );
}

export default CreateWorkout;
