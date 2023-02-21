import React, { useState } from "react";
import LoginForm from "./UserForms/userLogin";
import RegisterForm from "./UserForms/userRegistration";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="w-1/2 lg:w-1/3 ring-4 rounded-t-xl shadow-2xl  ">
        <LoginForm />
      </div>
    </div>
  );
}
