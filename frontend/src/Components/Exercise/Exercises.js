import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import ExerciseCatergories from "./exerciseCatergories";

import ExerciseList from "./ExerciseList";
import { getAllExercises } from "../../features/exerciseSlice";

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
      console.log(response);
      if (response) {
        setCompleteExercises(response.payload);
        setSearchList(response.payload);
      }
    };

    getAll();
  }, []);

  const handleSearch = (e) => {
    console.log(`Searching for "${searchTerm}"`);
    console.log(exerciseList);
    const searchExercises = completeExercises.filter((word) => {
      const nameMatch = word.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const bodyTypeMatch = word.body_type.some((type) =>
        type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return nameMatch || bodyTypeMatch;
    });
    setExerciseList(searchExercises);
    setCompleteExercises(searchList);
    setSearchTerm("");
    console.log(searchExercises);
  };
  return (
    <div className="flex justify-center flex-col h-full defaultFont">
      <div className="w-full">
            <h2 className=" pb-4 text-sm md:text-lg font-bold ">Exercises</h2>
          </div>
      <div className="bg-white w-full lg:flex gap-2 p-4 items-center rounded-xl">
        {/* SEARCH BAR */}
        <div className="lg:w-1/3 flex items-center justify-center">
          <input
            className="px-2 w-full md:h-12 h-8 rounded-2xl md:text-sm text-xs bg-secondary text-tertiary "
            placeholder="Search for an exercise"
            onChange={handleSearchChange}
            value={searchTerm}
            onKeyDown={(event) => event.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} className="">
            <span className="sr-only">Search</span>
            <MagnifyingGlassCircleIcon className="h-8 bg-primary text-white flex justify-center rounded-full hover:bg-black m-4" />
          </button>
        </div>

        {/* Catergories  */}

        <ExerciseCatergories
          setExerciseList={setExerciseList}
          setLoading={setLoading}
        />
      </div>
      {/* // LIST */}
      <ExerciseList
        loading={loading}
        exerciseList={exerciseList}
        buttonText="Add"
      />
    </div>
  );
}
