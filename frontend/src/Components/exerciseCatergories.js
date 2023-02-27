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
  const [currentPage, setCurrentPage] = useState(1);
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(4);
  const [pageSize, setPageSize] = useState(4);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 668) {
        setSliceStart(0);
        setSliceEnd(2);
        setPageSize(2);
      } else {
        setSliceStart(0);
        setSliceEnd(4);
        setPageSize(4);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startIndex = (currentPage - 1) * pageSize + sliceStart;
  const endIndex = startIndex + pageSize;
  const displayedCategories = categories.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (startIndex === 0) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (endIndex >= 5) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  return (
    <div className=" text-white w-full m-2 p-2 bg-black">
      <h2 className="font-bold mx-4">Catergories</h2>
      <div className="flex w-full  items-center">
        <button onClick={handlePreviousPage}>B</button>
        <ul className="w-full md:mx-4 md:px-4 px-4 grid grid-cols-2 lg:grid-cols-4 gap-2 h-32 overflow-hidden">
          {displayedCategories.map((item) => {
            return (
              <li
                onClick={() => handleCategory(item.name)}
                className="w-full bg-[#2B2946] p-2 m-2 text-center rounded-xl border-2 border-slate-50 hover:bg-white hover:text-black cursor-pointer"
              >
                <button>
                  <FirebaseStorage imageBase={item.image} />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
        <button onClick={handleNextPage}>N</button>
      </div>
    </div>
  );
}
