import './CommentBox.css';
import { useState } from 'react';
import axios from 'axios';
import { currentSetDepartment } from '../../../layouts/AdminDashboard/AdminDashboard.js';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function CommentBox({ index, setcommentBoxValue }) {
  const [textAreaValue, setTextAreaValue] = useState('');
  const handleTextChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const postNewComment = async (event) => {
    event.preventDefault();
    const updateBoxData = event.target.elements[0].value;
    setcommentBoxValue(updateBoxData);
      try {
        await axios.post(`${BASE_URL}/api/actions/admin/${currentSetDepartment}`, { issueindex: index, commentbox: updateBoxData });
      } catch (error) {
        console.error('Error during form submission:', error);
      }
    event.target.elements[0].value = '';
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
