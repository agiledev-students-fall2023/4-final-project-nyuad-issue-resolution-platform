/* eslint-disable */
import { useEffect, useState } from 'react';
import './FileUploadOverlay.css'
import '../AttachmentBar/AttachmentBar.css'

const FileUploadOverlay = ({index, currentDepartment,isOverlayVisible, setIsOverlayVisible}) => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
      setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
    };

    const handleFileRemove = (fileIndex) => {
      const newSelectedFiles = selectedFiles.filter((_, index) => index !== fileIndex);
      setSelectedFiles(newSelectedFiles);
    };
  
  const handleFormSubmit = async (e) => {
    const formData = new FormData(e.target);
    e.preventDefault();
    for (let i = 0; i < selectedFiles.length - 1; i++) {
      formData.append('uploadedFiles', selectedFiles[i]);
    }

    formData.append('issueindex', index);
  
    try {
      const response = await fetch(`${BASE_URL}/api/actions/admin/${currentDepartment}`, {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        console.log("Submitted success");
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
    closeOverlay()
    window.location.reload();
  };

    const closeOverlay = () => {
        setIsOverlayVisible(false);
    };

    useEffect(() => {
    }, []);
    return (
        <div>
            {isOverlayVisible && (
                <div className='overlay-style'>
                    <div className='modal-style'>
                        <button className="close-btn" onClick={closeOverlay}>X</button>
                        <div className='attachment-header'>
                        <label className="file-select-label">
                        Attach file(s)
                            <form onSubmit={handleFormSubmit}>
                                <input
                                className="file-select"
                                type="file"
                                id="fileInput"
                                name="uploadedFiles"
                                onChange={handleFileChange}
                                />
                                <div className="selected-files-and-departments">
                                    <div className="selected-files">
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
                                <button type="submit" className="submit-button">
                                    Submit
                                </button>
                            </form>
                        </label>
                        </div>
                    </div>
                       
                  </div>
            )}
        </div>
    );
};



export default FileUploadOverlay;
