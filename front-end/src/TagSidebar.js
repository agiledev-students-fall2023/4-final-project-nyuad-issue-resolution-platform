import React from 'react';

function TagSidebar({name,tags,onTagClick}) {
  return (
    <div className="tag-sidebar">
      <h2>{name}</h2>
      <ul>
        {tags.map((tag, index) => (
          <li key={index} onClick={() => onTagClick(tag)}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagSidebar;
