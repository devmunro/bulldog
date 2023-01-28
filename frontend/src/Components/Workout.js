import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExercise } from "../features/exerciseSlice";

export default function Workout() {
  const dispatch = useDispatch();

  const catergories = [
    "cardio",
    "olympic weightlifting",
    "plyometrics",
    "powerlifting",
    "strength",
    "stretching",
    "strongman",
  ];
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
      <div className="bg-black text-white max-w-full m-2">
       <h2 className="font-bold">Catergories</h2>
       <ul className="flex gap-2 w-full ">
        {catergories.map((item) => {
          return (<li className=" w-full">{item}</li>);
        })}
        </ul>
      </div>
      <section className="flex flex-wrap max-w-full bg-black">
        {!loading &&
          exerciseList.map((exercise) => {
            return (
              <ul
                key={exercise.name}
                className="text-white bg-[#2B2946] w-[30%] m-2 p-4"
              >
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
