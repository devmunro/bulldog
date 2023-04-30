import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Loading({text, hScreen, textColor}) {
  return (
    <div className={`flex justify-center items-center space-x-2 w-full ${hScreen} text-white bg-primary`}>
      <ArrowPathIcon className="fill-white h-6 w-6 animate-spin" />
      <h2>{text || "LOADING..."}</h2>
    </div>
  );
}
