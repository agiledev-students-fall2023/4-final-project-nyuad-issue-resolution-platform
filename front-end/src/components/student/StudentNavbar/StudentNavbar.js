/*eslint-disable*/
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoutImage from "../../../assets/images/logout-icon.png";
import notificationIcon from "../../../assets/images/notification-icon.png";
import { AuthContext } from "../../general/AuthContext/AuthContext";
import "./StudentNavbar.css";

export default function StudentNavbar({
  studentName,
  onIssueSelect,
  notifIssues
}) {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [displayNotifOverlay, setDisplayNotifOverlay] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const handleIssueClick = (issueIndex) => {
    if (onIssueSelect) {
      onIssueSelect(issueIndex); // Call the passed function with the index of the clicked issue
    }
  };

  const actionRequiredCount = notifIssues.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        displayNotifOverlay &&
        !event.target.closest(".notification-overlay")
      ) {
        setDisplayNotifOverlay(!displayNotifOverlay);
      }
    };
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [displayNotifOverlay]);

  const renderNotificationOverlay = () => {
    return displayNotifOverlay ? (
      <>
      <div class="notification-overlay-arrow-up"></div>
      <div className="notification-overlay">
        
        <div className="scrollable-content">
          {notifIssues.length > 0 ? (
            notifIssues.map((issue, index) => (
              <button
                className="issue-button"
                key={index}
                onClick={() => handleIssueClick(issue.index)}
              >
                <p>
                  <span className="action-req-text">Action Required: </span>{issue.title}
                </p>
              </button>
            ))
          ) : (
            <p>No action required notifications</p>
          )}
        </div>
      </div>
      </>
    ) : null;
  };

  const handleLogout = () => {
    axios
      .get(`${BASE_URL}/api/logout`, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="header-student-dashboard">
      <p className="h1-student-dashboard">NYUAD ISSUE RESOLUTION</p>
      <div className="student-info">
        <span className="student-name">Hello, {studentName}</span>
        <span
          className="notification-icon"
          onClick={() => setDisplayNotifOverlay(!displayNotifOverlay)}
        >
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
