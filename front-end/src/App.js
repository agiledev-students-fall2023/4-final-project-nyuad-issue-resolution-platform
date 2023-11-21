import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import StudentDashboard from "./layouts/StudentDashboard/StudentDashboard";
import IssueDetails from "./components/student/StudentIssueOverlay/DesktopIssueDetails";
import LoginPage from "./layouts/LoginPage/LoginPage.js";
import AdminDashboard from "./layouts/AdminDashboard/AdminDashboard";
import AdminIssueDetails from "./components/admin/AdminIssueDetails/AdminIssueDetails";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true" // Retrieve initial state from local storage
  );
  const [error, setError] = useState("");
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/check-auth`, { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(response.data.authenticated);
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        setError(`An error occurred during authentication: ${error.message}`);
        setIsAuthenticated(false);
      });
  }, [BASE_URL]);

  const updateIsAuthenticated = (value) => {
    setIsAuthenticated(value);
    localStorage.setItem("isAuthenticated", value); // Persist state to local storage
  };

  const ProtectedRoute = ({ component: Component, ...rest }) => (
    isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />
  );

  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<LoginPage setIsAuthenticated={updateIsAuthenticated} />} />
            <Route path="/student/dashboard" element={<ProtectedRoute component={StudentDashboard} />} />
            <Route path="/issue/:index" element={<ProtectedRoute component={IssueDetails} />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
            <Route path="/admin/dashboard/:index" element={<ProtectedRoute component={AdminIssueDetails} />} />
          </Routes>
        </main>
      </Router>
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
