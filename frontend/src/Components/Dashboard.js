import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { Routes, Route } from "react-router-dom";
import Workout from "./Workout";
import Overview from "./Overview";

export default function Dashboard() {
  return (
    <div className="bg-[#2B2946] h-full flex w-screen">
      <Sidebar />
      <div className="flex-col w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/workout" element={<Workout />} />
        </Routes>
      </div>
    </div>
  );
}
