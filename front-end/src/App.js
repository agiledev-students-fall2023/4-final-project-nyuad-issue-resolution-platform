import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import StudentDashboard from "./StudentDashboard";
import IssueDetails from "./IssueDetails";

const App = (props) => {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/issue/:index" element={<IssueDetails />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
