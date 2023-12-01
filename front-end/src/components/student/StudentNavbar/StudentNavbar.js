import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import logoutImage from "../../../assets/images/logout-icon.png";
import notificationIcon from "../../../assets/images/notification-icon.png";
import { AuthContext } from "../../general/AuthContext/AuthContext";
import "./StudentNavbar.css";

export default function StudentNavbar({ studentName }) {
    const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);
    const [notificationData, setNotificationData] = useState(null);
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;

    const fetchNotificationData = async () => {
        console.log("Fetching notification data...");
        try {
            const response = await axios.get(`${BASE_URL}/api/issues/student/${studentName}`, {
                withCredentials: true
            });
            console.log("Fetched Notification Data:", response.data);
            setNotificationData(response.data);
            setShowNotificationOverlay(true);
        } catch (error) {
            console.error('Error fetching notification data:', error);
        }
    };
    const renderNotificationOverlay = () => {
        if (showNotificationOverlay) {
            const actionRequiredIssues = notificationData.filter(issue => issue.currentStatus === "Action Required");
            return (
                <div className="notification-overlay" onClick={() => setShowNotificationOverlay(false)}>
                    {actionRequiredIssues.length > 0 ? (
                        actionRequiredIssues.map((issue, index) => (
                            <div key={index}>
                                <p><strong>Action Required: {issue.title}</strong></p>
                                <p>{issue.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No action required notifications</p>
                    )}
                </div>
            );
        }
 };

 useEffect(() => {
    const handleClickOutside = (event) => {
        const overlay = document.querySelector('.notification-overlay');
        if (showNotificationOverlay && overlay && !overlay.contains(event.target)) {
            setShowNotificationOverlay(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [showNotificationOverlay]);

    const handleLogout = () => {
        axios.get(`${BASE_URL}/api/logout`, { withCredentials: true })
        .then(() => {
          setIsAuthenticated(false);
          navigate('/');
        })
        .catch(error => {
          console.error("Logout error:", error);
        });
    };

    return (
        <div className="header-student-dashboard">
            <p className="h1-student-dashboard">NYUAD ISSUE RESOLUTION</p>
            <div className="student-info">
                <span className="student-name">Hello, {studentName}</span>
                <span className="notification-icon" onClick={fetchNotificationData}>
                    <img src={notificationIcon} alt="Notification" />
                </span>
                <img
                    src={logoutImage}
                    alt="Logout"
                    className="logout-button"
                    onClick={handleLogout}
                />
            </div>
            {renderNotificationOverlay()}
        </div>
    );
}
