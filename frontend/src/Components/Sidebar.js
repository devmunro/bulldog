import React from "react";
import {
  ComputerDesktopIcon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { ChartBarIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <div className="w-[20%] h-screen flex-col text-gray-400 bg-black">
      <h1 className="text-white p-5 text-center font-bold">BULLDOG</h1>
      <ul className="mt-10 ml-5 space-y-3 text-sm text-left [&>*]:p-2  [&>*]:rounded-l-2xl [&>*]:flex">
        <li className="hover:bg-[#2B2946] hover:text-white">
          <ComputerDesktopIcon className="h-6 w-6 text-white-500 mx-2" />
          Overview
        </li>
        <li className="hover:bg-[#2B2946] hover:text-white">
          <UsersIcon className="h-6 w-6 text-white-500 mx-2" />
          Social
        </li>
        <li className="hover:bg-[#2B2946] hover:text-white">
          <TrophyIcon className="h-6 w-6 text-white-500 mx-2" />
          Workout
        </li>
        <li className="hover:bg-[#2B2946] hover:text-white">
          <ChartBarIcon className="h-6 w-6 text-white-500 mx-2" />
          Stats
        </li>
      </ul>
    </div>
  );
}
