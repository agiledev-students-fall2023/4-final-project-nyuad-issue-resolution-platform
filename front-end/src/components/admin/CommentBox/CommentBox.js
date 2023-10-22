/* eslint-disable */
import './CommentBox.css';
import { useState } from 'react';

function CommentBox({ onAdd }) {
 

  const [textAreaValue , setTextAreaValue] = useState('')

  const sendNewUpdateBox = (e) =>
  {
    // handleSubmitComment(e)
    e.preventDefault();
    onAdd({"updateDescription":textAreaValue})
  }

  const handleTextChange = (event) => {
    // Step 3: Update the state variable when the user types
    setTextAreaValue(event.target.value);
  };

  return (
    <div className="comment-box">
      <h3>Add a Comment</h3>
      <form>
        <textarea
          placeholder="Write your comment..."
          onChange={handleTextChange}
          value={textAreaValue}
        ></textarea>
      </form>
      <button onClick={sendNewUpdateBox} type="submit">Submit</button>
    </div>
  );
}

export default CommentBox;
