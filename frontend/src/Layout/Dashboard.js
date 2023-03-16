import React, { useEffect } from "react";
import Sidebar from "./Sidebar"; // import the Sidebar component
import Navbar from "./Navbar"; // import the Navbar component
import { Routes, Route, useNavigate } from "react-router-dom"; // import necessary components from react-router-dom
import Exercises from "../Components/Exercise/Exercises"; // import the Exercises component
import Overview from "../Components/Overview"; // import the Overview component
import Workout from "../Components/workout/Workout";// import the Workout component
import WorkoutPage from "../Components/workout/workoutPage"; // import the WorkoutPage component
import { useDispatch, useSelector } from "react-redux"; // import useDispatch and useSelector from react-redux
import { getUserDetails, logout } from "../features/userSlice"; // import getUserDetails and logout from ../features/userSlice
import Loading from "../Components/Loading"; // import the Loading component

export default function Dashboard() {
  const { user, token, loading } = useSelector((state) => state.auth); // select user, token and loading from the state using useSelector
  const dispatch = useDispatch(); // use dispatch to dispatch actions to the store
  const navigate = useNavigate(); // useNavigate is a hook that returns a navigate function to navigate to a different route

  console.log("User state:", user);
  console.log("Token state:", token);

  //check if authorised
  useEffect(() => {
    if (token === null) {
      navigate("/"); // if token is null, navigate to the home page
    }
  }, [navigate, token]);

  //find user
  useEffect(() => {
    if (token !== null) {
      dispatch(getUserDetails()); // if token is not null, dispatch the getUserDetails action to fetch the user details
    }
  }, [token]);

  const handleLogout = (e) => {
    e.preventDefault(); // prevent the default behaviour of the form

    dispatch(logout()); // dispatch the logout action to log the user out
  };

  return (
    <div className="flex h-full">
      <div className="fixed left-0 top-0 h-full w-10 bg-gray-800">
        {/* // render the Sidebar component */}
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col ml-10 md:ml-14 bg-[#1F2937] h-full">
        {/* // render the Navbar component with handleLogout prop */}
        <Navbar handleLogout={handleLogout} />
        <Routes>
          {/* // render the Overview component when path is "/" */}
          <Route path="/" element={<Overview user={user} />} />
          {/* // render the Overview component when path is "/" */}
          <Route path="/exerciselist" element={<Exercises />} />
          {/* // render the Workout component when path is "/workout" */}
          <Route path="/workout" element={<Workout user={user} />} />
          {/* // render the WorkoutPage component when path is "/record" */}
          <Route path="/record" element={<WorkoutPage user={user} />} />
        </Routes>
      </div>
    </div>
  );
}
