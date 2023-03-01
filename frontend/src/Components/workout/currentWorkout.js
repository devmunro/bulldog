import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ExerciseList from "../ExerciseList";
import {
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
  } from "@heroicons/react/24/solid";
  import FirebaseStorage from "../../images/firebaseStorage";
  import Loading from "../Loading";  


export default function CurrentWorkout() {
    const [showExerciseForWorkout, setShowExerciseForWorkout] = useState(false);
    const {defaultWorkout, loading, currentWorkout } = useSelector((state) => state.fitness);
   
 //handleShowExercises - display exercises for current workout

    const handleShowExercises = (e) => {
        e.preventDefault();
    
        setShowExerciseForWorkout(!showExerciseForWorkout);
      };

 
    

    return (
    <div className="w-full text-black bg-gradient-to-bl from-blue-700 via-blue-800 to-gray-900">
      {/* SHOW OR HIDE EXERCISES */}
      <div className="flex justify-between h-1/2 items-center gap-4 text-gray-400">
        <div className="mt-8 mx-8 space-y-4">
          <h2 className="font-bold">Current Workout</h2>
          <h2 className=" text-3xl font-semibold">
            {currentWorkout.name.toUpperCase()}
          </h2>
          <button className="items-baseline btn-secondary" onClick={handleShowExercises}>
            {showExerciseForWorkout && (
              <div className="flex">
                <span>HIDE</span>
                <ChevronDoubleUpIcon className="h-6 w-6 text-white-500 mx-2" />
              </div>
            )}
            {!showExerciseForWorkout && (
              <div className="flex">
                <span>SHOW</span>
                <ChevronDoubleDownIcon className="h-6 w-6 text-white-500 ml-2" />
              </div>
            )}
          </button>
        </div>
        <div className="opacity-25">
          <FirebaseStorage imageBase="manworkingout.png" />
        </div>
      </div>
      {showExerciseForWorkout && (
        <ExerciseList
          exerciseList={currentWorkout.exercises}
          loading={loading}
          buttonText="Edit"
          isDisabled
        />
      )}
    </div>
  );
}
