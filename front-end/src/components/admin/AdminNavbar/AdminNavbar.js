import { useNavigate } from 'react-router-dom';
import logoutImage from "../../../assets/images/logout-icon.png";
import "./AdminNavbar.css";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default function AdminNavbar({ adminName, unresolvedIssues, setIsAuthenticated }) {
    // const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get(`${BASE_URL}/api/logout`, { withCredentials: true })
        .then(() => {
          setIsAuthenticated(false); // Update state to reflect that user is logged out
          // Redirect to login page or perform other actions as needed
        })
        .catch(error => {
          console.error("Logout error:", error);
          // Handle error
        });
        navigate('/');
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
