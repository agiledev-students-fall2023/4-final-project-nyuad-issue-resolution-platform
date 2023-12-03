import { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentIssueDetails.css';

const useToast = () => {
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (message) => {
        setToastMessage(message);
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
        }, 3000); // Toast will disappear after 3 seconds
    };

    return { isToastVisible, toastMessage, showToast };
};

const StudentIssueDetails = ({ studentNetID, index }) => {
    const [issue, setIssue] = useState(null);
    const [comment, setComment] = useState('');
    // const [comments, setComments] = useState([]); // Assuming comments is an array
    const [changeOccured, setChangeOccured] = useState(false); // To force a re-render
    const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;
    // New state for tracking comment submission
    const [commentSubmitted, setCommentSubmitted] = useState(false);
    const { isToastVisible, toastMessage, showToast } = useToast(); // Using the custom hook

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const submitComment = async (e) => {
        e.preventDefault(); // Prevent the default form submit action
        if (comment.trim()) {
            try {
                console.log("Current Status: ", issue.currentStatus === 'Action Required');
                console.log("Is Proposed: ", issue.isProposed === false);
                // If the issue is not proposed and the current status is "Action Required", change the status to "In Progress"
                if (issue.isProposed === false && issue.currentStatus === 'Action Required') {
                    const response = await axios
                    .post(
                        `${BACKEND_BASE_URL}/api/actions/student/${studentNetID}/${index}`,
                        {
                            comments: comment,
                            currentStatus: 'In Progress'
                        }
                    );
                    console.log('Comment submitted successfully:', response.data);
                 } else {
                    const response = await axios
                    .post(
                        `${BACKEND_BASE_URL}/api/actions/student/${studentNetID}/${index}`,
                        {
                            comments: comment
                        }
                    );
                    console.log('Comment submitted successfully:', response.data);
                }
                // setChangeOccured(!changeOccured);
                // You can add more logic here depending on your needs
                // For example, clear the comment field or update the UI to show the new comment
            } catch (error) {
                console.error('Error submitting comment:', error.response ? error.response.data : error.message);
                // Handle the error accordingly
            }
        setComment('');
        setChangeOccured(!changeOccured);
        setCommentSubmitted(true); // Set the comment submitted flag
        }
        // else {
        //     console.error('Comment cannot be empty');
        //     // You might want to show a user-friendly error message here
        // }
    };

    const postMarkAsResolved = async () => {
        try {
          await axios.post(
            `${BACKEND_BASE_URL}/api/actions/student/${studentNetID}/${index}`,
          {
            currentPriority: "New",
            currentStatus: "Resolved",
            isProposed: false
        });
        } catch (error) {
          console.error('Error during form submission:', error);
        }
    };

    const postMarkAsRejected = async () => {
        try {
          await axios.post(
            `${BACKEND_BASE_URL}/api/actions/student/${studentNetID}/${index}`,
          {
            currentPriority: "Reopened",
            currentStatus: "In Progress",
            isProposed: false
        });
        } catch (error) {
          console.error('Error during form submission:', error);
        }
    };

    const postReopen = async (event) => {
        try {
          await axios.post(
            `${BACKEND_BASE_URL}/api/actions/student/${studentNetID}/${index}`,
          {
            currentPriority: "Reopened",
            currentStatus: "Open"
        });
        } catch (error) {
          console.error('Error during form submission:', error);
        }
    };

    // Might change implementation to passing data by props from the previous page
    useEffect(() => {
        // const apiUrl = "https://hasiburratul.github.io/mock-api/MOCK_DATA.json";
        // fetch(apiUrl)
        //     .then(response => response.json())
        //     .then(data => {
        //         const specificIssue = data[parseInt(index - 1)];
        //         setIssue(specificIssue);
        //     })
        //     .catch(error => {
        //         console.error("Error fetching the issue data: ", error);
        //     });

            // let isMounted = true; // flag to check if component is mounted - to prevent memory leaks

            // Define `fetchData` as an asynchronous function.
            const fetchData = async () => {
                try {
                // Attempt to make an HTTP GET request using axios.
                const response = await axios.get(
                    `${BACKEND_BASE_URL}/api/issues/student/${studentNetID}/${index}`
                );
                // If the request is successful, take the first item from the response data
                // (assuming the response data is an array) and update the `issue` state with it.
                setIssue(response.data[0]);
                // Log to the console that the data was fetched successfully.
                console.log("Fetched Data");
                // Also log the entire response for debugging purposes.
                console.log(response);
                } catch (error) {
                // If an error occurs during the fetch operation, log it to the console.
                console.error("Error fetching data from API:", error);
                }
            };
            // Call `fetchData` to execute the data fetching operation.
            fetchData();
            // The empty array `[]` as a second argument to useEffect indicates that
            // this effect should only run once when the component mounts.
            // The `index` in the dependency array means the effect will re-run
            // every time the `index` changes.
        }, [index, changeOccured]);

    const reopenIssue = async () => {
        // setIssue({ ...issue, currentStatus: 'Open' });
        await postReopen();
        setChangeOccured(!changeOccured);
        setIssue({ ...issue, currentStatus: issue.currentStatus });
    };

    const acceptResolution = async () => {
        // if (commentSubmitted) { // Check if a comment has been submitted
            await postMarkAsResolved();
            setChangeOccured(!changeOccured);
            setIssue({ ...issue, currentStatus: issue.currentStatus });
            // setCommentSubmitted(false); // Reset the comment submission flag
        // } else {
        //     showToast("⚠️ Please submit a comment before accepting the resolution");
        // }
    };

    const rejectResolution = async () => {
        if (commentSubmitted) { // Check if a comment has been submitted
            await postMarkAsRejected();
            setChangeOccured(!changeOccured);
            setIssue({ ...issue, currentStatus: issue.currentStatus });
            setCommentSubmitted(false); // Reset the comment submission flag
        } else {
            showToast("⚠️ Please submit a comment before rejecting the resolution");
        }
    };

    if (!issue) {
        return <p>Loading issue data...</p>;
    }

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
    // // hardcoded attachments for testing
    // issue.attachments = [
    //     "attachment 1",
    //     "attachment 2",
    //     "attachment 3"
    // ];
    return (

        <div className="student-issue-view">
            {/* {renderIssueOverlay()} */}
            <h2>{issue.title}</h2>
            <div className="issue-content">

                <div className='leftside-section'>
                    <div className="issue-history-section">
                        <div className='issue-history-and-status'>
                            <h3>Issue History</h3>
                            <span className={`issue-status-box ${getStatusClass(issue.currentStatus)}`}>{issue.currentStatus}</span>
                        </div>

                        <div className='history-updates'>
                            {/* Display the issue description as Update 1 */}
                            <div className="update">
                                <h4>Issue Description</h4>
                                <p>{issue.description}</p>
                            </div>

                            {/* Map through the comments and display them starting with Update 2 */}
                            {issue.comments[0] != null &&
                            (issue.comments.map(
                                (update, index) => (
                                <div key={index} className="update">
                                    {/* Updates in Reverse */}
                                    <h4>Update {issue.comments.length - index}</h4>
                                    <p>{update}</p>
                                </div>
                            )))}
                        </div>

                        <div className="add-comment">
                            <h3>Add a Comment</h3>

                            <form onSubmit={(e) => submitComment(e)}>
                            <div className='fix-add-button'>
                                {/* the above div is just for the purpose of styling */}
                                {/* it is essential to make sure the button stays fixed in diverse screen sizes */}
                                <textarea className='comment-input'
                                    value={comment}
                                    onChange={handleCommentChange}
                                    placeholder="Your comment..."
                                    required
                                ></textarea>
                                <button className="submit-comment-button" type="submit">Add</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='rightside-section'>
                    {/* Right side goes here */}
                    <div >
                        {/* use of the outer div is just for consistent styling regardless of the number of attachments */}
                        {/* it makes sure that the footer buttons always stay at the bottom */}
                        <div className="departments-tagged">
                            <h3>Departments Tagged</h3>
                            <ul className='department-box'>
                                {issue.departments.map((dept, index) => <li className='issue-li department-pill' key={index}>{mapDepartmentToDisplayName(dept)}</li>)}
                            </ul>
                        </div>
                        {issue.attachments[0] != null && (
                            <div className="attachments">
                                <h3>Attachments</h3>
                                <ul className='attachment-box'>
                                    {issue.attachments.map((attach, index) => <li className='issue-li' key={index}>{attach}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
            {/* Toast Notification */}
            {isToastVisible && (
                <div className="toast-notification">
                    {toastMessage}
                </div>
            )}
                    <div className="footer-buttons">
                        {issue.currentStatus === 'Resolved' && (
                            <button className="issue-buttons" onClick={reopenIssue}>Reopen Issue</button>
                        )}
                        {issue.currentStatus === 'Action Required' && issue.isProposed === true && (
                            <button className="issue-buttons" onClick={acceptResolution}>Accept Resolution</button>
                        )}
                        {issue.currentStatus === 'Action Required' && issue.isProposed === true && (
                            <button className="issue-buttons" onClick={rejectResolution}>Reject Resolution</button>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default StudentIssueDetails;
