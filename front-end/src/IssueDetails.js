import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// TODO: Issue details display

// Dummy issue details

const IssueDetails = () => {
  const { index } = useParams();
  const [issue, setIssue] = useState(null);

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

  return (
    <div>
      {issue ? (
        <div>
          <p>Issue Title: {issue.title}</p>
          <p>Issue Description: {issue.description}</p>
          <p>Issue Status: {issue.departments}</p>
          <p>Issue Statues: {issue.currentStatus}</p>
        </div>
      ) : (
        <p>Loading issue data...</p>
      )}
    </div>
  );
};

export default IssueDetails;
