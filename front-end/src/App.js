import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from "./components/general/AuthContext/AuthContext"; // Import AuthProvider and AuthContext
import StudentDashboard from "./layouts/StudentDashboard/StudentDashboard";
import LoginPage from "./layouts/LoginPage/LoginPage";
import AdminDashboard from "./layouts/AdminDashboard/AdminDashboard";
import AdminIssueDetails from "./layouts/AdminIssueDetails/AdminIssueDetails";
import UnauthorizedPage from "./layouts/UnauthorizedPage/UnauthorizedPage";

// ProtectedRoute component
const ProtectedRoute = ({ component: Component, requiredRole }) => {
  const { isAuthenticated, userRole, isAuthCheckComplete } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuthCheckComplete) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || userRole !== requiredRole) {
    const attemptedUrl = window.location.pathname.replace(/\/+/g, '/');

    if (!attemptedUrl.startsWith('/unauthorized')) {
      navigate(`/unauthorized${attemptedUrl}`);
    }
    return null;
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
              <Route path="/unauthorized/*" element={<UnauthorizedPage />} />
            </Routes>
          </main>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
