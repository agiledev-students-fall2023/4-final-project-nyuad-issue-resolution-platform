import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from "./components/general/AuthContext/AuthContext"; // Import AuthProvider and AuthContext
import StudentDashboard from "./layouts/StudentDashboard/StudentDashboard";
import LoginPage from "./layouts/LoginPage/LoginPage";
import AdminDashboard from "./layouts/AdminDashboard/AdminDashboard";
import AdminIssueDetails from "./layouts/AdminIssueDetails/AdminIssueDetails";

// ProtectedRoute component
const ProtectedRoute = ({ component: Component, requiredRole }) => {
  const { isAuthenticated, userRole, isAuthCheckComplete } = useContext(AuthContext);

  if (!isAuthCheckComplete) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/"/>;
  }

  return <Component />;
};

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <main className="App-main">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/student/dashboard" element={<ProtectedRoute component={StudentDashboard} requiredRole="student" />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} requiredRole="admin" />} />
              <Route path="/admin/dashboard/:index" element={<ProtectedRoute component={AdminIssueDetails} requiredRole="admin" />} />
            </Routes>
          </main>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
