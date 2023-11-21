import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logoutImage from "../../../assets/images/logout-icon.png";
import notificationIcon from "../../../assets/images/notification-icon.png";
import axios from "axios";
import "./StudentNavbar.css";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default function StudentNavbar({ studentName, setIsAuthenticated }) {
    const [notificationTimer, setNotificationTimer] = useState(null);
    const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);
    // const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    // Handles notification click to display a notification overlay
    const handleNotificationClick = () => {
        setShowNotificationOverlay(true);

        if (notificationTimer) {
            clearTimeout(notificationTimer);
        }
        // Timer for overlay
        const timerId = setTimeout(() => {
            setShowNotificationOverlay(false);
        }, 5000);

        setNotificationTimer(timerId);
    };

    // TODO: Sync the notification overlay
    const renderNotificationOverlay = () => {
        if (showNotificationOverlay) {
            return (
                <div className="notification-overlay">
                    <p>No new notifications</p>
                </div>
            );
        }
    };

    const handleLogout = () => {
        axios.get(`${BASE_URL}/api/logout`, { withCredentials: true })
        .then(() => {
          setIsAuthenticated(false); // Update state to reflect that user is logged out
          // Redirect to login page or perform other actions as needed
          navigate('/');
        })
        .catch(error => {
          console.error("Logout error:", error);
          // Handle error
        });
    };

    return (
        <div className="header-student-dashboard">
            <p className="h1-student-dashboard">NYUAD ISSUE RESOLUTION</p>
            <div className="student-info">
                <span className="student-name">Hello, {studentName}</span>
                <span className="notification-icon" onClick={handleNotificationClick}>
                    {/* 🔔 */}
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
