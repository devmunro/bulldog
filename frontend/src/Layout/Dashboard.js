import React, { useEffect } from "react";
import Sidebar from "./Sidebar"; // import the Sidebar component
import Navbar from "./Navbar"; // import the Navbar component
import { Routes, Route, useNavigate } from "react-router-dom"; // import necessary components from react-router-dom
import Exercises from "../Components/Exercise/Exercises"; // import the Exercises component
import Overview from "../Components/Overview"; // import the Overview component
import Workout from "../Components/workout/Planner"; // import the Workout component
import WorkoutPage from "../Components/workout/workoutPage"; // import the WorkoutPage component
import { useDispatch, useSelector } from "react-redux"; // import useDispatch and useSelector from react-redux
import { getUserDetails, logout } from "../features/userSlice"; // import getUserDetails and logout from ../features/userSlice
import Loading from "../Components/Loading"; // import the Loading component
import { resetWorkout } from "../features/exerciseSlice";

export default function Dashboard() {
  const { user, token, loading } = useSelector((state) => state.auth); // select user, token and loading from the state using useSelector
  const dispatch = useDispatch(); // use dispatch to dispatch actions to the store
  const navigate = useNavigate(); // useNavigate is a hook that returns a navigate function to navigate to a different route

  console.log(user);
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
  }, [token, dispatch]);

  const handleLogout = (e) => {
    e.preventDefault(); // prevent the default behaviour of the form
    dispatch(logout()); // dispatch the logout action to log the user out
    dispatch(resetWorkout());
  };

  return (
    <div className="bg-primary min-h-screen">
      {!user ? (
        <Loading hScreen={"h-screen"}/>
      ) : (
        <>
          <div className=" flex w-full">
            <Sidebar handleLogout={handleLogout} />
            <div className="bg-secondary my-4 md:m-4 w-full rounded-2xl md:p-4 p-2">
              <Routes>
                <Route path="/" element={<Overview user={user} />} />
                <Route path="/exerciselist" element={<Exercises />} />
                <Route path="/workout" element={<Workout user={user} />} />
                <Route path="/record" element={<WorkoutPage user={user} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
