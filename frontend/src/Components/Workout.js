import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExercise } from "../features/exerciseSlice";

export default function Workout() {
  const dispatch = useDispatch();

  const exercies = async () => {
    await dispatch(fetchExercise()).then((response) => {
      console.log(response);
    });
  };

  // exercies()
  return <div>yo</div>;
}
