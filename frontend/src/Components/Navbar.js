import React from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <div className="flex justify-around m-4 text-white">
      <h2 className="m-2 font-bold">Dashboard</h2>
      
    <div className="w-1/2 flex">
      <MagnifyingGlassCircleIcon className="w-10 h-full fill-inherit"/>
      <input className="px-2 rounded-2xl bg-[#19192C] text-[#7B7B8F] " placeholder="Search for an exercise"/>
      </div>
    </div>
  );
}
