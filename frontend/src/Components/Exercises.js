import { useState } from "react";
import ExerciseCatergories from "./exerciseCatergories";

export default function Exercises() {
  const [exerciseList, setExerciseList] = useState();
  const [loading, setLoading] = useState(true);
 
  //
  return (
    <div>
      <ExerciseCatergories setExerciseList={setExerciseList} setLoading={setLoading}/>
      <section className="flex flex-wrap max-w-full bg-black">
        {!loading &&
          exerciseList.map((exercise) => {
            return (
              <ul
                key={exercise.id}
                className="text-white bg-[#2B2946] w-[30%] m-2 p-4"
              >
                <img className="bg-white" src={exercise.gifUrl} alt={exercise.name}/>
                <li>{exercise.name}</li>
                <li>{exercise.equipment}</li>

              </ul>
            );
          })}
      </section>
    </div>
  );
}
