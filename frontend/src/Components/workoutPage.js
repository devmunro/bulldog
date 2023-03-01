import React, { useState } from "react";
import { useSelector } from "react-redux";

const WorkoutPage = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { currentWorkout } = useSelector((state) => state.fitness);

  const handleNextExercise = () => {
    if (currentExerciseIndex === currentWorkout.exercises.length - 1) return;
    setCurrentExerciseIndex(currentExerciseIndex + 1);
  };

  const handlePrevExercise = () => {
    if (currentExerciseIndex === 0) return;
    setCurrentExerciseIndex(currentExerciseIndex - 1);
  };

  const currentExercise = currentWorkout?.exercises[currentExerciseIndex];

  const handleStore = (e) => {
    e.preventDefaut();
    console.log(e);
  };
console.log(currentWorkout)
console.log(currentExercise)

  return (
    <div>
      {currentExercise === undefined && <div>nothing</div>}
      {currentExercise && currentWorkout && (
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">{currentWorkout.name}</h1>
          <div className="my-4">
            <h3 className="text-xl font-bold mb-2">{currentExercise.name}</h3>
            {(() => {
              const sets = [];
              for (let i = 0; i < currentExercise?.sets; i++) {
                sets.push(
                  <div key={i} className="flex items-center my-2">
                    <p className="mr-4">Set {i + 1}</p>
                    <input
                      type="text"
                      className="border-gray-300 rounded-md shadow-sm p-2 w-20 mr-4"
                      placeholder="Reps"
                    />
                    <p>reps</p>
                    <input
                      type="text"
                      className="border-gray-300 rounded-md shadow-sm p-2 w-40 mr-4"
                      placeholder="Weight lifted"
                    />
                    <p className="mr-4">kg</p>
                    <button
                      className="bg-orange-400 text-gray-600 rounded-md py-2 px-4 hover:bg-gray-300"
                      onClick={handleStore}
                    >
                      Done
                    </button>
                  </div>
                );
              }
              return sets;
            })()}
          </div>
          <div className="flex justify-between items-center">
            <button
              className="bg-gray-200 text-gray-600 rounded-md py-2 px-4 hover:bg-gray-300"
              onClick={handlePrevExercise}
            >
              Previous Exercise
            </button>
            <p className="text-gray-600 font-bold">
              Exercise {currentExerciseIndex + 1} of{" "}
              {currentWorkout.exercises.length}
            </p>
            <button
              className="bg-gray-200 text-gray-600 rounded-md py-2 px-4 hover:bg-gray-300"
              onClick={handleNextExercise}
            >
              Next Exercise
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPage;
