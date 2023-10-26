import './CommentBox.css';
import { useState } from 'react';

function CommentBox({ onAdd }) {
  const [textAreaValue, setTextAreaValue] = useState('');

  // const sendNewUpdateBox = (e) => {
  //   e.preventDefault();
  //   onAdd({ updateDescription: textAreaValue });
  // };

  const handleTextChange = (event) => {
    // Step 3: Update the state variable when the user types
    setTextAreaValue(event.target.value);
  };

  return (
    <div className="comment-box">
      <h3>Add a Comment</h3>
      <form onSubmit={onAdd}>
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
