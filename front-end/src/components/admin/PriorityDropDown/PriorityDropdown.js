// src/DynamicDropdown.js
import { useState, useEffect } from 'react';
import axios from 'axios';

import './PriorityDropdown.css';

const PriorityDropdown = ({ currentState }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const options = ['High Priority', 'New', 'Reopened'];
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const dummyPostPriorityUpdated = async (event) => {
    event.preventDefault();
    try {
        await axios.post(`${BASE_URL}/dummyPostPriorityUpdated`, null);
    } catch (error) {
        console.error('Error during form submission:', error);
    }
};

  const handleOptionSelect = (e) => {
    // setSelectedOption(e.target.value);
    dummyPostPriorityUpdated(e);
  };

  useEffect(() => {
    const selectedStatus = currentState.currentPriority;
    switch (selectedStatus) {
      case 'High Priority':
        setSelectedOption(options[0]);
        break;
      case 'New':
        setSelectedOption(options[1]);
        break;
      case 'Reopened':
        setSelectedOption(options[2]);
        break;
    }
  }, []);
  return (
    <div className="priority-dropdown">
      <select onChange={handleOptionSelect}>
        <option value="">{selectedOption}</option>
        {
          options.filter((item) => { return item !== selectedOption; }).map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
        ))
        };
      </select>
      {

      }
    </div>
  );
};

export default PriorityDropdown;
