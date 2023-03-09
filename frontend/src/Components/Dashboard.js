import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Exercises from "./Exercises";
import Overview from "./Overview";
import Workout from "./workout/Workout";
import WorkoutPage from "./workoutPage";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logout } from "../features/userSlice";
import Loading from "./Loading";

export default function Dashboard() {
  const { user, token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("User state:", user);
  console.log("Token state:", token);

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
  }, [token]);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

  return (
    <div className="flex h-full">
      <div className="fixed left-0 top-0 h-full w-10 bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col ml-10 md:ml-14 bg-[#1F2937] h-screen">
        <Navbar  handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Overview user={user} />} />
          <Route path="/exerciselist" element={<Exercises />} />
          <Route path="/workout" element={<Workout user={user} />} />
          <Route path="/record" element={<WorkoutPage user={user} />} />
        </Routes>
      </div>
    </div>
  );
}
