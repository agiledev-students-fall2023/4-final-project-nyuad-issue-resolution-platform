import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './PriorityDropdown.css';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const PriorityDropdown = ({ index, currentState, setUpdateBoxes, updateBoxes, currentDepartment }) => {
  const options = [
    { value: 'High Priority', label: 'High Priority', color: '#b82c1c37', textColor: '#b82c1c', isBold: 'true' },
    { value: 'New', label: 'New', color: '#1f6deb37', textColor: '#1f6eeb', isBold: 'true' },
    { value: 'Reopened', label: 'Reopened', color: '#9d690235', textColor: '#9d6a02', isBold: 'true' }
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleOptionChange = async (newselectedOption) => {
    setDefaultValue();
    postCurrentPriority(newselectedOption.value);
    setSelectedOption(newselectedOption);
  };

  const postCurrentPriority = async (param) => {
    // const statusUpdate = `Admin Changed the current status of the issue to ${param}`;
    // setUpdateBoxes([statusUpdate, ...updateBoxes]); // // Updates the update boxes locally in the parent
    try {
      await axios.post(`${BASE_URL}/api/actions/admin/${currentDepartment}`, { issueindex: index, issuePriority: param });
    } catch (error) {
      console.error('Error during form submission:', error);
    }
};

  useEffect(() => {

  });

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: selectedOption.color,
      color: 'blue'
    }),
    option: (provided, state) => ({
      ...provided
      // backgroundColor: state.data.color,
      // color: state.data.textColor,
      // fontWeight: state.data.isBold ? 'bold' : 'normal'
    }),
    singleValue: provided => ({
      ...provided,
      color: selectedOption.textColor,
      fontWeight: 'bold'
    })
  };

  const setDefaultValue = () => {
    switch (currentState.currentPriority) {
        case "High Priority":
          setSelectedOption(options[0]);
          break;
        case "New":
          setSelectedOption(options[1]);
          break;
        case "Reopened":
          setSelectedOption(options[2]);
          break;
    }
  };
  useEffect(() => {
    setDefaultValue();
  }, []);

  return (
    <div className="admin-priority-dropdown">
       <div>
          <Select
            options={options}
            defaultValue={selectedOption}
            value={selectedOption}
            onChange={handleOptionChange}
            styles={customStyles}
            isSearchable = {false}
          />
       </div>
    </div>
  );
};

export default PriorityDropdown;
