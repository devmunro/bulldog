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
    exerciseReps: 12,
    exerciseWeight: 10,
  });
  console.log(exerciseDetails);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  //handle add to workout

  useEffect(() => {
    if (exerciseDetails.exerciseID) {
      dispatch(addExercise(exerciseDetails));
    }
  }, [exerciseDetails, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    console.log(`Searching for "${searchTerm}"`);
    console.log(exerciseList);
    const searchExercises = exerciseList.filter((word) => {
      return word.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setExerciseList(searchExercises);
    console.log(searchExercises);
  };
  return (
    <div className="md:m-2">
      <ExerciseCatergories
        setExerciseList={setExerciseList}
        setLoading={setLoading}
      />
      {/* SEARCH BAR */}
      <div className=" md:p-4 bg-gradient-to-bl from-blue-800 to-gray-900">
        <div className="w-full md:1/2 flex md:gap-4 gap-1 items-center">
          <input
            className="px-2 md:w-2/3 md:h-12 h-8 rounded-2xl bg-[#19192C] text-[#7B7B8F] "
            placeholder="Search for an exercise"
            onChange={handleSearchChange}
            value={searchTerm}
            onKeyDown={(event) => event.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className=" flex justify-center items-center btn-secondary "
          >
            Search
            <MagnifyingGlassCircleIcon className="h-8 fill-inherit" />
          </button>
        </div>
        {/* // TABLE */}
        <ExerciseList
          loading={loading}
          setExerciseDetails={setExerciseDetails}
          exerciseList={exerciseList}
          buttonText="Add"
          isDisabled={false}

        />
      </div>
    </div>
  );
}
