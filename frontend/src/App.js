import { Routes, Route } from "react-router-dom";
import Dashboard from "./Layout/Dashboard.js"
import Home from "./Components/Home";
import Loading from "./Components/Loading";
import RegisterForm from "./Components/UserForms/userRegistration";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/loading" element={<Loading />} />
        
     
      </Routes>
    </div>
  );
}

export default App;
