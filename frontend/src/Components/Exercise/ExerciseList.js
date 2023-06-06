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
  const [currentPage, setCurrentPage] = useState("");

  // set the current page in the useEffect hook
  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  const dispatch = useDispatch();
  //handle add to workout
  const handleAddToWorkout = async (id, name, bodyType, equipment, img) => {
    const newExerciseDetails = {
      exerciseID: id,
      exerciseBodyType: bodyType,
      exerciseEquipment: equipment,
      exerciseImage: img,
      exerciseSets: 3,
      exerciseReps: 8,
      exerciseWeight: 10,
      selectedWorkout: currentWorkout._id,
    };
    console.log("exercise details:",newExerciseDetails)

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
    <>
      {!loading && (
        <div className=" bg-primary lg:p-4 p-2 lg:my-4 lg:rounded-xl defaultFont h-full grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
          {exerciseList &&
            exerciseList.length > 0 &&
            exerciseList.map((exercise) => {
              return (
                <div
                  key={exercise._id}
                  className=" w-full bg-secondary text-tertiary flex justify-center items-center text-center rounded-3xl shadow-xl"
                >
                  {/* EXERCISE NAME */}
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        className="rounded-t-xl"
                        src={
                          exercise.img
                          ? exercise.img
                          : "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"
                        }
                        alt={exercise.name}
                      />
                      <h3 className="absolute bottom-0 left-0 bg-secondary bg-opacity-50 p-2 rounded-t-xl">
                        {exercise.name}
                      </h3>
                    </div>
                    {/* SET REPS AND WEIGHTS SECTION */}
                    {currentPage === "/dashboard/workout" && (
                      <div className="flex justify-center p-2 w-full text-white font-semibold">
                      <div className="flex w-full justify-center items-center space-x-4 bg-primary rounded-xl ">
                        <div className="lg:p-4 p-2">
                          Sets
                          <input
                            placeholder={exercise.sets || 3}
                            value={
                              exerciseInputs[exercise._id]?.sets ??
                              exercise.sets ??
                              3
                            }
                            name="sets"
                            className="w-8 p-2 m-2 text-center text-tertiary rounded-full"
                            onChange={(e) => handleChange(exercise._id, e)}
                            disabled={disabled}
                          ></input>
                        </div>

                        <div className="lg:p-4 p-2">
                          Rep
                          <input
                            placeholder="8"
                            value={
                              exerciseInputs[exercise._id]?.reps ??
                              exercise.reps ??
                              12
                            }
                            name="reps"
                            className="w-8 p-2 m-2 text-center text-tertiary rounded-full"
                            onChange={(e) => handleChange(exercise._id, e)}
                            disabled={disabled}
                          ></input>
                        </div>

                        <div className="lg:p-4 p-2">
                          Weight
                          <input
                            placeholder="10"
                            value={
                              exerciseInputs[exercise._id]?.weight ??
                              exercise.weight ??
                              10
                            }
                            name="weight"
                            className="w-8 p-2 m-2 text-center text-tertiary rounded-full"
                            onChange={(e) => handleChange(exercise._id, e)}
                            disabled={disabled}
                          ></input>
                        </div>

                        <div className="lg:p-4 my-2 self-center mx-4  ">
                          {!disabled && (
                            <button
                              className=" py-2 px-2 rounded-md bg-red-900 hover:bg-red-400  text-white"
                              onClick={() =>
                                deleteExerciseFromWorkout(exercise._id)
                              }
                            >
                              <TrashIcon className="w-4 h-4 md:w-8 md:h-8" />
                            </button>
                          )}
                        </div>
                      </div>
                      </div>
                    )}

                    {currentPage === "/dashboard/exerciselist" && (
                      <div className="flex justify-center space-x-4 py-4 text-white paragraph ">
                        <p className="p-2 rounded-lg bg-tertiary">
                          {exercise.body_type}
                        </p>{" "}
                        <p className="p-2 rounded-lg bg-tertiary">
                          {exercise.equipment}
                        </p>
                        {/* ADD TO WORKOUT BUTTON */}
                        {currentPage === "/dashboard/exerciselist" && (
                          <button
                            className=" btn-primary"
                            onClick={() =>
                              handleAddToWorkout(
                                exercise._id,
                                exercise.name,
                                exercise.body_type,
                                exercise.equipment,
                                exercise.img
                              )
                            }
                          >
                            Add
                          </button>
                        )}
                      </div>
                    )}
                  </div>
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
        </div>
      )}
      {loading && <Loading hScreen={"h-screen"} textColor={"text-tertiary"} />}
    </>
  );
}
