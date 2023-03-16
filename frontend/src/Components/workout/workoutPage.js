import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeWorkout } from "../../features/exerciseSlice";
import { Link } from "react-router-dom";

function WorkoutPage() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { currentWorkout } = useSelector((state) => state.fitness);
  const { user } = useSelector((state) => state.auth);
  const currentExercise = currentWorkout?.exercises;
  const exerciseID = currentExercise?.[currentExerciseIndex]?.exercise;
  const exerciseName = currentExercise?.[currentExerciseIndex]?.name;
  const exerciseSets = currentExercise?.[currentExerciseIndex]?.sets;
  const exerciseReps = currentExercise?.[currentExerciseIndex]?.reps;
  const exerciseWeight = currentExercise?.[currentExerciseIndex]?.weight;

  const [disabledRows, setDisabledRows] = useState([]);
  const [showTimer, setShowTimer] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [incompleteSets, setIncompleteSets] = useState(false);


  //exercisedata

  const [exerciseData, setExerciseData] = useState([
    {
      id: "",
      name: "",
      sets: [{ reps: "", weight: "", completed: false }],
    },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    const hasIncompleteSets = exerciseData.some((exercise) =>
      exercise.sets.some((set) => !set.reps || !set.weight)
    );
    setIncompleteSets(hasIncompleteSets);
  }, [exerciseData]);

    //handle inputs

  const handleInputChange = (id) => (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("here", e.target.name);
    setExerciseData((prevState) => {
      const updatedExercise = {
        id: exerciseID,
        name: exerciseName,
        sets: prevState[currentExerciseIndex]?.sets || [
          { reps: exerciseReps, weight: exerciseWeight, completed: false },
        ],
      };
      updatedExercise.sets[id] = {
        ...updatedExercise.sets[id],
        [name]: (value),
      };
      const newState = [...prevState];
      newState[currentExerciseIndex] = updatedExercise;
      return newState;
    });
  };


const handleDone = (rowIndex) => (e) => {
  e.preventDefault();

  const repsValue = exerciseData[currentExerciseIndex]?.sets[rowIndex]?.reps;
  const weightValue = exerciseData[currentExerciseIndex]?.sets[rowIndex]?.weight;

  if (!repsValue || !weightValue) {
    alert("complete all fields")
    return;
  }

  const updatedSets = [...exerciseData[currentExerciseIndex].sets];
  updatedSets[rowIndex].completed = true;
  setExerciseData((prevState) => {
    const updatedExercise = {
      ...prevState[currentExerciseIndex],
      sets: updatedSets,
    };
    const newState = [...prevState];
    newState[currentExerciseIndex] = updatedExercise;
    return newState;
  });
  setDisabledRows([...disabledRows, rowIndex]);

  setSecondsLeft(5);
  setShowTimer(true);
};

const setAmount = [];
for (let i = 0; i < exerciseSets; i++) {
  const set = exerciseData[currentExerciseIndex]?.sets[i];
  const repsValue = set?.reps;
  const weightValue = set?.weight;
  const completed = set?.completed;

  setAmount.push(
    <div
      key={i}
      className={`flex md:flex-row md:space-x-4 items-center justify-center ${
        completed ? "opacity-50" : ""
      }`}
    >
      <h3 className="mb-2 md:mb-0 text-center md:m-4 font-bold">
        Set {i + 1}
      </h3>
      <input
        placeholder={exerciseReps}
        type="number"
        name="reps"
        value={repsValue || ""}
        onChange={handleInputChange(i)}
        disabled={completed}
        className={`py-2 md:px-4 px-2 m-4 rounded-lg w-12 md:w-full text-center ${
          completed ? "bg-gray-400 placeholder-white my-2 border-2" : "bg-white border-2 border-black my-2"
        }`}
      />
      <input
        placeholder={`${exerciseWeight}kg`}
        name="weight"
        value={weightValue || ""}
        type="number"
        pattern="^\d+(\.\d+)?$"
        onChange={handleInputChange(i)}
        disabled={completed}
        className={`py-2 md:px-4 md:m-4 rounded-lg w-20 md:w-full text-center ${
          completed ? "bg-gray-400 placeholder-white my-2 border-2" : "bg-white border-2 border-black my-2"
        }`}
      />
      <button
        className="btn-primary mt-2 m-4 text-xl"
        onClick={handleDone(i)}
        disabled={completed}
      >
        +
      </button>
      <hr className="bg-black md:m-4"></hr>
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

    // be able to change to prev exercise
    const handlePrevExercise = () => {
      const newNumber = currentExerciseIndex  -1;
      console.log(newNumber);
      if (newNumber === -1) {
        return;
      }
      setCurrentExerciseIndex(newNumber);
     
    };


  console.log("cw:", currentWorkout);
  //complee workout

  const handleCompleteWorkout = (e) => {
    e.preventDefault();
  
    if (incompleteSets) {
      alert('Please complete all exercise sets before completing the workout.');
      return;
    }
  
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
  console.log("SHOW EX",currentWorkout.exercises);
  return (
    <section className="flex flex-col w-full justify-center">
      <h2 className="uppercase text-center m-4 p-4 bg-white -">
        {currentWorkout.name}
      </h2>

      {/* NO WORKOUT SECTION */}
      {!currentWorkout && <p>Loading...</p>}
      {currentWorkout.exercises.length === 0 && (
        <div className="bg-white p-4 flex flex-col m-4">
          <div className="justify-center ">
            <p >
              No Exercises found, please add exercises to start
            </p>
            <Link to="/dashboard/exerciselist"> Click Here to Start</Link>
          </div>
        </div>
      )}
      {/* WORKOUT SECTION */}
      {currentWorkout.exercises.length > 0 && (
        <div>
          <form className="bg-white rounded-lg shadow-lg p-8 lg:w-2/3 w-full lg:mx-auto">
            <h2 className="md:text-2xl text-l font-bold md:mb-4 text-center">
              {exerciseName}
            </h2>
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
         
         <div className="flex justify-between">
          <button
            type="button"
            onClick={() => {
              setShowTimer(false);
              setSecondsLeft(45);
              handlePrevExercise();
            }}
            className={`${
              showTimer && secondsLeft > 0 ? "hidden" : "block"
            } btn-primary lg:w-2/3 w-full lg:mx-auto`}
          >
            Prev
          </button>
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
            Next
          </button>
          </div>
          <button
            onClick={handleCompleteWorkout}
            className="lg:w-2/3 w-full flex justify-center lg:mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Complete
          </button>
        </div>
      )}
    </section>
  );
}

export default WorkoutPage;
