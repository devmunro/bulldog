import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchExercise } from "../../features/exerciseSlice";

export default function ExerciseCatergories({ setLoading, setExerciseList }) {
  const categories = [
    { name: "cardio" },
    { name: "back" },
    { name: "chest" },
    { name: "legs" },
    { name: "shoulders" },
    { name: "arms" },
  ];

  const dispatch = useDispatch();

  const [chosenCategory, setChosenCategory] = useState("cardio");
  const [allExercises, setAllExercises] = useState();
  useEffect(() => {
    const fetchData = async (a) => {
      const response = await dispatch(fetchExercise(a));
      setExerciseList(response.payload);
      setLoading(false);
    };
    fetchData(chosenCategory);
  }, [chosenCategory, dispatch, setExerciseList, setLoading]);

  const handleCategory = (type) => {
    console.log(type);
    setChosenCategory(type);
  };

  return (
    <ul className="lg:w-2/3 hidden md:flex flex-row flex-wrap justify-center items-center text-white text-sm md:text-md">
      {categories.map((item) => {
        return (
          <li
            key={item.name}
            onClick={() => handleCategory(item.name)}
            className="p-1 text-center cursor-pointer"
          >
            {chosenCategory === item.name && (
              <button className="btn-primary text-[10px]">
                <span className="uppercase">{item.name}</span>
              </button>
            )}
            {chosenCategory !== item.name && ( <button className="btn-secondary text-[10px] ">
                <span className="uppercase">{item.name}</span>
              </button>)}
          </li>
        );
      })}
    </ul>
  );
}
