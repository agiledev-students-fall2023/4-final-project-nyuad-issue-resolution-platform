import { useState, useEffect, useRef } from 'react';
import './AdminDashboard.css';
import IssueColumn from '../../components/admin/IssueColumn/IssueColumn';
import SearchBarAdmin from '../../components/admin/SearchBarAdmin/SearchBarAdmin';
import {
    sortByPriorityAndDate,
    sortByPriorityReverse,
    sortByDateAscending,
    sortByDate
} from '../../components/admin/helper/sorting/SortingFunctions';
import AdminNavbar from '../../components/admin/AdminNavbar/AdminNavbar';
import SiteWideFooter from '../../components/general/SiteWideFooter/SiteWideFooter';
import axios from "axios";
export const currentSetDepartment = "IT";

function AdminDashboard() {
    const [searchText, setSearchText] = useState('');
    const [issues, setIssues] = useState([]);
    const [activeOptionsOverlay, setActiveOptionsOverlay] = useState(null);
    const [isOverlayOptionsOpen, setIsOverlayOptionsOpen] = useState(false);
    const [unresolvedIssues, setUnresolvedIssues] = useState(0);
    const [columnSortOptions, setColumnSortOptions] = useState({});
    const overlayRef = useRef(null);
    const currentDepartment = currentSetDepartment; // will change this later sprint

    const BASE_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/issues/admin/${currentDepartment}`
                );
                setIssues(response.data);
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000);

        return () => {
            clearInterval(intervalId);
            isMounted = false;
        };
    }, []);

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

    // for future to update the number of unresolved issues
    useEffect(() => {
        setUnresolvedIssues(issues.filter(issue => issue.departments.includes(currentDepartment) && issue.currentStatus !== 'Resolved').length);
    }, [issues]); // every time the issues list changes, update the number of unresolved issues

    // Function to close the overlay
    const closeOverlayOptions = () => {
        setActiveOptionsOverlay(null);
        setIsOverlayOptionsOpen(false);
    };

    // Filter issues based on the search text
    const filteredIssues = issues.filter(issue => {
        if (!issue.departments.includes(currentDepartment)) {
            return false;
        }
        if (searchText.startsWith('name:')) {
            const nameQuery = searchText.replace('name:', '').trim().toLowerCase();
            return issue.studentName.toLowerCase().includes(nameQuery);
        } else if (searchText.startsWith('netid:')) {
            const netIDQuery = searchText.replace('netid:', '').trim();
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
    /* eslint-enable quote-props */

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

    return (
        <>
            <AdminNavbar adminName={currentDepartment} unresolvedIssues={unresolvedIssues} />
            <div className="admin-dashboard">

                {/* <h1 className='admin-dashboard-header'>Issue Board</h1> */}
                <SearchBarAdmin searchText={searchText} onSearchTextChange={setSearchText} />
                <div className="issue-columns-admin">
                    {groupedAndOrderedIssues.map(({ status, issues }) => (
                        <IssueColumn
                            key={status}
                            status={status}
                            issues={issues}
                            activeOptionsOverlay={activeOptionsOverlay}
                            setActiveOptionsOverlay={setActiveOptionsOverlay}
                            setIsOverlayOptionsOpen={setIsOverlayOptionsOpen}
                            columnSortOptions={columnSortOptions}
                            setColumnSortOptions={setColumnSortOptions}
                            overlayRef={overlayRef}
                            isOverlayOptionsOpen={isOverlayOptionsOpen}
                        />
                    ))}
                </div>
            </div>
            <SiteWideFooter />
        </>
    );
}

export default AdminDashboard;
