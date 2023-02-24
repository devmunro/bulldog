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
    <table className="table-auto w-full text-white text-justify align-middle">
      <thead>
        <tr className="[&>*]:p-4">
          <th className="w-1/4">Name</th>
          <th>Type</th>
          <th>Equipment</th>
          <th>Sets</th>
          <th>Reps</th>
          <th>Weight(KG)</th>
          <th>Add/Edit</th>
        </tr>
      </thead>

      {!loading &&
        exerciseList &&
        exerciseList.length > 0 &&
        exerciseList.map((exercise) => {
          return (
            <tbody  className={`${disabled ? " even:bg-indigo-800 odd:bg-black" : "bg-black"} shadow-md shadow-black`}>
              {/* EXERCISE NAME */}
              <tr className="space-y-4 space-x-2 [&>*]:p-4">
                <td>{exercise.name}</td>

                {/* Exercise BODY TYPE */}

                <td>
                  {exercise.body_type &&
                    exercise.body_type
                      .map((type) => type.toUpperCase())
                      .join(", ")}
                </td>

                {/* Exercise EQUIPMENT */}

                <td>
                  {" "}
                  {exercise.equipment &&
                    exercise.equipment
                      .map((type) => type.toUpperCase())
                      .join(", ")}
                </td>

                {/* SETS  */}

                <td>
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
                </td>

                {/* REPS */}

                <td>
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
                </td>

                {/* WEIGHTS KG */}

                <td>
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
                </td>

                {/* ADD TO WORKOUT BUTTTON */}

                <td className="justify-center">
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
                </td>
              </tr>
            </tbody>
          );
        })}
      {loading && <Loading />}
    </table>
  );
}
