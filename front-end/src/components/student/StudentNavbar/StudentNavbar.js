import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logoutImage from "../../../assets/images/logout.png";
import "./StudentNavbar.css";

export default function StudentNavbar({ studentName }) {
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
        navigate('/');
    };

    return (
        <div className="header-student-dashboard">
            <h1 className="h1-student-dashboard">NYUAD Issue Resolution Portal</h1>
            <div className="student-info">
                <span className="student-name">Hello, {studentName}</span>
                <span className="notification-icon" onClick={handleNotificationClick}>
                    🔔
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
