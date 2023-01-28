import React from "react";
import {
  ComputerDesktopIcon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


export default function Sidebar() {
  return (
    <div className=" min-w-[228px] fixed min-h-full flex-col text-gray-400 bg-black">
      <h1 className="text-white m-6 text-center font-bold">BULLDOG</h1>
      <ul className="mt-10 ml-5 space-y-3 text-sm text-left [&>*]:p-2  [&>*]:rounded-l-2xl [&>*]:flex">
        <li className="hover:bg-[#2B2946] hover:text-white">
          <Link to="/dashboard" className="flex">
          <ComputerDesktopIcon className="h-6 w-6 text-white-500 mx-2" />
          Overview
          </Link>
        </li>
        {/* <li className="hover:bg-[#2B2946] hover:text-white">
          <UsersIcon className="h-6 w-6 text-white-500 mx-2" />
          Social
        </li> */}
        <li className="hover:bg-[#2B2946] hover:text-white">
          <Link to="/dashboard/workout" className="flex">
          <TrophyIcon className="h-6 w-6 text-white-500 mx-2" />
          Workout
          </Link>
        </li>
        {/* <li className="hover:bg-[#2B2946] hover:text-white">
          <ChartBarIcon className="h-6 w-6 text-white-500 mx-2" />
          Stats
        </li> */}
      </ul>
    </div>
  );
}
