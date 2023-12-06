import UpdatesBox from '../../components/admin/UpdateBox/UpdatesBox.js';
import CommentBox from '../../components/admin/CommentBox/CommentBox.js';
import AttachmentBar from '../../components/general/AttachmentBar/AttachmentBar.js';
import DepartmentSelection from '../../components/admin/DepartmentSelection/DepartmentSelection.js';
import '../../components/general/AttachmentBar/AttachmentBar.css';
import '../../components/admin/CommentBox/CommentBox.css';
import '../../components/admin/TagSideBar/TagSidebar.css';
import '../../components/admin/DepartmentSelection/DepartmentSelection.css';
import '../../components/admin/UpdateBox/UpdatesBox.css';
import './AdminIssueDetails.css';
import PriorityDropdown from '../../components/admin/PriorityDropDown/PriorityDropdown.js';
import ProgressionDropdown from '../../components/admin/ProgressionDropdown/ProgressionDropdown.js';
import StudentDetails from '../../components/admin/StudentDetails/StudentDetails.js';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/general/AuthContext/AuthContext.js';
import axios from 'axios';

const AdminIssueDetails = () => {
  const { index } = useParams();
  const [updateBoxes, setUpdateBoxes] = useState([]);
  const [specificIssue, setSpecificIssue] = useState();
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [selectedFilesname, setSelectedFilesname] = useState([]);
  const [progressionDropDownDisabled, setProgressionDropDownDisabled] = useState(false);
  const navigate = useNavigate();

  const { userName, checkAuthentication, userDept } = useContext(AuthContext);
  const currentDepartment = userDept;

  useEffect(() => {
    const checkAuthState = async () => {
      await checkAuthentication();
    };
    checkAuthState();
  }, []);

  const gotoAdminDashboard = () => {
    navigate('/admin/dashboard/');
  };

  const postMarkAsResolved = async (event) => {
      navigate('/admin/dashboard/');
      try {
        await axios.post(`${BASE_URL}/api/actions/admin/${currentDepartment}/${index}`, { issueStatus: "Action Required", isProposed: true });
      } catch (error) {
        console.error('Error during form submission:', error);
      }
};
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}/api/issues/admin/${currentDepartment}/${index}`);
        const result = await response.json();
        if (result) {
          setSpecificIssue(result[0]);
          if (result[0].comments) {
            setUpdateBoxes(result[0].comments);
            setSelectedFilesname(result[0].attachments);
          }
          if (result[0].currentStatus === "Resolved") {
            setProgressionDropDownDisabled(true);
          }
        }
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
}, [index]);

  return (
    <div>
      { loading
? (
        <div className="admin-issue">
            <div className="left-bar">
              <h1>{specificIssue.title}</h1>
              {/* Passses the issue fetched from the API */}
              {specificIssue.currentPriority !== "" && (<PriorityDropdown index = { index } currentState={specificIssue} tags = {specificIssue.departments} setUpdateBoxes={ setUpdateBoxes } updateBoxes= {updateBoxes} currentDepartment={currentDepartment}/>)}
              <div className="issue-history-text">
                <h2> Issue History </h2>
                <ProgressionDropdown index = { index } currentState={specificIssue} tags = {specificIssue.departments} setUpdateBoxes={ setUpdateBoxes} updateBoxes={updateBoxes} currentDepartment={currentDepartment} progressionDropDownDisabled={progressionDropDownDisabled}/>
              </div>
              <div className="all-updates">
              <UpdatesBox name={"Issue Description"}description={specificIssue.description} />
                {
                    updateBoxes.map((item, index) => {
                      return <UpdatesBox key={index} name={ "Update" } index ={updateBoxes.length - index}description={item} />;
                    })
                }
              </div>
              <CommentBox index={ index } setUpdateBoxes={setUpdateBoxes} updateBoxes={updateBoxes} currentDepartment={currentDepartment} currentState={specificIssue} currentUser={userName} />
            </div>
            <div className="right-bar">
                <StudentDetails props={specificIssue}/>
                <DepartmentSelection index = { index }name="Departments" tags = {specificIssue.departments} setUpdateBoxes={setUpdateBoxes} updateBoxes={updateBoxes} currentDepartment={currentDepartment} />
                <AttachmentBar index = { index } name="Attachments" tags = {specificIssue.attachments} fileNames={selectedFilesname} currentDepartment={currentDepartment} isAdmin={true}/>
                {
                  (specificIssue.currentStatus !== "Resolved" && specificIssue.isProposed === false) &&
                  <div className="marked-as-solve-btn">
                  <button onClick={postMarkAsResolved} type="submit">Mark as Resolved</button>
                  </div>
                }
            </div>
            <button className='admin-close' onClick={gotoAdminDashboard}> X </button>
        </div>
      )
      : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminIssueDetails;
