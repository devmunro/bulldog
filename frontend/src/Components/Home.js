import React, { useState } from "react";
import LoginForm from "./UserForms/userLogin";
import RegisterForm from "./UserForms/userRegistration";

export default function Home() {


  const [showform, setShowForm] = useState(true)
const handleClick = (e) => {
e.preventDefault()

setShowForm(!showform)

}

  return (
    <div className="h-screen">
      <div className="bg-[#2B2946] h-1/2"></div>
      <div className="bg-black h-1/2"></div>
      <div className="absolute bg-blue-500 inset-40 ring-4 shadow-2xl flex	">
        <button onClick={handleClick} className="bg-black">login</button>
        {!showform && <RegisterForm />}
      {showform &&  <LoginForm />}
      </div>
    </div>
  );
}
