import { useState, useEffect } from 'react';
import './ProgressionDropdown.css';
import Select from 'react-select';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const ProgressionDropdown = ({ index, currentState, setUpdateBoxes, updateBoxes, currentDepartment, progressionDropDownDisabled }) => {
  const options = [
    { value: 'Open', label: 'Not Started', color: '#b82c1c37', textColor: '#b82c1c', isBold: 'true' },
    { value: 'In Progress', label: 'In Progress', color: '#1f6deb37', textColor: '#1f6eeb', isBold: 'true' },
    { value: 'Action Required', label: 'Awaiting Response', color: '#9d690235', textColor: '#9d6a02', isBold: 'true' },
    { value: 'Resolved', label: 'Resolved', color: '#2386373a', textColor: '#238636', isBold: 'true' }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

const handleOptionChange = (newselectedOption) => {
  setDefaultValue();
  postCurrentProgression(newselectedOption.value);
  setSelectedOption(newselectedOption);
};

const postCurrentProgression = async (param) => {
  try {
    await axios.post(`${BASE_URL}/api/actions/admin/${currentDepartment}/${index}`, { issueStatus: param });
  } catch (error) {
    console.error('Error during form submission:', error);
  }
};

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: selectedOption.color,
    color: 'blue'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.data.color,
    color: state.data.textColor,
    fontWeight: state.data.isBold ? 'bold' : 'normal',
    marginTop: state.data.value === 'Open' ? '-4px' : '0px',
    marginBottom: state.data.value === 'Action Required' ? '-4px' : '0px'
  }),
  singleValue: provided => ({
    ...provided,
    color: selectedOption.textColor,
    fontWeight: 'bold'

  })
};

const setDefaultValue = () => {
  switch (currentState.currentStatus) {
      case "Open":
        setSelectedOption(options[0]);
        break;
      case "In Progress":
        setSelectedOption(options[1]);
        break;
      case "Action Required":
        setSelectedOption(options[2]);
        break;
      case "Resolved":
      setSelectedOption(options[3]);
      break;
  }
};
  useEffect(() => {
    setDefaultValue();
  }, [currentState.currentStatus]);

  return (
    <div className="admin-progress-dropdown">
      <Select
        options={options}
        filterOption={(option) => option.value !== "Resolved"}
        defaultValue={selectedOption}
        value={selectedOption}
        onChange={handleOptionChange}
        styles={customStyles}
        isDisabled={progressionDropDownDisabled}
      />
    </div>
  );
};

export default ProgressionDropdown;
