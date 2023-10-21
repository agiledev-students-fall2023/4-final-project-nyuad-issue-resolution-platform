import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './IssueDetails.css';

const IssueDetails = () => {
    const { index } = useParams();
    const [issue, setIssue] = useState(null);
    const navigate = useNavigate();

    // Dummy data
    const departments = ['Department 1', 'Department 2', 'Department 3'];
    const attachments = ['Attachment 1', 'Attachment 2', 'Attachment 3'];
    const issueUpdates = [
        'Lorem Aliquam egestas orci commodo congue fringilla. Vestibulum efficitur hendrerit magna, et mattis erat dapibus id. Nulla vel faucibus quam. Curabitur consectetur lacus id laoreet venenatis. Sed purus ipsum, consectetur vel placerat in, eleifend sit amet dolor.',
        'A solution has been proposed. Lorem Aliquam egestas orci commodo congue fringilla.',
        'This is an additional update for demonstration purposes.'
    ];

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

    if (!issue) {
        return <p>Loading issue data...</p>;
    }

    return (
      <div className="issue-details-container">
          <header>
              <h1>NYUAD Issue Resolution Portal</h1>
              <span>Student Name</span>
          </header>

          <div className="issue-content">
              <div className="issue-heading-section">
                  <h2>Issue Heading</h2>
                  <span className="action-required-tag">Action Required</span>
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

              <div className="add-comment">
                  <h3>Add a Comment</h3>
                  <textarea placeholder="Your comment..."></textarea>
              </div>
          </div>

          <aside className="sidebar">
              <div className="departments-tagged">
                  <h3>Departments Tagged</h3>
                  <ul>
                      {departments.map((dept, index) => <li key={index}>{dept}</li>)}
                  </ul>
              </div>
              <div className="attachments">
                  <h3>Attachments</h3>
                  <ul>
                      {attachments.map((attach, index) => <li key={index}>{attach}</li>)}
                  </ul>
              </div>
          </aside>

          <div className="footer-buttons">
              <button>Reopen Issue</button>
              <button>Accept Resolution</button>
          </div>
          <button className="closeButton" onClick={closeIssueDetails}>X</button>
      </div>
  );
};

export default IssueDetails;
