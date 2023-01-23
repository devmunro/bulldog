import './App.css';
import { Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Route path='/Dashboard' element={<Dashboard/>}></Route>
      </Router>
     
    </div>
  );
}

export default App;
