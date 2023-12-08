import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "./StudentDashboard.css";
import StudentNavbar from "../../components/student/StudentNavbar/StudentNavbar";
import StudentViewFilter from "../../components/student/StudentViewFilter/StudentViewFilter";
import StudentIssueDetails from "../../components/student/StudentIssueOverlay/StudentIssueDetails";
import SiteWideFooter from "../../components/general/SiteWideFooter/SiteWideFooter";
import { CreateRequest } from "../../components/student/CreateRequest/CreateRequest.js";
import { AuthContext } from "../../components/general/AuthContext/AuthContext";

const StudentDashboard = () => {
  const { checkAuthentication, userName, userNetID } = useContext(AuthContext);
  const [notifIssues, setNotifIssues] = useState({});

  useEffect(() => {
    const checkAuthState = async () => {
      await checkAuthentication();
    };
    checkAuthState();
  }, []);

  // State initialization for holding requests and their display variant
  const [allRequests, setAllRequests] = useState([]);
  const [displayedRequests, setDisplayedRequests] = useState([]);

  // State initialization for handling overlay options
  const [isIssueOverlayOpen, setIsIssueOverlayOpen] = useState(false);
  const [request, setRequest] = useState(null);

  // State initialization for tracking window width and adjusting display
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Other state initializations for UI functionalities
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = windowWidth <= 768 ? 10 : 9;
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latestFirst");
  const [isCreateRequestVisible, setIsCreateRequestVisible] = useState(false);

  // my additions
  // end

  const selectIssue = (issueIndex) => {
    setRequest(issueIndex); // Assuming 'setRequest' updates the state to show issue details
    setIsIssueOverlayOpen(true); // Open the overlay to show the issue details
  };

  // API
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const applyCurrentFilters = (newData) => {
    let filteredData = newData;

    if (selectedDepartment !== "") {
      filteredData = filteredData.filter((request) =>
        request.departments.includes(selectedDepartment)
      );
    }

    if (selectedStatus !== "") {
      filteredData = filteredData.filter(
        (request) => request.currentStatus === selectedStatus
      );
    }

    if (searchQuery !== "") {
      filteredData = filteredData.filter((request) =>
        request.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredData;
  };

  useEffect(() => {
    const checkAuthState = async () => {
      await checkAuthentication();
    };
    checkAuthState();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/issues/student/${userNetID}`,
          {
            withCredentials: true
          }
        );

        const sortedData = response.data;
        if (sortOrder === "latestFirst") {
          sortedData.sort(
            (a, b) => parseDate(b.dateCreated) - parseDate(a.dateCreated)
          );
        } else {
          sortedData.sort(
            (a, b) => parseDate(a.dateCreated) - parseDate(b.dateCreated)
          );
        }

        if (isMounted) {
          setAllRequests(sortedData);
          const filteredData = applyCurrentFilters(sortedData);
          setDisplayedRequests(filteredData);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data from API:", error);
        }
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
      isMounted = false;
    };
  }, [selectedDepartment, selectedStatus, searchQuery, sortOrder]);

  // Event listener to track window resizing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <th className="date-created-header">
              Date Created
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

  // Ref for the overlay div
  const overlayRef = useRef(null);

  // Function to close the overlay
  const closeIssueOverlay = () => {
    setIsIssueOverlayOpen(false);
  };

  // Add event listener to handle clicks outside the overlay
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        closeIssueOverlay();
      }
    };

    if (isIssueOverlayOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isIssueOverlayOpen]);

  // Add event listener to handle clicks outside the overlay
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        handleCreateRequest();
      }
    };

    if (isCreateRequestVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCreateRequestVisible]);

  useEffect(() => {
    console.log("All requests", allRequests);
    setNotifIssues(
      allRequests
        .filter((request) => request.currentStatus === "Action Required")
        .map((request) => ({
          index: request.index,
          title: request.title
        }))
    );
  }, [allRequests]);

  useEffect(() => {
    console.log("Notif issues", notifIssues);
  }, [notifIssues]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Action Required":
        return "status-action-required";
      case "Resolved":
        return "status-closed";
      case "In Progress":
        return "status-in-progress";
      case "Open":
        return "status-open";
      default:
        return "";
    }
  };

  // Custom date parsing function for "dd/mm/yyyy" format
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); // Month is 0-based in JavaScript
  };

  const sortRequests = (order) => {
    const sortedRequests = [...displayedRequests];

    if (order === "latestFirst") {
      sortedRequests.sort(
        (a, b) => parseDate(b.dateCreated) - parseDate(a.dateCreated)
      );
    } else if (order === "oldestFirst") {
      sortedRequests.sort(
        (a, b) => parseDate(a.dateCreated) - parseDate(b.dateCreated)
      );
    }

    setDisplayedRequests(sortedRequests);
  };

  const toggleSortOrder = () => {
    const newSortOrder =
      sortOrder === "latestFirst" ? "oldestFirst" : "latestFirst";
    setSortOrder(newSortOrder);
    sortRequests(newSortOrder);
  };

  // Renders list of requests for display
  const renderRequests = () => {
    return paginatedRequests().map((request, index) => {
      const truncatedDescription = request.description.split("\n")[0] + "...";

      if (windowWidth <= 768) {
        return (
          <tr
            key={index}
            onClick={() => {
              setIsIssueOverlayOpen(true);
              setRequest(request.index);
            }}
          >
            <td className="title-cell-mobile">{request.title}</td>
            <td>
              <span
                className={`status-box ${getStatusClass(
                  request.currentStatus
                )}`}
                onClick={() => {
                  setIsIssueOverlayOpen(true);
                  setRequest(request.index);
                }}
              >
                {request.currentStatus}
              </span>
            </td>
          </tr>
        );
      } else {
        // The Overlay popup is triggered by clicking on the title or description
        // It is only for Desktop view for now
        return (
          <tr key={index}>
            <td
              className="title-cell"
              onClick={() => {
                setIsIssueOverlayOpen(true);
                setRequest(request.index);
              }}
            >
              {request.title}
            </td>

            <td
              className="description-cell"
              onClick={() => {
                setIsIssueOverlayOpen(true);
                setRequest(request.index);
              }}
            >
              {truncatedDescription}
            </td>

            <td
              className="departments-cell"
              onClick={() => {
                setIsIssueOverlayOpen(true);
                setRequest(request.index);
              }}
            >
              {request.departments.map((department, index) => (
                <span key={index} className="department-pill">
                  {mapDepartmentToDisplayName(department)}
                </span>
              ))}
            </td>
            <td
              className="date-created-cell"
              onClick={() => {
                setIsIssueOverlayOpen(true);
                setRequest(request.index);
              }}
            >
              {request.dateCreated}
            </td>
            <td
              onClick={() => {
                setIsIssueOverlayOpen(true);
                setRequest(request.index);
              }}
            >
              <span
                className={`status-box ${getStatusClass(
                  request.currentStatus
                )}`}
              >
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
      filteredRequests = filteredRequests.filter(
        (request) => request.currentStatus === selectedStatus
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
      filteredRequests = filteredRequests.filter(
        (request) => request.currentStatus === status
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
    setIsCreateRequestVisible(!isCreateRequestVisible);
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
        {"«"}
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
        {"»"}
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
    <>
      <div
        className={`requests ${
          isIssueOverlayOpen || isCreateRequestVisible ? "blur-background" : ""
        }`}
      >
        <StudentNavbar
          studentName={userName}
          onIssueSelect={selectIssue}
          notifIssues={notifIssues}
        />
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
            <button className="button-student-dashboard" onClick={handleSearch}>
              Search
            </button>
          </div>

          <StudentViewFilter
            filterHandler={handleFilterByDepartment}
            selectedOption={selectedDepartment}
            options={departmentOptions}
          />
          <StudentViewFilter
            filterHandler={handleFilterByStatus}
            selectedOption={selectedStatus}
            options={statusOptions}
          />

          <div className="create-request-button">
            <button
              className="button-student-dashboard"
              onClick={handleCreateRequest}
            >
              Create Request +
            </button>
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
      </div>
      {isCreateRequestVisible && (
        <div className="create-request-overlay" ref={overlayRef}>
          <CreateRequest
            isVisible={isCreateRequestVisible}
            onClose={handleCreateRequest}
            departmentOptions={departmentOptions}
            studentName={userName}
            studentNetID={userNetID}
          />
        </div>
      )}
      {/* The Overlay popup is triggered by clicking on the title or description */}
      {/* It is only for Desktop view for now */}
      {isIssueOverlayOpen && (
        <div className="issueOverlay" ref={overlayRef}>
          <button
            className="closeButton issue-buttons"
            onClick={closeIssueOverlay}
          >
            X
          </button>

          <StudentIssueDetails studentNetID={userNetID} index={request} />
        </div>
      )}
      <SiteWideFooter />
    </>
  );
};

export default StudentDashboard;
