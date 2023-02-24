import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchExercise } from "../features/exerciseSlice";
import FirebaseStorage from "../images/firebaseStorage";

export default function ExerciseCatergories({ setLoading, setExerciseList }) {
  const categories = [
    { name: "cardio", image: "006-treadmill.png" },
    { name: "back", image: "002-gym-shoes.png" },
    { name: "chest", image: "003-weightlifting.png" },
    { name: "legs", image: "001-workout.png" },
    { name: "shoulders", image: "004-dumbbell.png" },
    { name: "arms", image: "005-arm.png" },
  ];

  const dispatch = useDispatch();

  const [chosenCategory, setChosenCategory] = useState("cardio");

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
    <div className=" text-white max-w-full m-2 p-4 bg-black">
      <h2 className="font-bold mx-4">Catergories</h2>
      <ul className="flex gap-2 w-full ">
        {categories.map((item) => {
          return (
            <div onClick={() => handleCategory(item.name)} className=" w-full bg-[#2B2946] p-2 m-2 text-center rounded-xl border-2 border-slate-50 hover:bg-white hover:text-black cursor-pointer">
              <button >
                <FirebaseStorage imageBase={item.image} />
                {item.name}
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
