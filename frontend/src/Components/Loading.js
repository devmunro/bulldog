import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Loading({text}) {
  return (
    <div className="flex justify-center space-x-2 w-full">
      <ArrowPathIcon className="fill-white h-6 w-6 animate-spin" />
      <h2 className="text-white">{text || "LOADING..."}</h2>
    </div>
  );
}
