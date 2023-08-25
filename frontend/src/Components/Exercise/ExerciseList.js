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
        <div className="  lg:p-4 p-2 lg:my-4 lg:rounded-xl defaultFont h-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
          {exerciseList &&
            exerciseList.length > 0 &&
            exerciseList.map((exercise) => {
              return (
                <div
                  key={exercise._id}
                  className=" w-full bg-primary text-tertiary flex justify-center items-center text-center rounded-3xl shadow-xl"
                >
                  {/* EXERCISE NAME */}
                  <div className="">
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
                      <div className="absolute bottom-0 left-0 flex w-full text-white"> 
                      <h3 className=" bg-secondary text-black p-2 flex items-center">
                        {exercise.name}
                      </h3>

                      {/* SET REPS AND WEIGHTS SECTION */}
                    {currentPage === "/dashboard/workout" && (
                      <div className="flex w-full justify-center items-center   bg-primary  ">
                        <div className=" p-4">
                          Sets
                          <input
                            placeholder={exercise.sets || 3}
                            value={
                              exerciseInputs[exercise._id]?.sets ??
                              exercise.sets ??
                              3
                            }
                            name="sets"
                            className="w-8 p-1 m-2 text-center text-tertiary rounded-full"
                            onChange={(e) => handleChange(exercise._id, e)}
                            disabled={disabled}
                          ></input>
                        </div>

                        <div className="p-4">
                          Rep
                          <input
                            placeholder="8"
                            value={
                              exerciseInputs[exercise._id]?.reps ??
                              exercise.reps ??
                              12
                            }
                            name="reps"
                            className="w-8 p-1 m-2 text-center text-tertiary rounded-full"
                            onChange={(e) => handleChange(exercise._id, e)}
                            disabled={disabled}
                          ></input>
                        </div>

                        <div className="p-4">
                          Weight
                          <input
                            placeholder="10"
                            value={
                              exerciseInputs[exercise._id]?.weight ??
                              exercise.weight ??
                              10
                            }
                            name="weight"
                            className="w-8 p-1 m-2 text-center text-tertiary rounded-full"
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
                     
                    )}
                    </div>
                    </div>
                    

                    {currentPage === "/dashboard/exerciselist" && (
                      <div className="flex justify-center space-x-4 py-4 text-black paragraph ">
                        <p className="p-2 rounded-lg bg-secondary">
                          {exercise.body_type}
                        </p>{" "}
                        <p className="p-2 rounded-lg  bg-secondary">
                          {exercise.equipment}
                        </p>
                        {/* ADD TO WORKOUT BUTTON */}
                        {currentPage === "/dashboard/exerciselist" && (
                          <button
                            className=" btn-secondary"
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
