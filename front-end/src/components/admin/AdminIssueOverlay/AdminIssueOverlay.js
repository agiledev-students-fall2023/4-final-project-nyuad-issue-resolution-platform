/* eslint-disable */
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
import { useState } from 'react';

const loremIpsum2 = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  ];

const AdminIssueOverlay = ({ onRerender,onClose, card }) => {
  const [updateBoxes, setUpdateBoxes] = useState([]);

  const addUpdateBoxes = (newupdateBox) => {
    const array = [newupdateBox.updateDescription,...updateBoxes]
    setUpdateBoxes(array);
    
    onRerender()
  };
  return (
    <div className="admin-issue-overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="issue-overlay-container">
            <div className="left-bar">
              <h1>{card.cardTitle}</h1>
              <PriorityDropdown/>
              <h2>Issue History</h2>
              <ProgressionDropdown/>
              <div className="allupdates">
                {
                    updateBoxes.map((item, index) => {
                      return <UpdatesBox index ={updateBoxes.length - index + 1}description={item} />
                    })   
                }
                  <UpdatesBox description={card.cardIssueDes + loremIpsum2} />
              </div>
              <br></br>
              <CommentBox onAdd={addUpdateBoxes}/>
            </div>
            <div className="right-bar">
                <StudentDetails/>
                <TagSidebar name="Departments Tagged" tags = {card.cardTags} onTagClick ={onClose}/>
                <TagSidebar name="Attachments" tags = {["Attachtment1", "Attachment2"]} onTagClick ={onClose}/>
                <div className="markedasolvebtn">
                  <button type="submit">Mark as Resolved</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIssueOverlay;