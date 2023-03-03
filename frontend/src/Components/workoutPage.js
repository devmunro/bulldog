import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function WorkoutPage() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { currentWorkout } = useSelector((state) => state.fitness);
  const currentExercise = currentWorkout.exercises;
  const exerciseID = currentExercise[currentExerciseIndex].exercise;
  const exerciseName = currentExercise[currentExerciseIndex].name;
  const exerciseSets = currentExercise[currentExerciseIndex].sets;
  const exerciseReps = currentExercise[currentExerciseIndex].reps;
  const exerciseWeight = currentExercise[currentExerciseIndex].weight;

  const [disabledRows, setDisabledRows] = useState([]);

  //exercisedata

  const [exerciseData, setExerciseData] = useState([
    {
      id: "",
      name: "",
      sets: [{ reps: "", weight: "" }],
    },
  ]);

  const dispatch = useDispatch()

  //handle inputs

  const handleInputChange = (id) => (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setExerciseData((prevState) => {
      const updatedExercise = {
        id: exerciseID,
        name: exerciseName,
        sets: prevState[currentExerciseIndex]?.sets || [
          { reps: "", weight: "" },
        ],
      };
      updatedExercise.sets[id] = {
        ...updatedExercise.sets[id],
        [name]: parseInt(value),
      };
      const newState = [...prevState];
      newState[currentExerciseIndex] = updatedExercise;
      return newState;
    });
  };
  console.log(exerciseID);
  console.log(exerciseData);

  const handleDone = (rowIndex) => (e) => {
    e.preventDefault();

    setDisabledRows([...disabledRows, rowIndex]);
  };

  const setAmount = [];
  for (let i = 0; i < exerciseSets; i++) {
    setAmount.push(
      <div key={i} className="flex space-x-4">
        <h3>Set {i + 1}</h3>
        <input
          placeholder={exerciseReps}
          type="number"
          name="reps"
          value={exerciseData[currentExerciseIndex]?.sets[i]?.reps || ""}
          onChange={handleInputChange(i)}
          disabled={disabledRows.includes(i)}
          required
        ></input>
        <input
          placeholder={`${exerciseWeight}kg`}
          name="weight"
          value={exerciseData[currentExerciseIndex]?.sets[i]?.weight || ""}
          type="number"
          onChange={handleInputChange(i)}
          disabled={disabledRows.includes(i)}
          required
        ></input>

        <button className="btn-primary" onClick={handleDone(i)}>
          DONE
        </button>
      </div>
    );
  }

  // be able to change to next exercise
  const handleNextExercise = () => {
    const newNumber = currentExerciseIndex + 1;
    console.log(newNumber);
    if (newNumber === currentExercise.length) {
      return;
    }
    setCurrentExerciseIndex(newNumber);
    setDisabledRows([]);
  };

  const handleCompleteWorkout = (e) => {
    e.preventDefault();
    dispatch(completeWorkout(exerciseData))
  };
  return (
    <div>
      <form className="bg-white">
        <h2>{exerciseName}</h2>
        {setAmount}

        <button type="button" onClick={handleNextExercise}>
          Next Exercise
        </button>
      </form>

      <button onClick={handleCompleteWorkout}>Complete</button>
    </div>
  );
}

export default WorkoutPage;
