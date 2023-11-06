import UpdatesBox from '../UpdateBox/UpdatesBox.js';
import CommentBox from '../CommentBox/CommentBox.js';
import TagSidebar from '../TagSideBar/TagSidebar.js';
import '../CommentBox/CommentBox.css';
import '../TagSideBar/TagSidebar.css';
import '../UpdateBox/UpdatesBox.css';
import './AdminIssueDetails.css';
import PriorityDropdown from '../PriorityDropDown/PriorityDropdown.js';
import ProgressionDropdown from '../ProgressionDropdown/ProgressionDropdown.js';
import StudentDetails from '../StudentDetails/StudentDetails.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdminIssueDetails = () => {
  const { index } = useParams();
  const [updateBoxes, setUpdateBoxes] = useState([]);
  const [specificIssue, setSpecificIssue] = useState();
  // const [commentBoxValue, setcommentBoxValue] = useState('');
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // const addUpdateBoxes = (newupdateBox) => {
  //     const array = [newupdateBox.updateDescription,...updateBoxes]
  //     setUpdateBoxes(array);
  // };

  const postUpdateCommentAdd = async (event) => {
      event.preventDefault();
      const updateBoxData = event.target.elements[0].value;
      try {
          await axios.post(`${BASE_URL}/dummypost`, updateBoxData);
      } catch (error) {
          console.error('Error during form submission:', error);
      }
      setUpdateBoxes([]);
  };

  const postMarkAsResolved = async (event) => {
    event.preventDefault();
    try {
        await axios.post(`${BASE_URL}/markasresolved`, null);
    } catch (error) {
        console.error('Error during form submission:', error);
    }
};

  useEffect(() => {
    // Fetch data from the API when the component mounts

    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}/api/issues/admin/IT/${index}`);
        const result = await response.json();
        setSpecificIssue(result[0]);
        setUpdateBoxes(result[0].comments);
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
}, []);

  return (

    <div>
      { loading
? (
        <div className="admin-issue">
            <div className="left-bar">
              <h1>{specificIssue.title}</h1>
              {/* Passses the issue fetched from the API */}
              <PriorityDropdown currentState={specificIssue}/>
              <div className="issue-history-text">
                <h2> Issue History </h2>
                <ProgressionDropdown currentState={specificIssue}/>
              </div>

              <div className="all-updates">
                {
                    updateBoxes.map((item, index) => {
                      return <UpdatesBox key={index} name={ "Update" } index ={updateBoxes.length - index}description={item} />;
                    })
                }
                  <UpdatesBox name={"Issue Details"}description={specificIssue.description} />
              </div>
              <CommentBox onAdd={postUpdateCommentAdd}/>
            </div>
            <div className="right-bar">
                <StudentDetails props={specificIssue}/>
                <TagSidebar name="Departments" tags = {specificIssue.departments} />
                <TagSidebar name="Attachments" tags = {specificIssue.attachments} />
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
