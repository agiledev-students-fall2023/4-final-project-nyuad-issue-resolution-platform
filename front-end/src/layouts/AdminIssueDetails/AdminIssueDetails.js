import UpdatesBox from '../../components/admin/UpdateBox/UpdatesBox.js';
import CommentBox from '../../components/admin/CommentBox/CommentBox.js';
import TagSidebar from '../../components/admin/TagSideBar/TagSidebar.js';
import DepartmentSelection from '../../components/admin/DepartmentSelection/DepartmentSelection.js';
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
  // const [currentPriority, setcurrentPriority] = useState('');
  // const [currentProgression, setcurrentProgression] = useState('');
  // const [departmentsTags, setDepartmentTags] = useState([]);
  const [commentBoxValue, setcommentBoxValue] = useState('');
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const { checkAuthentication, userDept } = useContext(AuthContext);
  const currentDepartment = userDept;

  useEffect(() => {
    const checkAuthState = async () => {
      await checkAuthentication();
    };
    checkAuthState();
  }, []);

  const postMarkAsResolved = async (event) => {
      // event.prevenDefault();
      navigate('/admin/dashboard/');
      try {
        await axios.post(`${BASE_URL}/api/actions/admin/${currentDepartment}/${index}`, { issueindex: index, issueStatus: "Action Required" });
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
          }
        }
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
}, [index, commentBoxValue]);

  return (
    <div>
      { loading
? (
        <div className="admin-issue">
            <div className="left-bar">
              <h1>{specificIssue.title}</h1>
              {/* Passses the issue fetched from the API */}
              <PriorityDropdown index = { index } currentState={specificIssue} tags = {specificIssue.departments} setUpdateBoxes={ setUpdateBoxes } updateBoxes= {updateBoxes} currentDepartment={currentDepartment}/>
              <div className="issue-history-text">
                <h2> Issue History </h2>
                <ProgressionDropdown index = { index } currentState={specificIssue} tags = {specificIssue.departments} setUpdateBoxes={ setUpdateBoxes} updateBoxes={updateBoxes} currentDepartment={currentDepartment}/>
              </div>
              <div className="all-updates">
                {
                    updateBoxes.map((item, index) => {
                      return <UpdatesBox key={index} name={ "Update" } index ={updateBoxes.length - index}description={item} />;
                    })
                }
                  <UpdatesBox name={"Issue Details"}description={specificIssue.description} />
              </div>
              <CommentBox index={ index } setcommentBoxValue={setcommentBoxValue} currentDepartment={currentDepartment} />
            </div>
            <div className="right-bar">
                <StudentDetails props={specificIssue}/>
                <DepartmentSelection index = { index }name="Departments" tags = {specificIssue.departments} setUpdateBoxes={setUpdateBoxes} updateBoxes={updateBoxes} currentDepartment={currentDepartment} />
                <TagSidebar index = { index }name="Attachments" tags = {specificIssue.attachments} setUpdateBoxes={setUpdateBoxes} updateBoxes={updateBoxes} currentDepartment={currentDepartment}/>
                <div className="marked-as-solve-btn">
                  <button onClick={postMarkAsResolved} type="submit">Mark as Resolved</button>
                </div>
            </div>
        </div>
      )
      : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminIssueDetails;
