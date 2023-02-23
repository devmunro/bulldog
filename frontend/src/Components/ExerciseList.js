import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";

export default function ExerciseList({
  loading,
  setExerciseDetails,
  exerciseList,
  buttonText,
  isDisabled
}) {
  const [exerciseInputs, setExerciseInputs] = useState({});
  const defaultWorkout = useSelector((state) => state.fitness.defaultWorkout);

  //handle add to workout
  const handleAddToWorkout = async (id) => {
    setExerciseDetails({
      exerciseID: id,
      exerciseSets: exerciseInputs[id]?.sets ?? 3,
      exerciseReps: exerciseInputs[id]?.reps ?? 8,
      exerciseWeight: exerciseInputs[id]?.weight ?? 10,
      selectedWorkout: defaultWorkout,
    });
  };


   //handle edit exercise for current workout
   const handleEditExercise = async (id) => {
    setExerciseDetails({
      exerciseID: id,
      exerciseSets: exerciseInputs[id]?.sets ?? 3,
      exerciseReps: exerciseInputs[id]?.reps ?? 8,
      exerciseWeight: exerciseInputs[id]?.weight ?? 10,
      selectedWorkout: defaultWorkout,
    });
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

  console.log(exerciseList);

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
          <th>Add to Workout</th>
        </tr>
      </thead>

      {!loading &&
        exerciseList &&
        exerciseList.length > 0 &&
        exerciseList.map((exercise) => {
          return (
            <tbody className="even:bg-[#7B7B8F] odd:bg-black ">
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
                    className="w-12 h-12  text-center text-xl text-black bg-slate-400 focus:bg-slate-100"
                    value={exerciseInputs[exercise._id]?.sets ?? exercise.sets ?? 3}
                    name="sets"
                    onChange={handleChange(exercise._id)}
                    disabled={isDisabled}
                  ></input>
                </td>

                {/* REPS */}

                <td>
                  <input
                    placeholder="8"
                    className="w-12 h-12 text-center text-xl text-black bg-slate-400 focus:bg-slate-100"
                    value={exerciseInputs[exercise._id]?.reps ?? exercise.reps ?? 12}
                    name="reps"
                    onChange={handleChange(exercise._id)}
                    disabled={isDisabled}
                  ></input>
                </td>

                {/* WEIGHTS KG */}

                <td>
                  <input
                    placeholder="10"
                    className="w-12 h-12 text-center text-xl text-black bg-slate-400 focus:bg-slate-100"
                    value={exerciseInputs[exercise._id]?.weight ?? exercise.weight ?? 10}
                    name="weight"
                    onChange={handleChange(exercise._id)}
                    disabled={isDisabled}
                  ></input>
                </td>

                {/* ADD TO WORKOUT BUTTTON */}

                <td className="justify-center">
                  <button
                    className="bg-white text-black p-2 h-10 "
                    onClick={() => {
                      if (buttonText === "Add") {
                        handleAddToWorkout(exercise._id);
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
