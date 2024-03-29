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
  const exerciseImage = currentExercise?.[currentExerciseIndex]?.img;
  const exerciseType = currentExercise?.[currentExerciseIndex]?.body_type;
  const exerciseEquipment = currentExercise?.[currentExerciseIndex]?.equipment;
  const exerciseSets = currentExercise?.[currentExerciseIndex]?.sets;
  const exerciseReps = currentExercise?.[currentExerciseIndex]?.reps;
  const exerciseWeight = currentExercise?.[currentExerciseIndex]?.weight;

  console.log(currentWorkout);

  const [showTimer, setShowTimer] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [currentSet, setCurrentSet] = useState(0);
  const [completedWorkout, setCompletedWorkout] = useState(false);
  //exerciseWorkoutdata

  const [exerciseData, setExerciseData] = useState([]);
  const [completeWorkoutData, setCompleteWorkoutData] = useState([]);

  const dispatch = useDispatch();

  // Update exercise data
  const updateExerciseData = (id, name, value) => {
    setExerciseData((prevState) => {
      const updatedExercise = {
        id: exerciseID,
        name: exerciseName,
        type: exerciseType,
        equipment: exerciseEquipment,
        sets: prevState[currentExerciseIndex]?.sets || [
          { reps: exerciseReps, weight: exerciseWeight, completed: false },
        ],
      };
      updatedExercise.sets[id] = {
        ...updatedExercise.sets[id],
        [name]: value,
      };
      const newState = [...prevState];
      newState[currentExerciseIndex] = updatedExercise;
      return newState;
    });
  };

  // Handle input changes
  const handleInputChange = (id) => (e) => {
    const { name, value } = e.target;
    updateExerciseData(id, name, value);
  };

  // Handle completion of a set
  const handleDone = (rowIndex) => (e) => {
    e.preventDefault();
    const repsValue = exerciseData[currentExerciseIndex]?.sets[rowIndex]?.reps;
    const weightValue =
      exerciseData[currentExerciseIndex]?.sets[rowIndex]?.weight;
    if (!repsValue || !weightValue) {
      alert("Complete all fields");
      return;
    }

    // Mark the set as completed
    const updatedSets = [...exerciseData[currentExerciseIndex].sets];
    updatedSets[rowIndex].completed = true;

    // Update exercise data with the new completed set
    setExerciseData((prevState) => {
      const updatedExercise = {
        ...prevState[currentExerciseIndex],
        sets: updatedSets,
      };
      const newState = [...prevState];
      newState[currentExerciseIndex] = updatedExercise;
      return newState;
    });

    // Start the timer and increment the current set
    setSecondsLeft(5);
    setShowTimer(true);
    setCurrentSet(currentSet + 1);
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
        className={`flex md:flex-row space-x-4 items-center justify-center bg-secondary px-4${
          completed ? "opacity-50" : ""
        }`}
      >
        <h3 className="text-center m-4 font-bold text-black">{i + 1}</h3>
        <input
          placeholder={exerciseReps}
          type="number"
          name="reps"
          value={repsValue || ""}
          onChange={handleInputChange(i)}
          disabled={completed || currentSet !== i}
          className={`py-2 md:px-4 md:m-4 rounded-lg w-12 md:w-1/2 text-center  
          ${completed ? "bg-black text-white " : ""}
          ${
            currentSet !== i
              ? " text-white border-black cursor-not-allowed bg-black"
              : "text-black border-black border-2"
          }
          
          `}
        />
        <input
          placeholder={`${exerciseWeight}kg`}
          name="weight"
          value={weightValue || ""}
          type="number"
          pattern="^\d+(\.\d+)?$"
          onChange={handleInputChange(i)}
          disabled={completed || currentSet !== i}
          className={`py-2 md:px-4 md:m-4 rounded-lg w-12 md:w-1/2 text-center  
          ${completed ? "bg-black text-white " : ""}
          ${
            currentSet !== i
              ? " text-white border-black cursor-not-allowed bg-black"
              : "text-black border-black border-2"
          }
          
          `}
        />
        <button
          className={` h-10 w-12 font-semibold rounded-lg shadow-md m-4 text-xl ${
            completed ? "text-white w-12 cursor-not-allowed" : ""
          }
          ${
            currentSet !== i
              ? "cursor-not-allowed text-tertiary bg-tertiary w-12"
              : "btn-primary text-white w-12 border-white border-2 hover:bg-black text-3xl leading-3"
          } `}
          onClick={handleDone(i)}
          disabled={completed || currentSet !== i}
        >
          +
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

    if (!exerciseData[newNumber]) {
      setCurrentSet(0);
      return;
    }
    const completedSets = exerciseData[newNumber].sets.filter(
      (word) => word.completed === true
    );
    setCurrentSet(completedSets.length);
  };

  // be able to change to prev exercise
  const handlePrevExercise = () => {
    const newNumber = currentExerciseIndex - 1;
    console.log(newNumber);
    if (newNumber === -1) {
      return;
    }
    setCurrentExerciseIndex(newNumber);

    console.log(exerciseData[newNumber]);
    if (
      !exerciseData[newNumber] ||
      exerciseData[newNumber].sets[0].completed === false
    ) {
      setCurrentSet(0);
      return;
    }
    const completedSets = exerciseData[newNumber].sets.filter(
      (word) => word.completed === true
    );
    setCurrentSet(completedSets.length);
  };

  //complee workout
  const handleCompleteWorkout = async (e) => {
    e.preventDefault();

    const validExercises = exerciseData
      .filter((exercise) => exercise !== null && exercise !== undefined) // Filter out null and undefined exercises
      .filter((exercise) => {
        // Check if all sets are marked as completed
        const allSetsCompleted = exercise.sets.every((set) => set.completed);
        console.log(allSetsCompleted);
        return allSetsCompleted;
      });

    console.log(validExercises);

    // If there are no valid exercises, alert the user and return
    if (validExercises.length === 0) {
      alert("Please complete all exercise sets before completing the workout.");
      return;
    }
    setCompleteWorkoutData(validExercises);

    const workoutResults = {
      userID: user._id,
      workoutID: currentWorkout._id,
      workoutName: currentWorkout.name,
      exercises: validExercises,
    };

    const res = await dispatch(completeWorkout(workoutResults));

    setCompletedWorkout(true);
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

  //TOTAL WEIGHT LIFTED:

  return (
    <section className="flex flex-col justify-center ">
      {currentWorkout ? (
        <div>
          <h2 className="uppercase text-center sub-heading bg-white">
            {currentWorkout.name}
          </h2>

          {/* NO WORKOUT SECTION */}
          {!currentWorkout && <p>Loading...</p>}
          {currentWorkout.exercises.length === 0 && (
            <div className="bg-white p-4 flex flex-col m-4">
              <div className="justify-center ">
                <p>No Exercises found, please add exercises to start</p>
                <Link to="/dashboard/exerciselist"> Click Here to Start</Link>
              </div>
            </div>
          )}
          {/* WORKOUT SECTION */}
          {currentWorkout.exercises.length > 0 && !completedWorkout && (
            <div className="w-full mt-4 lg:flex-col lg:flex lg:items-center ">
              <form className="bg-primary rounded-lg shadow-lg p-4	">
                <h2 className="md:text-2xl text-l font-bold md:mb-4 text-center text-white">
                  {exerciseName}
                </h2>
                <div className="flex justify-center">
                  <img
                    src={exerciseImage}
                    alt={exerciseName}
                    className="md:w-1/4"
                  />
                </div>
                {setAmount}
                {showTimer && (
                  <div className="fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-80" />

                    <div className="flex justify-center md:w-1/2 w-full h-1/2 items-center z-10 px-8 text-4xl  bg-white font-bold">
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
                              className="btn-primary-longer"
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

              <div className="flex justify-evenly my-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowTimer(false);
                    setSecondsLeft(45);
                    handlePrevExercise();
                  }}
                  className={`  ${
                    showTimer && secondsLeft > 0 ? "hidden" : "block"
                  } btn-primary`}
                >
                  Prev
                </button>

                {currentSet === exerciseSets && (
                  <button
                    onClick={handleCompleteWorkout}
                    className="btn-secondary"
                  >
                    Complete
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setShowTimer(false);
                    setSecondsLeft(45);
                    handleNextExercise();
                  }}
                  className={` ${
                    showTimer && secondsLeft > 0 ? "hidden" : "block"
                  } btn-primary transition ease-in-out delay-150`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {completedWorkout && (
            <div className="bg-white rounded-lg shadow-lg p-8 lg:w-2/3 w-full lg:mx-auto">
              <h2 className="font-bold">WORKOUT COMPLETED</h2>
              <h2>Well Done {user.name}</h2>
              <p className="font-semibold">
                Total of Exercises Completed = {completeWorkoutData.length}
              </p>
              {completeWorkoutData.map((exercise) => {
                let totalWeight = 0;
                let totalReps = 0;
                exercise.sets.forEach((set) => {
                  if (set.completed) {
                    totalWeight += set.weight * set.reps;
                    totalReps += parseInt(set.reps);
                  }
                });
                return (
                  <div key={exercise._id}>
                    <p className="font-semibold">
                      {exercise.name}: {totalWeight} kg, {totalReps}reps
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>No current workout</p>
        </div>
      )}
    </section>
  );
}

export default WorkoutPage;
