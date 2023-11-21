// import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 /* eslint-disable */
import { useEffect, useState } from "react";
/* eslint-enable */
import "./App.css";
import StudentDashboard from "./layouts/StudentDashboard/StudentDashboard";
import IssueDetails from "./components/student/StudentIssueOverlay/DesktopIssueDetails";
import LoginPage from "./layouts/LoginPage/LoginPage.js";
import AdminDashboard from "./layouts/AdminDashboard/AdminDashboard";
import AdminIssueDetails from "./components/admin/AdminIssueDetails/AdminIssueDetails";

const App = (props) => {
  /* eslint-disable */
  const [isAuthenticated, setIsAuthenticated] = useState("");
  /* eslint-enable */
  // const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/student/dashboard" element={<StudentDashboard setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/issue/:index" element={<IssueDetails />} />
            <Route path="admin/dashboard" element={<AdminDashboard setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="admin/dashboard/:index" element={<AdminIssueDetails />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
