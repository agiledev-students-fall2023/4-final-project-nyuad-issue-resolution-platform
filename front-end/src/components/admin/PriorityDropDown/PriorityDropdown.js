// src/DynamicDropdown.js
import { useState } from 'react';

import './PriorityDropdown.css';

const PriorityDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('High priority');
  const options = ['New', 'Reopened'];

  const handleOptionSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="priority-dropdown">
      {console.log(selectedOption)}
      <select onChange={handleOptionSelect}>
        <option value="">High priority</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriorityDropdown;
