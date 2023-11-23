import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from "./components/general/AuthContext/AuthContext"; // Import AuthProvider and AuthContext
import StudentDashboard from "./layouts/StudentDashboard/StudentDashboard";
import IssueDetails from "./components/student/StudentIssueOverlay/DesktopIssueDetails";
import LoginPage from "./layouts/LoginPage/LoginPage";
import AdminDashboard from "./layouts/AdminDashboard/AdminDashboard";
import AdminIssueDetails from "./components/admin/AdminIssueDetails/AdminIssueDetails";

// ProtectedRoute component
const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(AuthContext); // Use AuthContext to get isAuthenticated

  return (
    isAuthenticated
      ? <Component />
      : <Navigate to="/" />
  );
};

const App = () => {
  return (
    <AuthProvider> {/* Wrap the application in AuthProvider */}
      <div className="App">
        <Router>
          <main className="App-main">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/student/dashboard" element={<ProtectedRoute component={StudentDashboard} />} />
              <Route path="/issue/:index" element={<ProtectedRoute component={IssueDetails} />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
              <Route path="/admin/dashboard/:index" element={<ProtectedRoute component={AdminIssueDetails} />} />
            </Routes>
          </main>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
