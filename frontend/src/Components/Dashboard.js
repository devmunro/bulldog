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

  return (
    <div className="bg-[#2B2946] h-full flex w-full">
      <div className="w-14">
      <Sidebar />
      </div>
      <div className= "flex-grow ml-4">
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
