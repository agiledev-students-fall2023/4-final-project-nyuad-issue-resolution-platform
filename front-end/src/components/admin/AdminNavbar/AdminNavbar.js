import { useContext } from 'react'; // Import useContext
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../general/AuthContext/AuthContext"; // Import AuthContext
import logoutImage from "../../../assets/images/logout-icon.png";
import "./AdminNavbar.css";
import axios from "axios";

export default function AdminNavbar({ adminName, unresolvedIssues }) {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext); // Use AuthContext
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;

    const handleLogout = () => {
        axios.get(`${BASE_URL}/api/logout`, { withCredentials: true })
        .then(() => {
          setIsAuthenticated(false); // Update state to reflect that user is logged out
          navigate('/'); // Redirect to login page
        })
        .catch(error => {
          console.error("Logout error:", error);
          // Handle error
        });
    };

    return (
        <div className="header-admin-dashboard">
            <p className="h1-admin-dashboard">NYUAD ISSUE RESOLUTION</p>
            <div className="admin-info">
                <span className="admin-name">Hello, {adminName}</span>
                <span className="unresolved-issues">{unresolvedIssues}</span>

                <img
                    src={logoutImage}
                    alt="Logout"
                    className="logout-button"
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
}
