import React, { useState } from "react";
import {
  BackspaceIcon,
  BookOpenIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
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
    <div className="fixed min-h-screen flex-col bg-primary">
      <div className="flex justify-between">
        <button className="mt-6 p-4 m-2  text-secondary hover:bg-secondary hover:text-tertiary rounded-2xl " onClick={handleSidebar}>
          {hideSidebar && (
            <ChevronDoubleRightIcon className="md:h-6 md:w-6 h-5 w-5 md:mx-2  " />
          )}
          {!hideSidebar && (
            <ChevronDoubleLeftIcon className="md:h-6 md:w-6 h-5 w-5  md:mx-2 hover:bg-secondary hover:text-tertiary" />
          )}
        </button>
      </div>

      {!hideSidebar && (
        <div className=" ">
          <ul className="mt-16 space-y-16 text-sm text-center text-secondary [&>*]:p-4 [&>*]:m-2 [&>*]:rounded-2xl [&>*]:flex  ">
            <li className="hover:bg-secondary hover:text-tertiary">
              <Link to="/dashboard" className="flex">
                <ComputerDesktopIcon className="md:h-6 md:w-6 h-5 w-5 md:mx-2 mx-1" />
                Overview
              </Link>
            </li>

            <li className="hover:bg-secondary hover:text-tertiary">
              <Link to="/dashboard/exerciselist" className="flex">
                <BookOpenIcon className="md:h-6 md:w-6 h-5 w-5 md:mx-2 mx-1" />
                Exercises
              </Link>
            </li>
            <li className="hover:bg-secondary hover:text-tertiary">
              <Link to="/dashboard/workout" className="flex">
                <DocumentTextIcon className="md:h-6 md:w-6 h-5 w-5 md:mx-2 mx-1" />
                Workout Planner
              </Link>
            </li>
            <li className="hover:bg-secondary hover:text-tertiary">
              <Link to="/dashboard/record" className="flex">
                <TrophyIcon className="md:h-6 md:w-6 h-5 w-5 md:mx-2 mx-1" />
                Start Workout
              </Link>
            </li>
            <li className="hover:bg-secondary hover:text-tertiary">
              <Link to="/dashboard/record" className="flex">
                <BackspaceIcon className="md:h-6 md:w-6 h-5 w-5 md:mx-2 mx-1" />
                Logout
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
        <ul className="mt-16 space-y-16 text-sm text-center text-secondary [&>*]:p-4 [&>*]:m-2 [&>*]:rounded-2xl [&>*]:flex ">
          <li className="hover:bg-secondary hover:text-tertiary">
            <Link to="/dashboard">
              <ComputerDesktopIcon className="md:h-6 md:w-6 h-5 w-5  md:mx-2" />
            </Link>
          </li>

          <li className="hover:bg-secondary hover:text-tertiary">
            <Link to="/dashboard/exerciselist">
              <BookOpenIcon className="md:h-6 md:w-6 h-5 w-5  md:mx-2" />
            </Link>
          </li>
          <li className="hover:bg-secondary hover:text-tertiary">
            <Link to="/dashboard/workout">
              <DocumentTextIcon className="md:h-6 md:w-6 h-5 w-5  md:mx-2" />
            </Link>
          </li>
          <li className="hover:bg-secondary hover:text-tertiarye">
            <Link to="/dashboard/record">
              <TrophyIcon className="md:h-6 md:w-6 h-5 w-5 md:mx-2" />
            </Link>
          </li>
          <li className="hover:bg-secondary hover:text-tertiary">
            <Link to="/dashboard/record" className="flex">
              <BackspaceIcon className="md:h-6 md:w-6 h-5 w-5 md:mx-2 mx-1" />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
