import { useState } from "react"; // Import useState here
import closebutton from "../../../assets/images/cross1.png";
import "./CreateRequest.css";

export function CreateRequest({ isVisible, onClose }) {
  const [issueTitle, setIssueTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("department1");
  const [selectedFile, setSelectedFile] = useState(null);
  const handleIssueTitleChange = (event) => {
    setIssueTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("issueTitle", issueTitle);
    formData.append("description", description);
    formData.append("department", department);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    const apiUrl = "https://hasiburratul.github.io/mock-api/MOCK_DATA.json";
    try {
      const response = await fetch(apiUrl, {
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
          value={issueTitle}
          onChange={handleIssueTitleChange}
          className="issue-title-input"
          required
        />
      </div>

      <div className="input-group description-group">
        <label htmlFor="description" className="description-label">
          Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="description-input"
          required
        />
      </div>

      <div className="department-file-group">
        <div className="department-group">
          <select
            id="department"
            value={department}
            onChange={handleDepartmentChange}
            className="department-select"
            required
          >
            <option value="" selected>
              Select Department
            </option>
            <option value="department2">Dining</option>
            <option value="department3">Residential Education</option>
            <option value="department4">Global Education</option>
            <option value="department5">Student Finance</option>
          </select>
        </div>

        <label className="file-select-label">
          Attach file(s)
          <input
            className="file-select"
            type="file"
            id="fileInput"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="selected-files-and-departments">
        <div className="selected-departments">
          <p>Selected Departments:</p>
        </div>
        <div className="selected-files">
          <p>Uploaded Files:</p>
        </div>
      </div>

      <div className="submit-button-container">
        <button type="submit" className="submit-button">
          Post Request
        </button>
      </div>
    </form>
  );
}
