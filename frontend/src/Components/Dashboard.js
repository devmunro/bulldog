import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { Routes, Route } from "react-router-dom";
import Exercises from "./Exercises";
import Overview from "./Overview";
import Workout from "./workout/Workout";
import { useSelector } from "react-redux";


export default function Dashboard() {

  const {userData} =useSelector( (state => state.auth)) 


  return (
    <div className="bg-[#2B2946] h-full flex w-full">
      <Sidebar />
      <div className="flex-col w-full ml-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Overview user={userData} />} />
          <Route path="/exerciselist" element={<Exercises />} />
          <Route path="/workout" element={<Workout />} />
        </Routes>
      </div>
    </div>
  );
}
