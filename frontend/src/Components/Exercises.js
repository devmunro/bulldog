import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import ExerciseCatergories from "./exerciseCatergories";

import ExerciseList from "./ExerciseList";
import { getAllExercises } from "../features/exerciseSlice";

export default function Exercises() {
  const [exerciseList, setExerciseList] = useState();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [completeExercises, setCompleteExercises] = useState("");
  const [searchList, setSearchList] = useState("");

  const dispatch = useDispatch();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const getAll = async () => {
     const response = await dispatch(getAllExercises());
  console.log(response)
  if(response) {
    setCompleteExercises(response.payload)
    setSearchList(response.payload)
    
  }
    };

    
    getAll();
  }, []);

  const handleSearch = (e) => {
    console.log(`Searching for "${searchTerm}"`);
    console.log(exerciseList);
    const searchExercises = completeExercises.filter((word) => {
      return word.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setExerciseList(searchExercises);
    setCompleteExercises(searchList)
    console.log(searchExercises);
  };
  return (
    <div className="flex justify-center flex-col ">
      <div className=" md:p-4 bg-gradient-to-bl from-blue-800 to-gray-900">
        <div className="w-full md:flex  px-4 items-center">
          <div>
            <ExerciseCatergories
              setExerciseList={setExerciseList}
              setLoading={setLoading}
            />
          </div>

          {/* SEARCH BAR */}
          <div className="md:w-1/2  flex items-center">
            <input
              className="px-2 w-full md:w-2/3 md:h-12 h-8 rounded-2xl md:text-sm text-xs bg-[#19192C] text-[#7B7B8F] "
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
        </div>
        {/* // LIST */}
        <ExerciseList
          loading={loading}
          exerciseList={exerciseList}
          buttonText="Add"
        />
      </div>
    </div>
  );
}
