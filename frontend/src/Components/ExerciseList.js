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
      exerciseSets:  3,
      exerciseReps: 8,
      exerciseWeight:  10,
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
              <div className=" text-md  md:text-lg m-2  flex-col font-semibold text-left w-2/3">
                <h3>{exercise.name}</h3>
                <div className="uppercase flex text-gray-500 space-x-4 text-sm md:text-md" >
               <p className="p-2 rounded-lg">{exercise.body_type}</p> <p className="p-2 rounded-lg">{exercise.equipment}</p>
                </div>
              </div>

            

              {/* SETS */}
              {/* <div className="md:p-4 my-2">
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
              </div> */}

              {/* REPS */}
              {/* <div className="md:p-4 my-2">
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
              </div> */}

              {/* WEIGHTS KG */}
              {/* <div className="md:p-4 my-2">
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
              </div>  */}
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
