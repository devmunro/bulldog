import React, {useState, useEffect} from 'react';
import {clearState, loginUser} from './features/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { completeWorkout } from './features/exerciseSlice';

export default function Workout() {

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { currentWorkout } = useSelector((state) => state.fitness);
  const { user } = useSelector((state) => state.auth);
  const currentExercise = currentWorkout?.exercises;
  const exerciseID = currentExercise?.[currentExerciseIndex]?.exercise;
  const exerciseName = currentExercise?.[currentExerciseIndex]?.name;
  const exerciseSets = currentExercise?.[currentExerciseIndex]?.sets;
  const exerciseReps = currentExercise?.[currentExerciseIndex]?.reps;
  const exerciseWeight = currentExercise?.[currentExerciseIndex]?.weight;

  const [showTimer, setShowTimer] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [currentSet, setCurrentSet] = useState(0);
  const [completedWorkout, setCompletedWorkout] = useState(false);
  //exerciseWorkoutdata

  const [exerciseData, setExerciseData] = useState([
    {
      id: "",
      name: "",
      sets: [{ reps: "", weight: "", completed: false }],
    },
  ]);

  const dispatch = useDispatch();

  //handle inputs

  const handleInputChange = (id) => (e) => {
    e.preventDefault();
    const { name, value } = e.target;

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
        [name]: value,
      };
      const newState = [...prevState];
      newState[currentExerciseIndex] = updatedExercise;
      return newState;
    });
  };
  console.log(exerciseData);

  const handleDone = (rowIndex) => (e) => {
    e.preventDefault();

    const repsValue = exerciseData[currentExerciseIndex]?.sets[rowIndex]?.reps;
    const weightValue =
      exerciseData[currentExerciseIndex]?.sets[rowIndex]?.weight;

    if (!repsValue || !weightValue) {
      alert("complete all fields");
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
          disabled={completed || currentSet !== i}
          className={`py-2 md:px-4 md:m-4 rounded-lg w-20 md:w-full text-center bg-white border-2 border-black my-2 
          ${
            currentSet !== i
              ? "bg-gray-400 text-white border-gray-400 cursor-not-allowed"
              : ""
          }
          ${completed ? "bg-blue-900 text-white border-blue-900 border-2" : ""}
          
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
          className={`py-2 md:px-4 md:m-4 rounded-lg w-20 md:w-full text-center bg-white border-2 border-black my-2 
          ${completed ? "bg-blue-900 text-white border-blue-900 border-2" : ""}
          ${
            currentSet !== i
              ? "bg-gray-400 text-white border-gray-400 cursor-not-allowed"
              : ""
          }
          
          `}
        />
        <button
          className={`py-2 px-4 h-10 bg-blue-500 font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mt-2 m-4 text-xl ${
            completed
              ? "bg-blue-900 border-blue-900 border-2"
              : "text-white hover:bg-blue-700"
          }
          ${
            currentSet !== i
              ? "bg-gray-400 text-gray-400 hover:bg-gray-400 border-gray-400 cursor-not-allowed"
              : ""
          } `}
          onClick={handleDone(i)}
          disabled={completed || currentSet !== i}
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

    // if () {
    //   alert("Please complete all exercise sets before completing the workout.");
    //   return;
    // }

    const workoutResults = {
      userID: user._id,
      workoutID: currentWorkout._id,
      workoutName: currentWorkout.name,
      exercises: exerciseData,
    };

    const res = await dispatch(completeWorkout(workoutResults));
 
    setCompletedWorkout(true)

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

  console.log(exerciseSets);
  return (
    <View style>
      <Text style>Workout</Text>
      
    </View>
  );
}