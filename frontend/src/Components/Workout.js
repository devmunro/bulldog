import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExercise } from "../features/exerciseSlice";

export default function Workout() {
  const dispatch = useDispatch();

  const [exerciseList, setExerciseList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const exercies = async () => {
      await dispatch(fetchExercise()).then((response) => {
        console.log(response.payload);
        setExerciseList(response.payload);
        setLoading(false);
      });
    };
    exercies();
  }, [dispatch]);

  //
  return (
    <div>
      <section className="flex flex-wrap max-w-full">
      {!loading &&
        exerciseList.map((exercise) => {
          return (
            <ul key={exercise.name} className="text-white bg-black w-[30%] m-2 p-4">
              <li>{exercise.name}</li>
              <li>{exercise.type}</li>
              <li>{exercise.difficulty}</li>
              <li>{exercise.instructions}</li>
            </ul>
          );
        })}
        </section>
    </div>
  );
}
