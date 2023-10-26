import { useState, useEffect } from 'react';
import './ProgressionDropdown.css';
import axios from 'axios';

const ProgressionDropdown = ({ currentState }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const options = ['In Progress', 'Not Started', 'Resolved', 'Awaiting Response'];
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const statusMapping = {
    Open: 'Not Started',
    'In Progress': 'In Progress',
    'Action Required': 'Awaiting Response',
    Resolved: 'Resolved'
  };
  const dummyPostProgressionUpdated = async (event) => {
    event.preventDefault();
    try {
        await axios.post(`${BASE_URL}/dummyPostPriorityUpdated`, null);
    } catch (error) {
        console.error('Error during form submission:', error);
    }
};

  const handleOptionSelect = (e) => {
    // setSelectedOption(e.target.value);
    dummyPostProgressionUpdated(e);
  };

  useEffect(() => {
    setSelectedOption(statusMapping[currentState.currentStatus]);
  }, []);

  return (
    <div className="progress-dropdown">
      <select onChange={handleOptionSelect}>
      <option value="">{selectedOption}</option>
        {options.filter((item) => { return item !== selectedOption; }).map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProgressionDropdown;
