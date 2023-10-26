import './StudentDetails.css';

const StudentDetails = ({ props }) => {
  const name = props.studentName;
  const netID = props.studentNetID;

  return (
    <div className="student-details">
      <h2>Student Details</h2>
      <ul>
        <li>
          <strong>Name:</strong> {name}
        </li>
        <li>
          <strong>Netid:</strong> {netID}
        </li>
      </ul>
    </div>
  );
};

export default StudentDetails;
