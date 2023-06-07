import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createWorkout } from "../../features/exerciseSlice";
import { getUserDetails } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

function CreateWorkout({
  user,
  findUserWorkouts,
  setWorkoutCreateBox,
  workoutCreateBox,
}) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const handleRadioChange = (e) => {
    setGoal(e.target.value);
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const workoutForm = {
      userID: user._id,
      name: name,
      goal: goal,
    };

    console.log("workoutForm before dispatch:", workoutForm); 


    await dispatch(createWorkout(workoutForm));
    await dispatch(getUserDetails()); // Fetch the updated user details after setting the default workout

    setWorkoutCreateBox(false);
    navigate("/dashboard/exerciselist");
  };

  return (
    <div className="mt-4 mb-2">
      <button onClick={handleCreateWorkoutClick} className="btn-primary-longer w-48">
        Create Workout
      </button>
      {workoutCreateBox && (
        <div className="fixed inset-0 flex items-center justify-center z-10 ">
          <div className="bg-primary text-secondary p-6 rounded-md shadow-lg relative">
            <div className="absolute top-0 right-0 p-2">
              <XMarkIcon
                width="24"
                height="24"
                onClick={handleCreateWorkoutClick}
                className="text-white cursor-pointer"
              />
            </div>
            <h2 className="sub-heading text-center m-4 text-white">
              Create a Workout
            </h2>
            <form
              className="flex flex-col space-y-8 px-4 w-full h-full py-4 text-white defaultFont"
              onSubmit={handleSubmit}
            >
              <input
                name="name"
                id="name"
                placeholder="Type Workout Name"
                onChange={handleInputChange}
                required
                className="p-2 rounded-md border-2 border-gray-300 text-tertiary"
              />

              <div className="flex items-center space-x-4">
                <h2 className="font-bold">Type of workout</h2>
                <label htmlFor="muscle-building" className="">
                  <input
                    type="radio"
                    name="goal"
                    id="muscle-building"
                    value="muscle_building"
                    onChange={handleRadioChange}
                    required
                    className="mr-1"
                  />
                  Muscle Building
                </label>
                <label htmlFor="fat-loss" className="">
                  <input
                    type="radio"
                    name="goal"
                    id="fat-loss"
                    value="fat_loss"
                    onChange={handleRadioChange}
                    required
                    className="mr-1"
                  />
                  Fat Loss
                </label>
              </div>
              <button onClick={handleSubmit} className="btn-secondary w-full">
                Add Some Exercises
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default CreateWorkout;
