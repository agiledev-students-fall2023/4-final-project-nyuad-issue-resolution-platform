import './CommentBox.css';
import { useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function CommentBox({ index, setUpdateBoxes, updateBoxes, currentDepartment, currentState, currentUser }) {
  const [textAreaValue, setTextAreaValue] = useState('');
  const handleTextChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const postNewComment = async (event) => {
    event.preventDefault();
    const updateBoxValue = event.target.elements[0].value;
    if (updateBoxValue.length > 0) {
      const updatedComment = `${updateBoxValue} - ${currentUser}`; // Append currentUser
      setUpdateBoxes([updatedComment, ...updateBoxes]); // Updates the update boxes locally in the parent
      if (updateBoxes.length < 1) { // If only the first comment is made on this issue, change the progression/status tag to "InProgress"
        currentState.currentStatus = "In Progress";
        try {
          await axios.post(`${BASE_URL}/api/actions/admin/${currentDepartment}/${index}`, { commentbox: updatedComment, issueStatus: "In Progress" });
        } catch (error) {
          console.error('Error during form submission:', error);
        }
      } else {
        try {
          await axios.post(`${BASE_URL}/api/actions/admin/${currentDepartment}/${index}`, { commentbox: updatedComment });
        } catch (error) {
          console.error('Error during form submission:', error);
        }
      }
      event.target.elements[0].value = '';
    }
  };

  return (
    <div className="admin-comment-box">
      <h3>Add a Comment</h3>
      <form onSubmit={postNewComment}>
        <textarea
          name ="comment"
          placeholder="Write your comment..."
          onChange={handleTextChange}
          value={textAreaValue}
        ></textarea>
        <button type="submit"><strong> Submit</strong></button>
      </form>

    </div>
  );
}

export default CommentBox;
