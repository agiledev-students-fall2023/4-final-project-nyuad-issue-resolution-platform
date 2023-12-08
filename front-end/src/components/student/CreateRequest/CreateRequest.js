import { useState } from "react"; // Import useState here
import closebutton from "../../../assets/images/cross1.png";
import "./CreateRequest.css";

export function CreateRequest({ isVisible, onClose, departmentOptions, studentName, studentNetID }) {
  const [departments, setDepartments] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const handleDepartmentChange = (event) => {
    setDepartments([...departments, event.target.value]);
  };
  const handleDeptRemove = (event) => {
    const departmentToRemove = event.target.innerText;
    setDepartments(
      departments.filter((department) => department !== departmentToRemove)
    );
  };
  const handleFileChange = (event) => {
    setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
  };
  const handleFileRemove = (fileIndex) => {
    // Filter out the file at the specified index
    const newSelectedFiles = selectedFiles.filter((_, index) => index !== fileIndex);
    setSelectedFiles(newSelectedFiles);
};
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('studentNetID', studentNetID);
    formData.append('studentName', studentName);
    formData.set("deptTagged", departments);
    for (let i = 0; i < selectedFiles.length - 1; i++) {
      formData.append('uploadedFiles', selectedFiles[i]);
    }
    try {
      const response = await fetch(`${BASE_URL}/api/actions/student/${studentNetID}`, {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        onClose(); // clse
      } else {
        console.error(
          "Error during form submission:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      id="createRequestComponent"
      className={`create-request-component-student ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="title-container">
        <h1 className="create-request-title">Create Request</h1>
        <img src={closebutton} className="close-button" onClick={onClose} />
      </div>
      <div className="input-group issue-title-group">
        <label htmlFor="issueTitle" className="issue-title-label">
          Issue Title
        </label>
        <input
          type="text"
          id="issueTitle"
          className="issue-title-input"
          required
          name="issueTitle"
        />
      </div>
      <div className="input-group description-group">
        <label htmlFor="description" className="description-label">
          Description
        </label>
        <textarea
          id="description"
          className="description-input"
          name="issueDesc"
          required
        />
      </div>
      <div className="department-file-group">
        <div className="department-group">
          <select
            id="department"
            // value={department}
            name="deptTagged"
            onChange={handleDepartmentChange}
            className="department-select"
            required={departments.length <= 0}
          >
            <option value="">Select Department</option>
            {/* only render option if not present in departments array */}
            {departmentOptions.map((option) => {
              const { value, label } = option; // complications due to similar names of value and label
              if (!departments.includes(value) && value !== "") {
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
        <label className="file-select-label">
          Attach file(s)
          <input
            className="file-select"
            type="file"
            id="fileInput"
            name="uploadedFiles"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="selected-files-and-departments">
        <div className="selected-departments">
          <p>Selected Departments:</p>
          <div className="department-list">
            {departments.map((department) => {
              return (
                <p key={department} onClick={handleDeptRemove}>
                  {department}
                </p>
              );
            })}
          </div>
        </div>
        <div className="selected-files">
          <p>Uploaded Files:</p>
          <ul className="file-list">
          {selectedFiles.length > 0 ? (
           selectedFiles.map((file, index) => {
          return <li key={index} onClick={() => handleFileRemove(index)}>{file.name}</li>;
  })
) : (
  <li>No files uploaded</li>
)}
          </ul>
        </div>
      </div>
      <div className="submit-button-container">
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
}
