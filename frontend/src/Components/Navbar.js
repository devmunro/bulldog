import React from "react";

import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logoutUser = await dispatch(logout());
    console.log("loggin out user:", logoutUser);
    navigate("/");
  };

  return (
    <div className="flex justify-around m-4 text-white">
      <h2 className="m-2 font-bold">Dashboard</h2>

      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}
