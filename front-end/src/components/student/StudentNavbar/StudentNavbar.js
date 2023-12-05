import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import logoutImage from "../../../assets/images/logout-icon.png";
import notificationIcon from "../../../assets/images/notification-icon.png";
import { AuthContext } from "../../general/AuthContext/AuthContext";
import "./StudentNavbar.css";

export default function StudentNavbar({ studentName, studentnetID, onIssueSelect }) {
    const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);
    const [notificationData, setNotificationData] = useState(() => {
        const savedNotifications = localStorage.getItem('notifications');
        return savedNotifications ? JSON.parse(savedNotifications) : [];
    });
    const [displayedCount, setDisplayedCount] = useState(2);
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const actionRequiredCount = notificationData.filter(issue => issue.currentStatus === "Action Required").length;

    const loadMore = (event) => {
        event.stopPropagation();
        setDisplayedCount(prevCount => prevCount + 2); // load 2 more items
    };

    const handleIssueClick = (issueIndex) => {
        if (onIssueSelect) {
            onIssueSelect(issueIndex); // Call the passed function with the index of the clicked issue
        }
    };

    const fetchNotificationData = async () => {
        console.log("Fetching notification data...");
        try {
            const response = await axios.get(`${BASE_URL}/api/issues/student/${studentnetID}`, {
                withCredentials: true
            });
            console.log("Fetched Notification Data:", response.data);
            setNotificationData(response.data);
            localStorage.setItem('notifications', JSON.stringify(response.data));
            setShowNotificationOverlay(true);
        } catch (error) {
            console.error('Error fetching notification data:', error);
        }
    };

    const oneMonthAgo = new Date(); // assuming relevant issues are the ones that recquire action from one month ago
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 5);
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    const renderNotificationOverlay = () => {
        if (showNotificationOverlay) {
            const actionRequiredIssues = notificationData
            .filter(issue => issue.currentStatus === "Action Required")
            .sort((a, b) => parseDate(b.dateCreated) - parseDate(a.dateCreated))
            .slice(0, displayedCount);

            return (
                <div className="notification-overlay" onClick={() => setShowNotificationOverlay(false)}>
                    <div className="scrollable-content">
                        {actionRequiredIssues.length > 0 ? (
                            actionRequiredIssues.map((issue, index) => (
                                <button className= "issue-button" key={index} onClick={() => handleIssueClick(issue.index)}>
                                    <p><strong>Action Required: {issue.title}</strong></p>
                                </button>
                            ))
                        ) : (
                            <p>No action required notifications</p>
                        )}
                    </div>

                    {displayedCount === actionRequiredIssues.length && (
                        <button className="load-more-button" onClick={loadMore}>Load More</button>
                    )}
                </div>
            );
        }
 };

 useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
        setNotificationData(JSON.parse(savedNotifications));
    }

    // Set interval for periodic updates
    const intervalId = setInterval(fetchNotificationData, 60000);

    const handleClickOutside = (event) => {
        const overlay = document.querySelector('.notification-overlay');
        if (showNotificationOverlay && overlay && !overlay.contains(event.target)) {
            setShowNotificationOverlay(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        clearInterval(intervalId);
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
                    {actionRequiredCount > 0 && (
                    <span className="notification-count">{actionRequiredCount}</span>
                )}
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
