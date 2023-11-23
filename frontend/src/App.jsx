// Import necessary modules
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./UI/Pages/HomePage/HomePage";
import LoginPage from "./UI/Pages/Login/Login"; // Import the Login page
import SignupPage from "./UI/Pages/Signup/Signup"; // Import the Signup page
import ProtectedRoute from "./UI/Components/protectedroute/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
