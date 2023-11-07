import './TagSidebar.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function TagSidebar({ index, name, tags }) {
  const [departmentTags, setdepartmentTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const toggleInput = () => {
    setInputVisible(!inputVisible);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddDepartment = (e) => {
    if (e.key === 'Enter') {
      const newValue = e.target.value;
      setdepartmentTags([newValue, ...departmentTags]);
      postDepartmentTags([newValue, ...departmentTags]);
      setInputValue('');
    }
  };

  const postDepartmentTags = async (param) => {
    try {
      await axios.post(`${BASE_URL}/api/issues/admin/${index}`, { issueindex: index, issueDepartmentTags: param });
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const handleRemoveDepartments = (param) => {
    return () => {
      const modifiedDepartmentTags = departmentTags.filter(item => item !== param);
      console.log(departmentNames);
      setdepartmentTags(modifiedDepartmentTags);
    };
  };

  useEffect(() => {
    setdepartmentTags(tags);
    setDepartmentNames(['Resed', 'StudentLife', 'Finance']);
  }, []);

  return (
    <div className="admin-tag-sidebar">
      <div className="tag-sidebar-header">
        <h3>{name}</h3>
        <button className="plus-button" onClick={toggleInput}>+</button>
      </div>
      <ul>
        <li>
            {inputVisible && <input type="text" onKeyDown={handleAddDepartment} placeholder="Enter new Department" value={inputValue} onChange={handleInputChange} />}

        </li>
        {departmentTags.filter(item => item != null).map((tag, index) => (
          <li key={index}>
            <div className="round-tag ">
                <span>{tag}</span>
                <button className="tag-close-button" onClick={handleRemoveDepartments(tag)}>&times;</button>
            </div>
          </li>

        ))}
      </ul>
    </div>
  );
}

export default TagSidebar;
