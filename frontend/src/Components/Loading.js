import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center mt-8 h-screen space-x-2 w-full">
      <ArrowPathIcon className="fill-black h-12 w-12 animate-spin" />
      <h2 className="text-black ">LOADING...</h2>
    </div>
  );
}
