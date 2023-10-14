import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";
import logoutImage from "./logout.png";

const StudentDashboard = () => {
  // State initialization for holding requests and their display variant
  const [allRequests, setAllRequests] = useState([]);
  const [displayedRequests, setDisplayedRequests] = useState([]);

  // API
  const apiUrl = "https://hasiburratul.github.io/mock-api/MOCK_DATA.json";

  // Fetch data from the API
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setAllRequests(data);
        setDisplayedRequests(data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, [apiUrl]);

  // State initialization for tracking window width and adjusting display
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Event listener to track window resizing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Renders table header based on window width
  const renderTableHeader = () => {
    if (windowWidth <= 768) {
      return (
        <thead>
          <tr>
            <th>Title</th>
            <th>Current Status</th>
          </tr>
        </thead>
      );
    } else {
      return (
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Departments</th>
            <th>Date Created/ Reopened</th>
            <th>Current Status</th>
          </tr>
        </thead>
      );
    }
  };

  // Renders list of requests for display
  const renderRequests = () => {
    return paginatedRequests().map((request, index) => {
      const truncatedTitle = request.title.split(" ").slice(0, 5).join(" ");

      const truncatedDescription = request.description.split("\n")[0];

      if (windowWidth <= 768) {
        return (
          <tr key={index}>
            <td>
              <Link to={`/issue/${request.index}`} className="issue-link">
                {truncatedTitle}
              </Link>
            </td>

            <td>{request.currentStatus}</td>
          </tr>
        );
      } else {
        return (
          <tr key={index}>
            <td>
              <Link to={`/issue/${request.index}`} className="issue-link">
                {truncatedTitle}
              </Link>
            </td>
            <td>{truncatedDescription}</td>
            <td>
              {request.departments.map(mapDepartmentToDisplayName).join(", ")}
            </td>
            <td>{request.dateCreated}</td>
            <td>{request.currentStatus}</td>
          </tr>
        );
      }
    });
  };

  // Department options for filtering purposes
  const departmentOptions = [
    { value: "", label: "Filter by Department(s)" },
    { value: "IT", label: "IT" },
    { value: "Admin", label: "Admin" },
    { value: "Library", label: "Library" },
    { value: "Facilities", label: "Facilities" },
    { value: "Registrar", label: "Registrar" },
    { value: "Health", label: "Health Center" },
    { value: "Finance", label: "Student Finance" },
    { value: "GlobalEd", label: "Global Education" },
    { value: "ResEd", label: "Residential Education" },
    { value: "CDC", label: "Career Development Center" },
  ];

  // Other state initializations for UI functionalities
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = windowWidth <= 768 ? 15 : 6;
  const [studentName, setStudentName] = useState("John Doe");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTimer, setNotificationTimer] = useState(null);
  const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);

  // Handles search functionality to filter displayed requests
  const handleSearch = () => {
    let filteredRequests = allRequests;

    if (selectedDepartment !== "") {
      filteredRequests = filteredRequests.filter((request) =>
        request.departments.includes(selectedDepartment)
      );
    }

    filteredRequests = filteredRequests.filter((request) =>
      request.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setDisplayedRequests(filteredRequests);
    setCurrentPage(1);
  };

  // Handles department-based filtering
  const handleFilterByDepartment = (event) => {
    const selectedDept = event.target.value;
    setSelectedDepartment(selectedDept);
    setCurrentPage(1);

    let filteredRequests = allRequests;

    if (selectedDept !== "") {
      filteredRequests = filteredRequests.filter((request) =>
        request.departments.includes(selectedDept)
      );
    }

    if (searchQuery !== "") {
      filteredRequests = filteredRequests.filter((request) =>
        request.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayedRequests(filteredRequests);
  };

  // Placeholder for the "Create Request" functionality
  const handleCreateRequest = () => {
    // TODO: Implement create request functionality
  };

  // Placeholder for the "Logout" functionality
  const handleLogout = () => {
    // TODO: Implement logout logic
  };

  // Handles pagination and page switching
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Paginates displayed requests based on current page and items per page
  const paginatedRequests = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return displayedRequests.slice(startIndex, startIndex + itemsPerPage);
  };

  // Renders pagination buttons for navigating requests
  const renderPagination = () => {
    const totalPages = Math.ceil(displayedRequests.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

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

  // Converts a department value to its display name
  const mapDepartmentToDisplayName = (departmentValue) => {
    switch (departmentValue) {
      case "IT":
        return "IT";
      case "Admin":
        return "Admin";
      case "Library":
        return "Library";
      case "Facilities":
        return "Facilities";
      case "Registrar":
        return "Registrar";
      case "Health":
        return "Health Center";
      case "Finance":
        return "Student Finance";
      case "GlobalEd":
        return "Global Education";
      case "ResEd":
        return "Residential Education";
      case "CDC":
        return "Career Development Center";
      default:
        return departmentValue;
    }
  };

  return (
    <div className="requests">
      <div className="header">
        <h1>NYUAD Issue Resolution Portal</h1>
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
      </div>
      {renderNotificationOverlay()}
      <h2>Your Requests</h2>
      <div className="actions">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="filter-bar">
          <select
            onChange={handleFilterByDepartment}
            value={selectedDepartment}
          >
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="create-request-button">
          <button onClick={handleCreateRequest}>Create Request +</button>
        </div>
      </div>
      <div className="table">
        <table>
          {renderTableHeader()}
          <tbody>{renderRequests()}</tbody>
        </table>
      </div>
      <div className="pagination">{renderPagination()}</div>
      <div className="footer">
        <p>New York University Abu Dhabi</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
