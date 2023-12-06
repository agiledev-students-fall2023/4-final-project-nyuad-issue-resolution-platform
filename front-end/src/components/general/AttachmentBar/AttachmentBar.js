/* eslint-disable */
import './AttachmentBar.css';
import { useState, useEffect } from 'react';
import FileUploadOverlay from '../FileUploadOverlay/FileUploadOverlay';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function AttachmentBar({ index, name, tags, fileNames, currentDepartment }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);


  const handleFileRemove = (fileIndex) => {
    // const newSelectedFiles = selectedFiles.filter((_, index) => index !== fileIndex);
    // setSelectedFiles(newSelectedFiles);
  };

  const openOverlay = () => {
    setIsOverlayVisible(true);
  };

  return (
    <div className="attachment-bar">
        <div className='attachment-header'>
          <h3>{name}</h3>
          <button className='fileoverlay_btn' onClick={openOverlay}> Upload Files</button>
        </div>
        <FileUploadOverlay index={index} currentDepartment={currentDepartment} isOverlayVisible={isOverlayVisible} setIsOverlayVisible={setIsOverlayVisible}/>  
        <div className="selected-files-and-departments">
          <div className="selected-files">
          <ul className="file-list">
          {fileNames.length > 0 && fileNames[0] ? (
          fileNames.map((file, index) => {
              return <li key={index} onClick={() => handleFileRemove(index)}>{file?.slice(25)}</li>;
          })
          ) :
           (
          <li>No files uploaded</li>
          )}
          </ul>
          </div>
        </div>
      </div>
  );
}

export default AttachmentBar;
