import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";

export default function ExerciseList({
  loading,
  setExerciseDetails,
  exerciseList,
  buttonText,
  isDisabled,
}) {
  const [exerciseInputs, setExerciseInputs] = useState({});
  const defaultWorkout = useSelector((state) => state.fitness.defaultWorkout);
  const [disabled, setDisabled] = useState(isDisabled);

  //handle add to workout
  const handleAddToWorkout = async (id, name, bodyType, equipment) => {
    setExerciseDetails({
      exerciseID: id,
      exerciseBodyType: bodyType,
      exerciseEquipment: equipment,
      exerciseSets: exerciseInputs[id]?.sets ?? 3,
      exerciseReps: exerciseInputs[id]?.reps ?? 8,
      exerciseWeight: exerciseInputs[id]?.weight ?? 10,
      selectedWorkout: defaultWorkout,
    });
  };

  //handle edit exercise for current workout
  const handleEditExercise = async (id) => {
    setDisabled(false);
  };
  //handlechange for inputs
  const handleChange = (id) => (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setExerciseInputs((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: parseInt(value),
      },
    }));
  };

  return (
    <div className="md:mx-2">
      <div className="bg-white p-4 grid md:grid-cols-7 grid-cols-5 mt-2 items-center text-md md:text-lg text-center gap-4">
        <div className="font-bold  py-2 ">Name</div>
        <div className="font-bold hidden md:block  py-2 ">Type</div>
        <div className="font-bold hidden md:block  py-2 ">Equipment</div>
        <div className="font-bold  py-2 ">Sets</div>
        <div className="font-bold  py-2 ">Reps</div>
        <div className="font-bold  py-2 ">Weight</div>
        <div className="font-bold  py-2 ">{buttonText}</div>
      </div>
      {!loading &&
        exerciseList &&
        exerciseList.length > 0 &&
        exerciseList.map((exercise) => {
          return (
            <div
              key={exercise._id}
              className="bg-white even:bg-slate-300 border-b-2 border-dashed border-black text-xs md:text-sm items-center grid md:grid-cols-7 grid-cols-5 gap-4 text-center px-2 py-4"
            >
              {/* EXERCISE NAME */}
              <div className="col-span-1 md:p-4 my-2 font-semibold  text-left">
                {exercise.name}
              </div>

              {/* Exercise BODY TYPE */}
              <div className=" p-4 hidden md:block my-2 ">
                {exercise.body_type &&
                  exercise.body_type
                    .map((type) => type.toUpperCase())
                    .join(", ")}
              </div>

              {/* Exercise EQUIPMENT */}
              <div className="p-4 hidden md:block my-2">
                {exercise.equipment &&
                  exercise.equipment
                    .map((type) => type.toUpperCase())
                    .join(", ")}
              </div>

              {/* SETS */}
              <div className="md:p-4 my-2">
                <input
                  placeholder={exercise.sets || 3}
                  className="input py-2 md:px-4 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={
                    exerciseInputs[exercise._id]?.sets ?? exercise.sets ?? 3
                  }
                  name="sets"
                  onChange={handleChange(exercise._id)}
                  disabled={disabled}
                ></input>
              </div>

              {/* REPS */}
              <div className="md:p-4 my-2">
                <input
                  placeholder="8"
                  className="input py-2 md:px-4 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={
                    exerciseInputs[exercise._id]?.reps ?? exercise.reps ?? 12
                  }
                  name="reps"
                  onChange={handleChange(exercise._id)}
                  disabled={disabled}
                ></input>
              </div>

              {/* WEIGHTS KG */}
              <div className="md:p-4 my-2">
                <input
                  placeholder="10"
                  className="input py-2 md:px-4 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={
                    exerciseInputs[exercise._id]?.weight ??
                    exercise.weight ??
                    10
                  }
                  name="weight"
                  onChange={handleChange(exercise._id)}
                  disabled={disabled}
                ></input>
              </div>
              {/* ADD TO WORKOUT BUTTON */}
              <div className="md:p-4 md:block hidden my-2">
                <button
                  className=" py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white"
                  onClick={() => {
                    if (buttonText === "Add") {
                      handleAddToWorkout(
                        exercise._id,
                        exercise.name,
                        exercise.body_type,
                        exercise.equipment
                      );
                    } else if (buttonText === "Edit") {
                      handleEditExercise(exercise._id);
                    }
                  }}
                >
                  {buttonText}
                </button>
              </div>

              <div className="md:p-4 md:hidden block my-2">
                <button
                  className="btn-primary py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white"
                  onClick={() => {
                    if (buttonText === "Add") {
                      handleAddToWorkout(
                        exercise._id,
                        exercise.name,
                        exercise.body_type,
                        exercise.equipment
                      );
                    } else if (buttonText === "Edit") {
                      handleEditExercise(exercise._id);
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}

      {loading && <Loading />}
    </div>
  );
}
