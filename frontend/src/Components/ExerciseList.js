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
    <div className="bg-white p-4 grid md:grid-cols-7 grid-cols-5 mt-2 items-center selection text-center gap-4">
  <div className="col-span-1 font-bold text-lg py-2">Name</div>
  <div className="font-bold hidden md:block text-lg py-2">Type</div>
  <div className="font-bold hidden md:block text-lg py-2">Equipment</div>
  <div className="font-bold text-lg py-2">Sets</div>
  <div className="font-bold text-lg py-2">Reps</div>
  <div className="font-bold text-lg py-2">Weight</div>
  <div className="font-bold text-lg py-2">{buttonText}</div>
  {!loading &&
    exerciseList &&
    exerciseList.length > 0 &&
    exerciseList.map((exercise) => {
      return (
        <React.Fragment key={exercise._id}>
          {/* EXERCISE NAME */}
          <div className="col-span-1 md:p-4 my-2 font-semibold">{exercise.name}</div>

          {/* Exercise BODY TYPE */}
          <div className="p-4 hidden md:block my-2 ">
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
              className="input py-2 px-4 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="input py-2 px-4 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="input py-2 px-4 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          {buttonText}
        </button>
      </div>

      <div className="md:p-4 md:hidden visible my-2">
        <button
          className="btn-primary py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white"
          onClick={() => {
            if (buttonText === "Add Exercise") {
              handleAddToWorkout(
                exercise._id,
                exercise.name,
                exercise.body_type,
                exercise.equipment
              );
            } else if (buttonText === "Edit Exercise") {
              handleEditExercise(exercise._id);
            }
          }}
        >
          +
        </button>
      </div>
    </React.Fragment>
  );
})}

{loading && <Loading />}

</div>


  );
}
