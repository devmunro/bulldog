import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeWorkout } from "../features/exerciseSlice";

function WorkoutPage() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { currentWorkout } = useSelector((state) => state.fitness);
  const { user } = useSelector((state) => state.auth);
  const currentExercise = currentWorkout.exercises;
  const exerciseID = currentExercise[currentExerciseIndex].exercise;
  const exerciseName = currentExercise[currentExerciseIndex].name;
  const exerciseSets = currentExercise[currentExerciseIndex].sets;
  const exerciseReps = currentExercise[currentExerciseIndex].reps;
  const exerciseWeight = currentExercise[currentExerciseIndex].weight;

  const [disabledRows, setDisabledRows] = useState([]);
  const [showTimer, setShowTimer] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);

  //exercisedata

  const [exerciseData, setExerciseData] = useState([
    {
      id: "",
      name: "",
      sets: [{ reps: "", weight: "" }],
    },
  ]);

  const dispatch = useDispatch();

  //handle inputs

  const handleInputChange = (id) => (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("here",e.target.name)
    setExerciseData((prevState) => {
      const updatedExercise = {
        id: exerciseID,
        name: exerciseName,
        sets: prevState[currentExerciseIndex]?.sets || [
          { reps: exerciseReps, weight:exerciseWeight },
        ],
      };
      updatedExercise.sets[id] = {
        ...updatedExercise.sets[id],
        [name]: parseInt(value) || 0,
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

    setSecondsLeft(5);
    setShowTimer(true);
    setDisabledRows([...disabledRows, rowIndex]);
  };

  const setAmount = [];
  for (let i = 0; i < exerciseSets; i++) {
    setAmount.push(
      <div key={i} className="flex  flex-col md:flex-row md:space-x-4  justify-center">
        <h3 className="mb-2 md:mb-0 text-center m-4 font-bold">Set {i + 1}</h3>
        <input
          placeholder={exerciseReps}
          type="number"
          name="reps"
          value={exerciseData[currentExerciseIndex]?.sets[i]?.reps || ""}
          onChange={handleInputChange(i)}
          disabled={disabledRows.includes(i)}
          className={`py-2 px-4 m-4 rounded-lg ${
            disabledRows.includes(i)
              ? "bg-gray-400 placeholder-white my-2 border-2"
              : "bg-white border-2 border-black my-2"
          }`}
        />
        <input
          placeholder={`${exerciseWeight}kg`}
          name="weight"
          value={exerciseData[currentExerciseIndex]?.sets[i]?.weight || ""}
          type="number"
          onChange={handleInputChange(i)}
          disabled={disabledRows.includes(i)}
          className={`py-2 px-4 m-4 rounded-lg ${
            disabledRows.includes(i)
              ? "bg-gray-400 placeholder-white my-2 border-2"
              : "bg-white border-2 border-black my-2"
          }`}
        />
        <button
          className="btn-primary mt-2 m-4 text-xl"
          onClick={handleDone(i)}
          disabled={disabledRows.includes(i)}
        >
          +
        </button>
        <hr className="bg-black m-4"></hr>
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
  console.log("cw:", currentWorkout);
  //complee workout

  const handleCompleteWorkout = (e) => {
    e.preventDefault();

    const workoutResults = {
      userID: user._id,
      workoutID: currentWorkout._id,
      workoutName: currentWorkout.name,
      exercises: exerciseData,
    };

    dispatch(completeWorkout(workoutResults));
  };

  useEffect(() => {
    let timerId;
    if (showTimer && secondsLeft > 0) {
      timerId = setTimeout(() => {
        setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [showTimer, secondsLeft]);

  return (
    <section className="flex flex-col w-full justify-center">
      <form className="bg-white rounded-lg shadow-lg p-8 lg:w-2/3 w-full lg:mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">{exerciseName}</h2>
        {setAmount}
        {showTimer && (
          <div className="fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-80" />

            <div className="flex justify-center md:w-1/2 w-full h-1/2 items-center z-10 px-8 text-4xl  bg-black font-bold">
              <div className="flex justify-center">
                {showTimer && secondsLeft !== 0 && (
                  <div className="text-center my-4  w-full h-full">
                    <h3 className="font-bold text-red-500">
                      <p>REST</p>
                      <br />
                      {secondsLeft}
                      <span>secs</span>
                    </h3>
                  </div>
                )}
                {showTimer && secondsLeft === 0 && (
                  <div className="text-center my-4">
                    <h3 className="  text-red-500">Time's up!</h3>
                    <button
                      onClick={() => {
                        setShowTimer(false);
                      }}
                      className="btn-primary"
                    >
                      NEXT SET
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
      <button
        type="button"
        onClick={() => {
          setShowTimer(false);
          setSecondsLeft(45);
          handleNextExercise();
        }}
        className={`${
          showTimer && secondsLeft > 0 ? "hidden" : "block"
        } btn-primary lg:w-2/3 w-full lg:mx-auto`}
      >
        Next Exercise
      </button>
      <button
        onClick={handleCompleteWorkout}
        className="lg:w-2/3 w-full lg:mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Complete
      </button>
    </section>
  );
}

export default WorkoutPage;
