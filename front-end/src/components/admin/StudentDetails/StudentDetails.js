import './StudentDetails.css';

const StudentDetails = ({ props }) => {
  const name = props.studentName;
  const netID = props.studentNetID;
  const date = props.dateCreated;

  return (
    <div className="admin-student-details">
      <h2>Student Details</h2>
      <ul>
        <li>
          <strong>Name:</strong> {name}
        </li>
        <li>
          <strong>Netid:</strong> {netID}
        </li>
        <li>
          <strong>Issue Creation Date:</strong> {date}
        </li>
      </ul>
    </div>
  );
};

export default StudentDetails;
