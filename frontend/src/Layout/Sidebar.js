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

export default function Sidebar({handleLogout}) {
  const [hideSidebar, setHideSideBar] = useState(true);

  const handleSidebar = () => {
    setHideSideBar(!hideSidebar);
  };

  return (
    <div className="flex-col">
      <ul className="  lg:block hidden  mt-16 space-y-16 text-sm text-center text-secondary [&>*]:p-4 [&>*]:m-2 [&>*]:rounded-2xl [&>*]:flex  ">
        <li className="hover:bg-secondary hover:text-tertiary">
          <Link to="/dashboard" className="flex">
            <ComputerDesktopIcon className="h-6 w-6 mx-2 " />
            Overview
          </Link>
        </li>

        <li className="hover:bg-secondary hover:text-tertiary">
          <Link to="/dashboard/exerciselist" className="flex">
            <BookOpenIcon className="h-6 w-6 mx-2 " />
            Exercises
          </Link>
        </li>
        <li className="hover:bg-secondary hover:text-tertiary">
          <Link to="/dashboard/workout" className="flex">
            <DocumentTextIcon className="h-6 w-6 mx-2 " />
            Planner
          </Link>
        </li>
        <li className="hover:bg-secondary hover:text-tertiary">
          <Link to="/dashboard/record" className="flex">
            <TrophyIcon className="h-6 w-6 mx-2 " />
            Workout
          </Link>
        </li>
        <li className="hover:bg-secondary hover:text-tertiary">
          <Link to="/dashboard/record" className="flex" onClick={handleLogout}>
            <BackspaceIcon className="h-6 w-6 mx-2 " />
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

      <ul className=" block lg:hidden mt-16 space-y-16 text-sm text-center text-secondary [&>*]:p-4 [&>*]:my-2 [&>*]:rounded-2xl [&>*]:flex ">
        <li className="hover:bg-secondary hover:text-tertiary">
          <Link to="/dashboard">
            <ComputerDesktopIcon className="h-5 w-5  " />
          </Link>
        </li>

        <li className="hover:bg-secondary hover:text-tertiary">
          <Link to="/dashboard/exerciselist">
            <BookOpenIcon className="h-5 w-5 " />
          </Link>
        </li>
        <li className="hover:bg-secondary hover:text-tertiary">
          <Link to="/dashboard/workout">
            <DocumentTextIcon className="h-5 w-5 " />
          </Link>
        </li>
        <li className="hover:bg-secondary hover:text-tertiary">
          <Link to="/dashboard/record">
            <TrophyIcon className="h-5 w-5 " />
          </Link>
        </li>
        <li className="hover:bg-secondary hover:text-tertiary">
          <Link to="/dashboard/record" className="flex" onClick={handleLogout}>
            <BackspaceIcon className="h-5 w-5 " />
          </Link>
        </li>
      </ul>
    </div>
  );
}
