import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Dashboard() {
  return (
    <div className="bg-[#2B2946] h-screen flex w-screen">
      <Sidebar />
      <div className="flex-col w-full">
        <Navbar />
        <div>Dashboard stuff</div>
      </div>
    </div>
  );
}
