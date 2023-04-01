import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading";
import { addExercise, deleteExercise } from "../../features/exerciseSlice";
import { resetAlert } from "../../features/exerciseSlice";
import { TrashIcon } from "@heroicons/react/24/solid";
import { current } from "@reduxjs/toolkit";

export default function ExerciseList({
  exerciseInputs,
  handleChange,
  loading,
  exerciseList,
  disabled,
}) {
  const { alert } = useSelector((state) => state.fitness);
  const { currentWorkout } = useSelector((state) => state.fitness);
  const [showAlert, setShowAlert] = useState(false);
console.log("currentworkout here",currentWorkout)
  const [currentPage, setCurrentPage] = useState("");

  // set the current page in the useEffect hook
  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  const dispatch = useDispatch();
  //handle add to workout
  const handleAddToWorkout = async (id, name, bodyType, equipment) => {
    const newExerciseDetails = {
      exerciseID: id,
      exerciseBodyType: bodyType,
      exerciseEquipment: equipment,
      exerciseSets: 3,
      exerciseReps: 8,
      exerciseWeight: 10,
      selectedWorkout: currentWorkout._id,
    };

    const response = await dispatch(addExercise(newExerciseDetails));
    console.log(response);
  };

  useEffect(() => {
    if (alert) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        dispatch(resetAlert());
      }, 3000); // hide after 3 seconds
    }
  }, [alert, dispatch]);

  const deleteExerciseFromWorkout = async (id) => {
    console.log(id);
    console.log(currentWorkout._id);
    const deleteOneExercise = {
      workoutID: currentWorkout._id,
      exerciseID: id,
    };

    const response = await dispatch(deleteExercise(deleteOneExercise));
  };

  return (
    <div className="md:mx-2">
      <p className=" text-gray-400 bg-red-900 uppercase text-sm text-center">
        Current Workout:<strong>{currentWorkout?.name}</strong>
      </p>
      {!loading &&
        exerciseList &&
        exerciseList.length > 0 &&
        exerciseList.map((exercise) => {
          return (
            <div
              key={exercise._id}
              className=" bg-black text-white md:my-4 my-2 md:py-4 flex items-center justify-center text-center "
            >
              {/* EXERCISE NAME */}
              <div className=" text-md  md:text-lg flex-col font-semibold text-left w-2/3">
                <h3>{exercise.name}</h3>
                {currentPage === "/dashboard/exerciselist" && (
                  <div className="uppercase flex text-gray-500 space-x-4 text-sm md:text-md">
                    <p className="p-2 rounded-lg">{exercise.body_type}</p>{" "}
                    <p className="p-2 rounded-lg">{exercise.equipment}</p>
                  </div>
                )}

                {/* SET REPS AND WEIGHTS SECTION */}
                {currentPage === "/dashboard/workout" && (
                  <div className="flex space-x-4 text-gray-400 text-center text-sm">
                    <div className="md:p-4 ">
                      Sets
                      <input
                        placeholder={exercise.sets || 3}
                        className={` ${disabled ? "input" : "input-edit"}`}
                        value={
                          exerciseInputs[exercise._id]?.sets ??
                          exercise.sets ??
                          3
                        }
                        name="sets"
                        onChange={(e) => handleChange(exercise._id, e)}
                        disabled={disabled}
                      ></input>
                    </div>

                    <div className="md:p-4">
                      Rep
                      <input
                        placeholder="8"
                        className={` ${disabled ? "input" : "input-edit"}`}
                        value={
                          exerciseInputs[exercise._id]?.reps ??
                          exercise.reps ??
                          12
                        }
                        name="reps"
                        onChange={(e) => handleChange(exercise._id, e)}
                        disabled={disabled}
                      ></input>
                    </div>

                    <div className="md:p-4">
                      Weight
                      <input
                        placeholder="10"
                        className={` ${disabled ? "input" : "input-edit"}`}
                        value={
                          exerciseInputs[exercise._id]?.weight ??
                          exercise.weight ??
                          10
                        }
                        name="weight"
                        onChange={(e) => handleChange(exercise._id, e)}
                        disabled={disabled}
                      ></input>
                    </div>
                  </div>
                )}
              </div>

              {/* ADD TO WORKOUT BUTTON */}
              {currentPage === "/dashboard/exerciselist" && (
                <div className="md:p-4 my-2">
                  <button
                    className=" py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white"
                    onClick={() =>
                      handleAddToWorkout(
                        exercise._id,
                        exercise.name,
                        exercise.body_type,
                        exercise.equipment
                      )
                    }
                  >
                    Add
                  </button>
                </div>
              )}

              {currentPage === "/dashboard/workout" && (
                <div className="md:p-4 my-2 self-end mx-4 ">
                  {!disabled && (
                    <button
                      className=" py-2 px-2 rounded-md bg-red-900 hover:bg-red-400  text-white"
                      onClick={() => deleteExerciseFromWorkout(exercise._id)}
                    >
                      <TrashIcon className="w-4 h-4 md:w-8 md:h-8" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      <div className="fixed top-10  right-10 left-10 z-50 text-center">
        {showAlert && alert && (
          <div className="p-4 bg-blue-500 text-white rounded-md transition duration-500 ease-in-out">
            {alert}
          </div>
        )}
      </div>

      {loading && <Loading />}
    </div>
  );
}
