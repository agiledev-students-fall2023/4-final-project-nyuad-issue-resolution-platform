import { useState, useEffect } from 'react';
import axios from 'axios';
import './DesktopIssueDetails.css';

const DesktopIssueDetails = ({ index }) => {
    const [issue, setIssue] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]); // Assuming comments is an array
    const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const mockStudent = {
        name: "Ted Mosby",
        netid: "tm2005"
      };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const submitComment = async () => {
        if (comment.trim()) {
            try {
                const response = await axios.post('/api/comments', { comment });
                console.log('Comment submitted successfully:', response.data);
                // You can add more logic here depending on your needs
                // For example, clear the comment field or update the UI to show the new comment
                setComment('');
                // Update the UI to show the new comment
                // Assuming response.data contains the new comment object
                setComments([...comments, response.data]);
            } catch (error) {
                console.error('Error submitting comment:', error.response ? error.response.data : error.message);
                // Handle the error accordingly
            }
        } else {
            console.error('Comment cannot be empty');
            // You might want to show a user-friendly error message here
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

            const fetchData = async () => {
              try {
                const response = await axios.get(
                  `${BACKEND_BASE_URL}/api/issues/student/${mockStudent.netid}/${index}`
                );
                // const result = await response.json();
                // setIssue(result[0]);
                setIssue(response.data[0]);
                console.log("Fetched Data");
                console.log(response);
              } catch (error) {
                console.error("Error fetching data from API:", error);
              }
            };
            fetchData();
    }, [index]);

    const reopenIssue = () => {
        setIssue({ ...issue, currentStatus: 'Open' });
    };

    const acceptResolution = () => {
        setIssue({ ...issue, currentStatus: 'Resolved' });
        // Since the issue status is already 'Resolved', no need to change it.
    };

    if (!issue) {
        return <p>Loading issue data...</p>;
    }

    // const issueUpdates = [
    //     issue.description,
    //     issue.description,
    //     issue.description,
    //     issue.description
    //     // just replicated issues for styling updates
    // ];

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
                                <h4>Update 1</h4>
                                <p>{issue.description}</p>
                            </div>

                            {/* Map through the comments and display them starting with Update 2 */}
                            {issue.comments.map((update, index) => (
                                <div key={index} className="update">
                                    {/* Since we start counting updates from 2, add 2 to the current index */}
                                    <h4>Update {index + 2}</h4>
                                    <p>{update}</p>
                                </div>
                            ))}
                        </div>

                        <div className="add-comment">
                            <h3>Add a Comment</h3>
                            <div className='fix-add-button'>
                                {/* the above div is just for the purpose of styling */}
                                {/* it is essential to make sure the button stays fixed in diverse screen sizes */}
                                <textarea className='comment-input'
                                    value={comment}
                                    onChange={handleCommentChange}
                                    placeholder="Your comment..."
                                ></textarea>
                                <button className="submit-comment-button" onClick={submitComment}>Add</button>
                            </div>

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
                        {issue.attachments && issue.attachments.length > 0 && (
                            <div className="attachments">
                                <h3>Attachments</h3>
                                <ul className='attachment-box'>
                                    {issue.attachments.map((attach, index) => <li className='issue-li' key={index}>{attach}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="footer-buttons">
                        {issue.currentStatus === 'Resolved' && (
                            <button className="issue-buttons" onClick={reopenIssue}>Reopen Issue</button>
                        )}
                        {issue.currentStatus === 'Action Required' && (
                            <button className="issue-buttons" onClick={acceptResolution}>Accept Resolution</button>
                        )}
                    </div>
                </div>
            </div>

            {comments && comments.length > 0 && (
                <div className="comments-section">
                    <h3>Comments</h3>
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>{comment.text /* Assuming comment object has a text property */}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default DesktopIssueDetails;
