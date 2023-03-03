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
    <div className="fixed min-h-screen flex-col text-gray-400 bg-black">
      <div className="flex justify-between">
        {!hideSidebar && (
          <h1 className="text-white mt-6 md:ml-10 ml-2 px-2 font-bold">BULLDOG</h1>
        )}
        <button className="mt-6 px-2 " onClick={handleSidebar}>
          {hideSidebar && (
            <ChevronDoubleRightIcon className="md:h-6 md:w-6 h-5 w-5 text-white-500 md:mx-2 hover:text-white" />
          )}
          {!hideSidebar && (
            <ChevronDoubleLeftIcon className="md:h-6 md:w-6 h-5 w-5 text-white-500 md:mx-2 hover:text-white" />
          )}
        </button>
      </div>

      {!hideSidebar && (
        <div className=" ">
          <ul className="mt-10 md:ml-5 ml-2 space-y-3 text-sm text-left [&>*]:p-2  [&>*]:rounded-l-2xl [&>*]:flex">
            <li className="hover:bg-[#2B2946] hover:text-white">
              <Link to="/dashboard" className="flex">
                <ComputerDesktopIcon className="md:h-6 md:w-6 h-5 w-5 text-white-500 md:mx-2 mx-1" />
                Overview
              </Link>
            </li>

            <li className="hover:bg-[#2B2946] hover:text-white">
              <Link to="/dashboard/exerciselist" className="flex">
                <BookOpenIcon className="md:h-6 md:w-6 h-5 w-5 text-white-500 md:mx-2 mx-1" />
                Exercises
              </Link>
            </li>
            <li className="hover:bg-[#2B2946] hover:text-white">
              <Link to="/dashboard/workout" className="flex">
                <TrophyIcon className="md:h-6 md:w-6 h-5 w-5 text-white-500 md:mx-2 mx-1" />
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
              <ComputerDesktopIcon className="md:h-6 md:w-6 h-5 w-5 text-white-500 md:mx-2" />
            </Link>
          </li>

          <li className="hover:bg-[#2B2946] hover:text-white">
            <Link to="/dashboard/exerciselist">
              <BookOpenIcon className="md:h-6 md:w-6 h-5 w-5 text-white-500 md:mx-2" />
            </Link>
          </li>
          <li className="hover:bg-[#2B2946] hover:text-white">
            <Link to="/dashboard/workout">
              <TrophyIcon className="md:h-6 md:w-6 h-5 w-5 text-white-500 md:mx-2" />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
