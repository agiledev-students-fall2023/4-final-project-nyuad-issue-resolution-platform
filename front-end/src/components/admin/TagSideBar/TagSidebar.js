import './TagSidebar.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function TagSidebar({ name, tags }) {
  const [departmentTags, setdepartmentTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const postDepartmentDelegation = async (event) => {
    event.preventDefault();
    try {
        await axios.post(`${BASE_URL}/addNewDepartment`, null);
    } catch (error) {
        console.error('Error during form submission:', error);
    }
};

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
      setInputValue('');
      postDepartmentDelegation(e);
    }
  };

  const handleRemoveDepartments = (param) => {
    return () => {
      const modifiedDepartmentTags = departmentTags.filter(item => item !== param);
      console.log(departmentNames);
      console.log(modifiedDepartmentTags);
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
        <l1>
            {inputVisible && <input type="text" onKeyDown={handleAddDepartment} placeholder="Enter new Department" value={inputValue} onChange={handleInputChange} />}

        </l1>
        {departmentTags.map((tag, index) => (
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
