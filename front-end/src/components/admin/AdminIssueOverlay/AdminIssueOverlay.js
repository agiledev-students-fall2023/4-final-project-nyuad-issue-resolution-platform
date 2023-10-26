import UpdatesBox from '../UpdateBox/UpdatesBox.js';
import CommentBox from '../CommentBox/CommentBox.js';
import TagSidebar from '../TagSideBar/TagSidebar.js';
import '../CommentBox/CommentBox.css';
import '../TagSideBar/TagSidebar.css';
import '../UpdateBox/UpdatesBox.css';
import './AdminIssueOverlay.css';
import PriorityDropdown from '../PriorityDropDown/PriorityDropdown.js';
import ProgressionDropdown from '../ProgressionDropdown/ProgressionDropdown.js';
import StudentDetails from '../StudentDetails/StudentDetails.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdminIssueOverlay = () => {
  const { index } = useParams();
  const [updateBoxes, setUpdateBoxes] = useState([]);
  const [specificIssue, setSpecificIssue] = useState([]);
  // const [commentBoxValue, setcommentBoxValue] = useState('');
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // const addUpdateBoxes = (newupdateBox) => {
  //     const array = [newupdateBox.updateDescription,...updateBoxes]
  //     setUpdateBoxes(array);
  // };

  const dummyPostUpdateCommentAdd = async (event) => {
      event.preventDefault();
      const updateBoxData = event.target.elements[0].value;
      try {
          await axios.post(`${BASE_URL}/dummypost`, updateBoxData);
      } catch (error) {
          console.error('Error during form submission:', error);
      }
      setUpdateBoxes([]);
  };

  const dummyPostMarkAsResolved = async (event) => {
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
        const response = await fetch('https://hasiburratul.github.io/mock-api/MOCK_DATA_ADMIN.json');
        const result = await response.json();
        setSpecificIssue(result);
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
}, []);

  console.log(specificIssue[index]);

  return (

    <div className="admin-issue-overlay">

      { loading
? (
        <div className="overlay-content">
        <div className="issue-overlay-container">
            <div className="left-bar">
              <h1>{specificIssue[index].title}</h1>
              <PriorityDropdown/>
              <div className="issue-history-text">
                <h2> Issue History </h2>
                <ProgressionDropdown/>
              </div>

              <div className="all-updates">
                {
                    updateBoxes.map((item, index) => {
                      return <UpdatesBox key={index} index ={updateBoxes.length - index + 1}description={item} />;
                    })
                }
                  <UpdatesBox description={specificIssue[index].description} />
              </div>
              <CommentBox onAdd={dummyPostUpdateCommentAdd}/>
            </div>
            <div className="right-bar">
                <StudentDetails/>
                <TagSidebar name="Departments Tagged" tags = {specificIssue[index].departments} />
                <TagSidebar name="Attachments" tags = {["Attachtment1", "Attachment2"]} />
                <div className="marked-as-solve-btn">
                  <button onClick={dummyPostMarkAsResolved} type="submit">Mark as Resolved</button>
                </div>
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

export default AdminIssueOverlay;
