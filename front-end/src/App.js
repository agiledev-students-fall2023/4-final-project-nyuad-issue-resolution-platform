// import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StudentDashboard from "./layouts/StudentDashboard/StudentDashboard";
import IssueDetails from "./components/student/IssueDetails";
import LoginPage from "./layouts/LoginPage/LoginPage.js";
import AdminDashboard from "./layouts/AdminDashboard/AdminDashboard";

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
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
