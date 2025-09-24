import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-100">
        <nav className="flex justify-center gap-6 py-6 bg-white shadow-md">
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-700 hover:text-blue-500"
            }
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-700 hover:text-blue-500"
            }
          >
            Sign Up
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
