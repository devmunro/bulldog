import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Exercises from "./Exercises";
import Overview from "./Overview";
import Workout from "./workout/Workout";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../features/userSlice";
import Loading from "./Loading";

export default function Dashboard() {
  const { user, token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //check if authorised
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [navigate, token]);

  //find user
  useEffect(() => {
    if (token !== null) {
      dispatch(getUserDetails());
    }
  }, [dispatch, token]);
  
  return (
    <div className="bg-[#2B2946] h-full flex w-full">
      <Sidebar />
      <div className="flex-col w-full ml-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Overview user={user} />} />
          <Route path="/exerciselist" element={<Exercises />} />
          <Route path="/workout" element={<Workout user={user} />} />
        </Routes>
      </div>
    </div>
  );
}
