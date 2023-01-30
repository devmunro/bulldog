import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExercise } from "../features/exerciseSlice";
import FirebaseStorage from "../images/firebaseStorage";

export default function Workout() {
  const dispatch = useDispatch();

  const categories = [
    { name: "cardio", image: "006-treadmill.png" },
    { name: "olympic weightlifting", image: "" },
    { name: "plyometrics", image: "002-gym-shoes.png" },
    { name: "powerlifting", image: "003-weightlifting.png" },
    { name: "strength", image: "001-workout.png" },
    { name: "stretching", image: "004-dumbbell.png" },
    { name: "strongman", image: "005-arm.png" },
  ];

  const [exerciseList, setExerciseList] = useState();
  const [loading, setLoading] = useState(true);
  const [chosenCategory, setChosenCategory] = useState("cardio");

  useEffect(() => {
    const fetchData = async (a) => {
      setLoading(true);
      const response = await dispatch(fetchExercise(a));
      console.log(a);
      console.log(response);
      setExerciseList(response.payload);
      setLoading(false);
    };
    fetchData(chosenCategory);
  }, [chosenCategory, dispatch]);

  const handleCategory = (e) => {
    e.preventDefault();
    setChosenCategory(e.target.value);
  };
  //
  return (
    <div>
      <div className="bg-black text-white max-w-full m-2">
        <h2 className="font-bold">Catergories</h2>
        <ul className="flex gap-2 w-full ">
          {categories.map((item) => {
            return (
              <div>
                <button
                  onClick={handleCategory}
                  value={item.name}
                  className=" w-full"
                >
                  {item.name}
                </button>
                <FirebaseStorage imageBase={item.image}/>
              </div>
            );
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
