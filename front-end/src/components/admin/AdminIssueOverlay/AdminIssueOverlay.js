import UpdatesBox from '../UpdateBox/UpdatesBox.js';
import CommentBox from '../CommentBox/CommentBox.js';
import TagSidebar from '../TagSideBar/TagSidebar.js';
import '../CommentBox/CommentBox.css';
import '../TagSideBar/TagSidebar.css';
import '../UpdateBox/UpdatesBox.css';

const loremIpsum2 = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.'
  ];

const AdminIssueOverlay = ({ onClose, card }) => {
  console.log(card);
  return (
    <div className="admin-issue-overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="issue-overlay-container">
            <div className="left-bar">
              <h2>{card.cardTitle}</h2>
                <UpdatesBox description={card.cardIssueDes + loremIpsum2} />
                <br></br>
                <UpdatesBox description={card.cardIssueDes + loremIpsum2} />
                <br></br>
                <CommentBox/>
            </div>
            <div className="right-bar">
                <TagSidebar name="Departments Tagged" tags = {card.cardTags} onTagClick ={onClose}/>
                <TagSidebar name="Attachments" tags = {["Attachtment1", "Attachment2"]} onTagClick ={onClose}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIssueOverlay;
