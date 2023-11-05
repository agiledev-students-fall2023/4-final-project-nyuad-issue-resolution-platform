import { useNavigate } from 'react-router-dom';
import logoutImage from "../../../assets/images/logout-icon.png";
import "./AdminNavbar.css";

export default function AdminNavbar({ adminName, unresolvedIssues }) {
  //    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
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
