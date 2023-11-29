/* eslint-disable */
import './AttachmentBar.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function AttachmentBar({ index, name, tags, fileNames, currentDepartment }) {
  const [departmentTags, setdepartmentTags] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesname, setSelectedFilesname] = useState([]);


  const handleFileChange = (event) => {
    setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
    if(event.target.files.length > 0) {
        const fileName  = event.target.files[0].name;
        setSelectedFilesname([fileName,...selectedFilesname]);
        postAttachments([fileName,...selectedFilesname]);
       
    }
  };
  const handleFileRemove = (fileIndex) => {
    const newSelectedFiles = selectedFiles.filter((_, index) => index !== fileIndex);
    const newSelectedFilesname = selectedFilesname.filter((_, index) => index !== fileIndex);
    setSelectedFiles(newSelectedFiles);
    setSelectedFilesname(newSelectedFilesname);
    postAttachments(newSelectedFilesname);
};

  const postAttachments = async (param) => {
    console.log(param);
    try {
      await axios.post(`${BASE_URL}/api/actions/admin/${currentDepartment}`, { issueindex: index, attachments : param });
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };


  useEffect(() => {
    setSelectedFilesname(fileNames);
    setdepartmentTags(tags);
  }, []);

  return (
    <div className="attachment-bar">
        <div className='attachment-header'>
          <h3>{name}</h3>
          <label  className="file-select-label">
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
          <div className="selected-files">
          <ul className="file-list">
          {selectedFilesname.length > 0 ? (
          selectedFilesname.map((file, index) => {
          return <li key={index} onClick={() => handleFileRemove(index)}>{file}</li>;
          })
          ) : (
          <li>No files uploaded</li>
          )}
          </ul>
          </div>
        </div>
      </div>
  );
}

export default AttachmentBar;
