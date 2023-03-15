import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExerciseList from "../Exercise/ExerciseList";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/solid";
import FirebaseStorage from "../../images/firebaseStorage";
import Loading from "../Loading";
import { editExercise } from "../../features/exerciseSlice";

export default function CurrentWorkout() {
  const [showExerciseForWorkout, setShowExerciseForWorkout] = useState(false);
  const { defaultWorkout, loading, currentWorkout } = useSelector(
    (state) => state.fitness
  );
  const [disabled, setDisabled] = useState(true);
  const [exerciseInputs, setExerciseInputs] = useState({});
  const [swapButton, setSwapButton] = useState(true);
  const dispatch = useDispatch();

  //handle edit exercise for current workout
  const handleEditExercise = async (id) => {
    setDisabled(false);
    setSwapButton(false);
  };

  //handleShowExercises - display exercises for current workout

  const handleShowExercises = (e) => {
    e.preventDefault();

    setShowExerciseForWorkout(!showExerciseForWorkout);
  };

  //handle Save exercise for current workout
  const handleSaveExercise = async () => {
    const currentID = currentWorkout._id;
    const editedDetails = {
      currentID,
      exerciseInputs,
    };

    const response = await dispatch(editExercise(editedDetails));

    if (response) {
      setDisabled(true);
    }
    setSwapButton(true);
  };

  //handlechange for inputs
  const handleChange = async (id, e) => {
    const { name, value } = e.target;
    setExerciseInputs((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: value,
      },
    }));
  };

  return (
    <div className="w-full text-black bg-gradient-to-bl from-blue-700 via-blue-800 to-gray-900">
      {/* SHOW OR HIDE EXERCISES */}
      <div className="flex justify-between h-1/2 items-center gap-4 text-gray-400">
        <div className="mt-8 mx-8 space-y-4">
          <h2 className="font-bold">Current Workout</h2>
          <h2 className=" text-3xl font-semibold">
            {currentWorkout.name.toUpperCase()}
          </h2>
          <div className="flex">
            <button
              className="items-baseline btn-secondary"
              onClick={handleShowExercises}
            >
              {showExerciseForWorkout && (
                <div className="flex">
                  <span>HIDE</span>
                  <ChevronDoubleUpIcon className="h-6 w-6 text-white-500 mx-2" />
                </div>
              )}
              {!showExerciseForWorkout && (
                <div className="flex">
                  <span>SHOW</span>
                  <ChevronDoubleDownIcon className="h-6 w-6 text-white-500 ml-2" />
                </div>
              )}
            </button>
            {/* EDIT BUTTON */}
            {showExerciseForWorkout && swapButton && (
              <button
                className="btn-primary mx-8 py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600  text-white"
                onClick={handleEditExercise}
              >
                Edit
              </button>
            )}
            {/* Save BUTTON */}
            {showExerciseForWorkout && !swapButton && (
              <button
                className="btn-primary mx-8 py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600  text-white"
                onClick={handleSaveExercise}
              >
                Save
              </button>
            )}
          </div>
        </div>
        <div className="opacity-25">
          <FirebaseStorage imageBase="manworkingout.png" />
        </div>
      </div>
      {showExerciseForWorkout && (
        <ExerciseList
          exerciseList={currentWorkout.exercises}
          loading={loading}
          buttonText="Edit"
          disabled={disabled}
          exerciseInputs={exerciseInputs}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}
