import React, { useState } from "react";
import {
  BookOpenIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ComputerDesktopIcon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [hideSidebar, setHideSideBar] = useState(true);

  const handleSidebar = () => {
    setHideSideBar(!hideSidebar);
  };

  return (
    <div className="min-h-screen flex-col text-gray-400 bg-black">
      <div className="flex justify-between">
        {!hideSidebar && (
          <h1 className="text-white mt-6 ml-10 px-2 font-bold">BULLDOG</h1>
        )}
        <button className="mt-6 px-2 " onClick={handleSidebar}>
          {hideSidebar && (
            <ChevronDoubleRightIcon className="h-6 w-6 text-white-500 mx-2  hover:text-white" />
          )}
          {!hideSidebar && (
            <ChevronDoubleLeftIcon className="h-6 w-6 text-white-500 mx-2 hover:text-white" />
          )}
        </button>
      </div>

      {!hideSidebar && (
        <div className="min-w-[228px] ">
          <ul className="mt-10 ml-5 space-y-3 text-sm text-left [&>*]:p-2  [&>*]:rounded-l-2xl [&>*]:flex">
            <li className="hover:bg-[#2B2946] hover:text-white">
              <Link to="/dashboard" className="flex">
                <ComputerDesktopIcon className="h-6 w-6 text-white-500 mx-2" />
                Overview
              </Link>
            </li>

            <li className="hover:bg-[#2B2946] hover:text-white">
              <Link to="/dashboard/exerciselist" className="flex">
                <BookOpenIcon className="h-6 w-6 text-white-500 mx-2" />
                Exercises
              </Link>
            </li>
            <li className="hover:bg-[#2B2946] hover:text-white">
              <Link to="/dashboard/workout" className="flex">
                <TrophyIcon className="h-6 w-6 text-white-500 mx-2" />
                Workout
              </Link>
            </li>
            {/* <li className="hover:bg-[#2B2946] hover:text-white">
          <UsersIcon className="h-6 w-6 text-white-500 mx-2" />
          Social
        </li> */}
            {/* <li className="hover:bg-[#2B2946] hover:text-white">
          <ChartBarIcon className="h-6 w-6 text-white-500 mx-2" />
          Stats
        </li> */}
          </ul>
        </div>
      )}
      {hideSidebar && (
        <ul className="mt-10 space-y-3 text-sm text-left [&>*]:p-2  [&>*]:rounded-2xl">
          <li className="hover:bg-[#2B2946] hover:text-white">
            <Link to="/dashboard">
              <ComputerDesktopIcon className="h-6 w-6 text-white-500 mx-2" />
            </Link>
          </li>

          <li className="hover:bg-[#2B2946] hover:text-white">
            <Link to="/dashboard/exerciselist">
              <BookOpenIcon className="h-6 w-6 text-white-500 mx-2" />
            </Link>
          </li>
          <li className="hover:bg-[#2B2946] hover:text-white">
            <Link to="/dashboard/workout">
              <TrophyIcon className="h-6 w-6 text-white-500 mx-2" />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
