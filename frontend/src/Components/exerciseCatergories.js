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
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="  text-white lg:w-full w-2/3 my-4 md:p-2 p-1 bg-black">
        <h2 className="hidden md:block font-bold text-lg md:text-xl mb-4">
          Categories
        </h2>
        <div className="flex w-full items-center justify-center ">
          <button
            onClick={handlePreviousPage}
            className="hidden md:block px-2 py-1 mr-2 rounded-md bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handlePreviousPage}
            className="md:hidden px-2 py-2 rounded-md bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            {"<"}
          </button>
          <ul className="w-2/3 md:mx-4 md:px-4 items-center grid grid-cols-2 lg:grid-cols-4 h-24 md:h-32 overflow-hidden">
            {displayedCategories.map((item) => {
              return (
                <li
                  key={item.name}
                  onClick={() => handleCategory(item.name)}
                  className=" flex justify-center w-full p-2 mb-4 text-center rounded-xl md:border-2 border-slate-50 hover:border-transparent hover:bg-gray-900 hover:shadow-md cursor-pointer"
                >
                  <button className="text-base font-medium ">
                    <FirebaseStorage imageBase={item.image} alt={item.name} />
                    <span className="hidden md:block mt-2">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            onClick={handleNextPage}
            className="hidden md:block px-2 py-1 ml-2 rounded-md bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
          <div className="md:hidden flex-1"></div>

          <button
            onClick={handleNextPage}
            className="md:hidden px-2 py-2 rounded-md bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
