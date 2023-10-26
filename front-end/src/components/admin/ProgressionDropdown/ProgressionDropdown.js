import { useState } from 'react';
import './ProgressionDropdown.css';

const ProgressionDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('In Progress');
  const options = ['Awaiting', 'Resolved'];

  const handleOptionSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="progress-dropdown">
      {console.log(selectedOption)}
      <select onChange={handleOptionSelect}>
        <option value="">In Progress</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProgressionDropdown;
