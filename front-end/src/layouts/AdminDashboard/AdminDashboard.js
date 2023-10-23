import { useState, useEffect, useRef } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
    const [searchText, setSearchText] = useState('');
    const [issues, setIssues] = useState([]);
    const [activeOptionsOverlay, setActiveOptionsOverlay] = useState(null);
    const [isOverlayOptionsOpen, setIsOverlayOptionsOpen] = useState(false);
    const [columnSortOptions, setColumnSortOptions] = useState({});
    const currentDepartment = "IT"; // will change this later sprint

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch('https://hasiburratul.github.io/mock-api/MOCK_DATA_ADMIN.json')
            .then(response => response.json())
            .then(data => setIssues(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Filter issues based on the search text
    const filteredIssues = issues.filter(issue => {
        if (!issue.departments.includes(currentDepartment)) {
            return false;
        }
        if (searchText.startsWith('name:')) {
            const nameQuery = searchText.replace('name:', '').trim().toLowerCase();
            return issue.studentName.toLowerCase().includes(nameQuery);
        } else if (searchText.startsWith('netid:')) {
            const netIDQuery = searchText.replace('netid:', '').trim().toLowerCase();
            return issue.studentNetID === netIDQuery;
        } else if (searchText.startsWith('date:')) {
            const dateQuery = searchText.replace('date:', '').trim();
            return issue.dateCreated === dateQuery;
        } else if (searchText.startsWith('priority')) {
            const priorityQuery = searchText.replace('priority:', '').trim().toLowerCase();
            return issue.currentPriority.toLowerCase() === priorityQuery;
        } else {
            return issue.title.toLowerCase().includes(searchText.toLowerCase());
        }
    });

    /* eslint-disable quote-props */
    // Define the mapping of statuses
    const statusMapping = {
        'Open': 'Not Started',
        'In Progress': 'In Progress',
        'Action Required': 'Awaiting Response',
        'Resolved': 'Resolved'
    };

    const priorityOrder = {
        'Reopened': 1,
        'High Priority': 2,
        'New': 3
    };
    /* eslint-enable quote-props */

    // Custom date parsing function for "dd/mm/yyyy" format
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is 0-based in JavaScript
    };

    const sortByPriorityAndDate = (a, b) => {
        if (a.currentPriority === b.currentPriority) {
            return parseDate(b.dateCreated) - parseDate(a.dateCreated);
        }
        return priorityOrder[a.currentPriority] - priorityOrder[b.currentPriority];
    };

    const sortByPriorityReverse = (a, b) => {
        if (a.currentPriority === b.currentPriority) {
            return parseDate(b.dateCreated) - parseDate(a.dateCreated);
        }
        return priorityOrder[b.currentPriority] - priorityOrder[a.currentPriority];
    };

    const sortByDateAscending = (a, b) => {
        return parseDate(a.dateCreated) - parseDate(b.dateCreated);
    };

    const sortByDate = (a, b) => {
        return parseDate(b.dateCreated) - parseDate(a.dateCreated);
    };

    const getSortingFunctionForColumn = (status) => {
        switch (columnSortOptions[status]) {
            case 'date':
                return sortByDate;
            case 'dateAscending':
                return sortByDateAscending;
            case 'priorityReverse':
                return sortByPriorityReverse;
            default:
                return sortByPriorityAndDate;
        }
    };

    const groupedAndOrderedIssues = Object.entries(statusMapping).map(([oldStatus, newStatus]) => ({
        status: newStatus,
        issues: filteredIssues
            .filter(issue => issue.currentStatus === oldStatus)
            .sort(getSortingFunctionForColumn(newStatus))
    }));

    // Ref for the overlay div
    const overlayRef = useRef(null);

    // Function to close the overlay
    const closeOverlayOptions = () => {
        setActiveOptionsOverlay(null);
        setIsOverlayOptionsOpen(false);
    };

    // Add event listener to handle clicks outside the overlay
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (overlayRef.current && !overlayRef.current.contains(e.target)) {
                closeOverlayOptions();
            }
        };

        if (isOverlayOptionsOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOverlayOptionsOpen]);

    return (
        <div className="adminDashboard">
            <h1>Issue Board</h1>
            <div className="searchBar">
                <form>
                    <input
                        type="text"
                        placeholder="Search by keyword, netid:, name:, date:, priority:"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </form>
            </div>
            <div className="issueColumns">
                {groupedAndOrderedIssues.map(({ status, issues }) => (
                    <div key={status} className="issueColumn">
                        <div className="columnHeader">
                            <span className={`statusCircle ${status.replace(/\s+/g, '').toLowerCase()}`}></span>
                            <h3>{status}</h3>
                            <span className="issueCount">{issues.length}</span>
                            <button
                                className="columnSpecificOverlayButton"
                                onClick={() => {
                                    setActiveOptionsOverlay(status);
                                    setIsOverlayOptionsOpen(true);
                                }}
                            >
                                ...
                            </button>
                            {activeOptionsOverlay === status && isOverlayOptionsOpen && (
                                <div className="columnSpecificOverlay" ref={overlayRef}>
                                    <button onClick={() => {
                                        const updatedSortOptions = { ...columnSortOptions, [status]: 'priority' };
                                        setColumnSortOptions(updatedSortOptions);
                                    }}>
                                        Priority ↑
                                    </button>
                                    <button onClick={() => {
                                        const updatedSortOptions = { ...columnSortOptions, [status]: 'priorityReverse' };
                                        setColumnSortOptions(updatedSortOptions);
                                    }}>
                                        Priority ↓
                                    </button>
                                    <button onClick={() => {
                                        const updatedSortOptions = { ...columnSortOptions, [status]: 'date' };
                                        setColumnSortOptions(updatedSortOptions);
                                    }}>
                                        Date ↑
                                    </button>
                                    <button onClick={() => {
                                        const updatedSortOptions = { ...columnSortOptions, [status]: 'dateAscending' };
                                        setColumnSortOptions(updatedSortOptions);
                                    }}>
                                        Date ↓
                                    </button>
                                </div>
                            )}
                        </div>
                        {issues.map(issue => (
                            <div key={issue.index} className="issueCard">
                                <h4 className='admin-dashboard-studentName'>{issue.studentName} ({issue.studentNetID})</h4>
                                <h4>{issue.title}</h4>
                                <p>{issue.description}</p>
                                <div className={`priorityTag ${issue.currentPriority.toLowerCase().replace(/\s+/g, '')}`}>
                                    {issue.currentPriority}
                                </div>
                                <div className="issueDate">{issue.dateCreated}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="footer-admin-dashboard">
                <p>New York University Abu Dhabi</p>
            </div>
        </div>
    );
}

export default AdminDashboard;
