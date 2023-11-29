import './DepartmentSelection.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function DepartmentSelection({ index, name, tags, setUpdateBoxes, updateBoxes, currentDepartment }) {
  const [departmentTags, setdepartmentTags] = useState([]);

  const departmentOptions = [
    { value: "", label: "Filter by Department" },
    { value: "IT", label: "IT" },
    { value: "Admin", label: "Admin" },
    { value: "Library", label: "Library" },
    { value: "Facilities", label: "Facilities" },
    { value: "Registrar", label: "Registrar" },
    { value: "Health", label: "Health Center" },
    { value: "Finance", label: "Student Finance" },
    { value: "GlobalEd", label: "Global Education" },
    { value: "ResEd", label: "Residential Education" },
    { value: "CDC", label: "Career Development Center" }
  ];

  const handleAddDepartment = (e) => {
      const newValue = e.target.value;
      setdepartmentTags([newValue, ...departmentTags]);
      postDepartmentTags([newValue, ...departmentTags]);
  };

  const postDepartmentTags = async (param) => {
    const lastdepartmentString = param[0];
    const statusUpdate = `Admin added new department tag [${lastdepartmentString}]`;
    setUpdateBoxes([statusUpdate, ...updateBoxes]); // Updates the update boxes locally in the parent
    try {
      await axios.post(`${BASE_URL}/api/actions/admin/${currentDepartment}`, { issueindex: index, commentbox: statusUpdate, issueDepartmentTags: param });
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const handleRemoveDepartments = (param) => {
    return async () => {
      if (departmentTags.length > 1) {
        const modifiedDepartmentTags = departmentTags.filter(item => item !== param);
        setdepartmentTags(modifiedDepartmentTags);
        setUpdateBoxes(modifiedDepartmentTags);
        const statusUpdate = `Admin removed a department tag [${param}]`;
        setUpdateBoxes([statusUpdate, ...updateBoxes]); // Updates the update boxes locally in the parent
        try {
          await axios.post(`${BASE_URL}/api/actions/admin/${index}`, { issueindex: index, commentbox: statusUpdate, issueDepartmentTags: modifiedDepartmentTags });
        } catch (error) {
          console.error('Error during form submission:', error);
        }
      }
    };
  };

  useEffect(() => {
    setdepartmentTags(tags);
  }, []);

  return (
    <div className="department-selection">
      <div className="tag-sidebar-header">
        <h3>{name}</h3>
            <select
            id="department"
            // value={department}
            name="deptTagged"
            onChange={handleAddDepartment}
            className="department-select"
            required={departmentTags.length <= 0}
          >
            <option value="">Tag Department</option>
            {/* only render option if not present in departments array */}
            {departmentOptions.map((option) => {
              const { value, label } = option; // complications due to similar names of value and label
              if (!departmentTags.includes(value) && value !== "") {
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              }
              return null;
            })}
          </select>
      </div>
      <ul>
        {departmentTags.filter(item => item != null).map((tag, index) => (
          <li key={index}>
            <div className="round-tag ">
                <span>{tag}</span>{
                   <button className="tag-close-button" onClick={handleRemoveDepartments(tag)}>&times;</button>
                }
            </div>
          </li>

        ))}
      </ul>
    </div>
  );
}
export default DepartmentSelection;
