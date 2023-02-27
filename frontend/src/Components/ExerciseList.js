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
    <div className="grid md:grid-cols-8 grid-cols-5 selection text-center  gap-4">
      <div className="col-span-1 font-bold">Name</div>
      <div className="font-bold hidden md:block">Type</div>
      <div className="font-bold hidden md:block">Equipment</div>
      <div className="font-bold">Sets</div>
      <div className="font-bold">Reps</div>
      <div className="font-bold">Weight</div>
      <div className="font-bold">{buttonText}</div>
      {!loading &&
        exerciseList &&
        exerciseList.length > 0 &&
        exerciseList.map((exercise) => {
          return (
            <React.Fragment key={exercise._id}>
              {/* EXERCISE NAME */}
              <div className="col-span-1 md:p-4">{exercise.name}</div>

              {/* Exercise BODY TYPE */}
              <div className="p-4 hidden md:block">
                {exercise.body_type &&
                  exercise.body_type
                    .map((type) => type.toUpperCase())
                    .join(", ")}
              </div>

              {/* Exercise EQUIPMENT */}
              <div className="p-4 hidden md:block">
                {exercise.equipment &&
                  exercise.equipment
                    .map((type) => type.toUpperCase())
                    .join(", ")}
              </div>

              {/* SETS */}
              <div className="md:p-4">
                <input
                  placeholder={exercise.sets || 3}
                  className={!disabled ? "input" : "input-fixed"}
                  value={
                    exerciseInputs[exercise._id]?.sets ?? exercise.sets ?? 3
                  }
                  name="sets"
                  onChange={handleChange(exercise._id)}
                  disabled={disabled}
                ></input>
              </div>

              {/* REPS */}
              <div className="md:p-4">
                <input
                  placeholder="8"
                  className={!disabled ? "input" : "input-fixed"}
                  value={
                    exerciseInputs[exercise._id]?.reps ?? exercise.reps ?? 12
                  }
                  name="reps"
                  onChange={handleChange(exercise._id)}
                  disabled={disabled}
                ></input>
              </div>

              {/* WEIGHTS KG */}
              <div className="md:p-4">
                <input
                  placeholder="10"
                  className={!disabled ? "input" : "input-fixed"}
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

              {/* ADD TO WORKOUT BUTTTON */}
              <div className="md:p-4 md:visible hidden">
                <button
                  className="btn-primary"
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

              <div className="md:p-4 md:hidden visible">
                <button
                  className="btn-primary"
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
            </React.Fragment>
          );
        })}
      {loading && <Loading />}
    </div>
  );
}
