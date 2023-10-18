import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";
import logoutImage from "../../assets/images/logout.png";

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
        const sortedData = data.sort((a, b) => parseDate(b.dateCreated) - parseDate(a.dateCreated));
        setAllRequests(sortedData);
        setDisplayedRequests(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, [apiUrl]);

  // State initialization for tracking window width and adjusting display
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Other state initializations for UI functionalities
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = windowWidth <= 768 ? 15 : 10;
  const [studentName, setStudentName] = useState("John Doe");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTimer, setNotificationTimer] = useState(null);
  const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);
  const [sortOrder, setSortOrder] = useState("latestFirst");

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
            <th className="date-created-header">Date Created
              <button onClick={() => toggleSortOrder()} className="sort-button">
                {sortOrder === "latestFirst" ? "↑" : "↓"}
              </button>
            </th>
            <th>Current Status</th>
          </tr>
        </thead>
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Action Required':
        return 'status-action-required';
      case 'Resolved':
        return 'status-closed';
      case 'In Progress':
        return 'status-in-progress';
      case 'Open':
        return 'status-open';
      default:
        return '';
    }
  };

  // Custom date parsing function for "dd/mm/yyyy" format
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Month is 0-based in JavaScript
  };

  const sortRequests = (order) => {
    const sortedRequests = [...displayedRequests];

    if (order === "latestFirst") {
      sortedRequests.sort((a, b) => parseDate(b.dateCreated) - parseDate(a.dateCreated));
    } else if (order === "oldestFirst") {
      sortedRequests.sort((a, b) => parseDate(a.dateCreated) - parseDate(b.dateCreated));
    }

    setDisplayedRequests(sortedRequests);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "latestFirst" ? "oldestFirst" : "latestFirst";
    setSortOrder(newSortOrder);
    sortRequests(newSortOrder);
  };

  // Renders list of requests for display
  const renderRequests = () => {
    return paginatedRequests().map((request, index) => {
      const truncatedDescription = request.description.split("\n")[0] + "...";

      if (windowWidth <= 768) {
        return (
          <tr key={index}>
            <td className="title-cell-mobile">
              <Link to={`/issue/${request.index}`} className="issue-link">
                {request.title}
              </Link>
            </td>
            <td>
              <span className={`status-box ${getStatusClass(request.currentStatus)}`}>
                {request.currentStatus}
              </span>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={index}>
            <td className="title-cell">
              <Link to={`/issue/${request.index}`} className="issue-link">
                {request.title}
              </Link>
            </td>
            <td className="description-cell">
              <Link to={`/issue/${request.index}`} className="issue-link">
                {truncatedDescription}
              </Link>
            </td>
            <td className="departments-cell">
              {request.departments.map((department, index) => (
                <span key={index} className="department-pill">
                  {mapDepartmentToDisplayName(department)}
                </span>
              ))}
            </td>
            <td className="date-created-cell">
              {request.dateCreated}
            </td>
            <td>
              <span className={`status-box ${getStatusClass(request.currentStatus)}`}>
                {request.currentStatus}
              </span>
            </td>
          </tr>
        );
      }
    });
  };

  // Department options for filtering purposes
  const departmentOptions = [
    { value: "", label: "Filter by Department" },
    { value: "IT", label: "IT" },
    { value: "Admin", label: "Admin" },
    { value: "Library", label: "Library" },
    { value: "Facilities", label: "Facilities" },
    { value: "Registrar", label: "Registrar" },
    { value: "Health", label: "Health Center" },
    { value: "Finance", label: "Student Finance" },
    { value: "GlobalEd", label: "Global Education" },
    { value: "ResEd", label: "Residential Education" },
    { value: "CDC", label: "Career Development Center" }
  ];

  const statusOptions = [
    { value: "", label: "Filter by Status" },
    { value: "Action Required", label: "Action Required" },
    { value: "Resolved", label: "Resolved" },
    { value: "In Progress", label: "In Progress" },
    { value: "Open", label: "Open" }
  ];

  // Handles search functionality to filter displayed requests
  const handleSearch = () => {
    let filteredRequests = allRequests;

    if (selectedDepartment !== "") {
      filteredRequests = filteredRequests.filter((request) =>
        request.departments.includes(selectedDepartment)
      );
    }

    if (selectedStatus !== "") {
      filteredRequests = filteredRequests.filter((request) =>
        request.currentStatus === selectedStatus
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
    filterRequests(selectedDept, selectedStatus, searchQuery);
  };

  const handleFilterByStatus = (event) => {
    const selectedStat = event.target.value;
    setSelectedStatus(selectedStat);
    setCurrentPage(1);
    filterRequests(selectedDepartment, selectedStat, searchQuery);
  };

  // Function to filter requests based on department, status, and search query
  const filterRequests = (department, status, query) => {
    let filteredRequests = allRequests;

    if (department !== "") {
      filteredRequests = filteredRequests.filter((request) =>
        request.departments.includes(department)
      );
    }

    if (status !== "") {
      filteredRequests = filteredRequests.filter((request) =>
        request.currentStatus === status
      );
    }

    if (query !== "") {
      filteredRequests = filteredRequests.filter((request) =>
        request.title.toLowerCase().includes(query.toLowerCase())
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

    pages.push(
      <button
        key="backward"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'«'}
      </button>
    );

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageButton(i));
      }
    } else {
      // Always display 1st page
      pages.push(renderPageButton(1));
      if (currentPage > 3) {
        pages.push(<span key="ellipsis-start">...</span>);
      }
      if (currentPage > 2) {
        pages.push(renderPageButton(currentPage - 1));
      }
      if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(renderPageButton(currentPage));
      }
      if (currentPage < totalPages - 1) {
        pages.push(renderPageButton(currentPage + 1));
      }
      if (currentPage < totalPages - 2) {
        pages.push(<span key="ellipsis-end">...</span>);
      }
      pages.push(renderPageButton(totalPages));
    }

    pages.push(
      <button
        key="forward"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'»'}
      </button>
    );

    return pages;
  };

  const renderPageButton = (pageNumber) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={pageNumber === currentPage ? "active" : ""}
      >
        {pageNumber}
      </button>
    );
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
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
      </div>
      {renderNotificationOverlay()}
      <h2 className="h2-student-dashboard">Your Requests</h2>
      <div className="actions">
        <div className="search-bar">
          <input
            className="input-student-dashboard"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="button-student-dashboard" onClick={handleSearch}>Search</button>
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
        <div className="filter-bar">
          <select
            onChange={handleFilterByStatus}
            value={selectedStatus}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="create-request-button">
          <button className="button-student-dashboard" onClick={handleCreateRequest}>Create Request +</button>
        </div>
      </div>
      <div className="table">
        <table className="table-student-dashboard">
          {renderTableHeader()}
          <tbody>{renderRequests()}</tbody>
        </table>
      </div>
      <div className="pagination">
        <div className="pagination-box">{renderPagination()}</div>
      </div>
      <div className="footer-student-dashboard">
        <p>New York University Abu Dhabi</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
