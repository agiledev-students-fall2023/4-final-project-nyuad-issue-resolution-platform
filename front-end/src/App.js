// import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StudentDashboard from "./layouts/StudentDashboard/StudentDashboard";
import IssueDetails from "./components/student/StudentIssueOverlay/DesktopIssueDetails";
import LoginPage from "./layouts/LoginPage/LoginPage.js";
import AdminDashboard from "./layouts/AdminDashboard/AdminDashboard";

import AdminIssueOverlay from "./components/admin/AdminIssueOverlay/AdminIssueOverlay";

const App = (props) => {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/issue/:index" element={<IssueDetails />} />
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/dashboard/:index" element={<AdminIssueOverlay />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
