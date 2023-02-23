import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../features/exerciseSlice";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import ExerciseCatergories from "./exerciseCatergories";

import ExerciseList from "./ExerciseList";

export default function Exercises() {
  const [exerciseList, setExerciseList] = useState();
  const [loading, setLoading] = useState(true);

  const defaultWorkout = useSelector((state) => state.fitness.defaultWorkout);

  console.log(defaultWorkout);

  const [exerciseDetails, setExerciseDetails] = useState({
    exerciseID: "",
    exerciseSets: 3,
    exerciseReps: 8,
    exerciseWeight: 10,
  });

  const [exerciseInputs, setExerciseInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (exerciseDetails.exerciseID) {
      dispatch(addExercise(exerciseDetails));
    }
  }, [exerciseDetails, dispatch]);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    console.log(`Searching for "${searchTerm}"`);

    const searchExercises = exerciseList.filter((word) => {
      return word.name.includes(searchTerm);
    });
setExerciseList(searchExercises)
    console.log(searchExercises)
  };
  return (
    <div className="m-2">
      <ExerciseCatergories
        setExerciseList={setExerciseList}
        setLoading={setLoading}
      />
      {/* SEARCH BAR */}
      <div className="w-1/2 flex">
        <MagnifyingGlassCircleIcon className="w-10 h-full fill-inherit" />
        <input
          className="px-2  w-1/2 rounded-2xl bg-[#19192C] text-[#7B7B8F] "
          placeholder="Search for an exercise"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <button onClick={handleClick} className="mx-2">
          Search
        </button>
      </div>
      {/* // TABLE */}
     <ExerciseList loading={loading} handleAddToWorkout={handleAddToWorkout} exerciseInputs={exerciseInputs} exerciseList={exerciseList} handleChange={handleChange}/>
    </div>
  );
}
