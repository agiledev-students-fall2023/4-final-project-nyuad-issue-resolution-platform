import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './IssueDetails.css';
// const [showIssueOverlay, setShowIssueOverlay] = useState(false);

const IssueDetails = (issueIndex) => {
    const { index } = issueIndex;
    const [issue, setIssue] = useState(null);
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]); // Assuming comments is an array

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

    const closeIssueDetails = () => {
        navigate(-1); // Go back to the previous page
    };
    useEffect(() => {
        const apiUrl = "https://hasiburratul.github.io/mock-api/MOCK_DATA.json";
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const specificIssue = data[parseInt(index - 1)];
                setIssue(specificIssue);
            })
            .catch(error => {
                console.error("Error fetching the issue data: ", error);
            });
    }, [index]);

    const reopenIssue = () => {
        setIssue({ ...issue, currentStatus: 'Open' });
    };

    const acceptResolution = () => {
        closeIssueDetails();
        // Since the issue status is already 'Resolved', no need to change it.
    };

    // const handleIssueClick = (index) => {
    //     setShowIssueOverlay(!showIssueOverlay);
    // };

    // TODO: Sync the notification overlay
    // const renderIssueOverlay = () => {
    //     if (showIssueOverlay) {
    //         return (
    //             <div className="issue-overlay">
    //                 <p>No desc</p>
    //             </div>
    //         );
    //     }
    // };

    if (!issue) {
        return <p>Loading issue data...</p>;
    }

    const issueUpdates = [
        issue.description
    ];

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

    return (

      <div className="issue-details-container">
        {/* {renderIssueOverlay()} */}
          <div className="issue-content">
              <div className="issue-heading-section">
                  <h2>{issue.title}</h2>
              </div>
              <div className="history-section">
                  <h3>Issue History</h3>
                  {issueUpdates.map((update, index) => (
                      <div key={index} className="update">
                          <h4>Update {issueUpdates.length - index}</h4>
                          <p>{update}</p>
                      </div>
                  ))}
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

              <div className="add-comment">
                <h3>Add a Comment</h3>
                <textarea className='comment-input'
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Your comment..."
                ></textarea>
                <button className="issue-buttons" onClick={submitComment}>Submit Comment</button>
                </div>
          </div>

          <aside className="sidebar">
            <span className={`issue-status-box ${getStatusClass(issue.currentStatus)}`}>{issue.currentStatus}</span>
              <div className="departments-tagged">
                  <h3>Departments Tagged</h3>
                  <ul className='issue-ul'>
                      {issue.departments.map((dept, index) => <li className='issue-li' key={index}>{mapDepartmentToDisplayName(dept)}</li>)}
                  </ul>
              </div>
              {issue.attachments && issue.attachments.length > 0 && (
                <div className="attachments">
                    <h3>Attachments</h3>
                    <ul className='issue-ul'>
                    {issue.attachments.map((attach, index) => <li className='issue-li' key={index}>{attach}</li>)}
                    {/* Hello */}
                    </ul>
                </div>
                )}
                <div className="footer-buttons">
                    {issue.currentStatus === 'Resolved' && (
                        <button className= "issue-buttons" onClick={reopenIssue}>Reopen Issue</button>
                        )}
                    {issue.currentStatus === 'Action Required' && (
                        <button className= "issue-buttons" onClick={acceptResolution}>Accept Resolution</button>
                        )}
                </div>
          </aside>

          <button className="closeButton issue-buttons" onClick={closeIssueDetails}>X</button>
      </div>
  );
};

export default IssueDetails;
