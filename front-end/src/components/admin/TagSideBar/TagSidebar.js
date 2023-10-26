import './TagSidebar.css';

function TagSidebar({ name, tags, onTagClick }) {
  return (
    <div className="tag-sidebar">
      <h3>{name}</h3>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagSidebar;
