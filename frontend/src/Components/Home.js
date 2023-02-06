import React, { useState } from "react";
import LoginForm from "./UserForms/userLogin";
import RegisterForm from "./UserForms/userRegistration";

export default function Home() {
  const [showform, setShowForm] = useState(true);
  const handleClick = (e) => {
    e.preventDefault();

    setShowForm(!showform);
  };

  return (
    <div className="h-screen flex items-center justify-center ">
         <div className="w-1/2 lg:w-1/3 ring-4 rounded-t-xl shadow-2xl  ">
        {!showform && <RegisterForm handleClick={handleClick} />}
        {showform && <LoginForm handleClick={handleClick} />}
      </div>
    </div>
  );
}