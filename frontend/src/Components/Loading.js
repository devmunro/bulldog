import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center mt-8 h-screen space-x-2">
      <ArrowPathIcon className="fill-white h-12 w-12 animate-spin" />
      <h2 className="text-white">LOADING...</h2>
    </div>
  );
}
