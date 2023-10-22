// import React from 'react';
import './StudentDetails.css';

const StudentDetails = (props) => {
  const { name, age, grade } = props;

  return (
    <div className="student-details">
      <h2>Student Details</h2>
      <ul>
        <li>
          <strong>Name:</strong> {name}
        </li>
        <li>
          <strong>Age:</strong> {age}
        </li>
        <li>
          <strong>Grade:</strong> {grade}
        </li>
      </ul>
    </div>
  );
};

export default StudentDetails;
