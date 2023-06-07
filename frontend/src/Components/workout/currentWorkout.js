import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExerciseList from "../Exercise/ExerciseList";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/solid";
import FirebaseStorage from "../../images/firebaseStorage";
import { editExercise } from "../../features/exerciseSlice";
import { Link } from "react-router-dom";

export default function CurrentWorkout() {
  const [showExerciseForWorkout, setShowExerciseForWorkout] = useState(false);
  const { loading, currentWorkout } = useSelector((state) => state.fitness);
  const [disabled, setDisabled] = useState(true);
  const [exerciseInputs, setExerciseInputs] = useState({});
  const [swapButton, setSwapButton] = useState(true);
  const dispatch = useDispatch();

  //## Handle editing an exercise for the current workout
  const handleEditExercise = async (id) => {
    setDisabled(false);
    setSwapButton(false);
  };

  //## Toggle exercises display for the current workout
  const handleShowExercises = (e) => {
    e.preventDefault();
    setShowExerciseForWorkout(!showExerciseForWorkout);
  };

  //## Save edited exercise for the current workout
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

  //## Handle changes for exercise input fields
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
    <div className="w-full bg-primary rounded-xl shadow-xl lg:p-4 lg:my-4 defaultFont">
      <div className="text-white bg-tertiary lg:m-4 rounded-xl ">
        <div class="flex flex-col md:flex-row md:justify-between justify-end md:items-end h-full space-y-4">
          <h2 className=" sub-heading items-end md:p-4 px-6">
            {currentWorkout.name.toUpperCase()}
          </h2>
          <div className="md:p-4 px-6 pb-4">
            <Link to="/dashboard/record" className="btn-secondary-longer">Start Workout</Link>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end p-2">
        {/* EDIT BUTTON */}
        <button className="btn-tertiary" onClick={handleEditExercise}>
          Edit
        </button>

        {/* Save BUTTON */}
        <button className="btn-tertiary" onClick={handleSaveExercise}>
          Save
        </button>
      </div>
      <ExerciseList
        exerciseList={currentWorkout.exercises}
        loading={loading}
        buttonText="Edit"
        disabled={disabled}
        exerciseInputs={exerciseInputs}
        handleChange={handleChange}
      />
    </div>
  );
}
