import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Loading from "./Components/Loading";
import RegisterForm from "./Components/UserForms/userRegistration";
import WorkoutPage from "./Components/workoutPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/test" element={<WorkoutPage/>} />
     
      </Routes>
    </div>
  );
}

export default App;
