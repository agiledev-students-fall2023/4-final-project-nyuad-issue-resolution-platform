/* eslint-disable */
import './AttachmentBar.css';
import { useState, useEffect} from 'react';
import FileUploadOverlay from '../FileUploadOverlay/FileUploadOverlay';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function AttachmentBar({ index, name, tags, fileNames, currentDepartment,isAdmin,studentNetID}) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleFileRemove = (fileIndex) => {
    // const newSelectedFiles = selectedFiles.filter((_, index) => index !== fileIndex);
    // setSelectedFiles(newSelectedFiles);
  };

  const downloadFile = async (fileIndex) => {

    const fileName = fileNames[fileIndex];

    axios({
      url: `${BASE_URL}/download/${fileName}`,
      method: 'GET',
      responseType: 'blob', // Important to handle binary files
    }).then((response) => {

      const file = new Blob(
        [response.data], 
        { type: 'application/octet-stream' }); // Change type based on your file type
    
      const fileURL = URL.createObjectURL(file);
  
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', fileName.slice(25));
      document.body.appendChild(fileLink);
    
      fileLink.click();
    
      fileLink.remove();
    
      URL.revokeObjectURL(fileURL);
    }).catch(error => console.error('Download error:', error));
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
        <FileUploadOverlay index={index} currentDepartment={currentDepartment} isOverlayVisible={isOverlayVisible} setIsOverlayVisible={setIsOverlayVisible} isAdmin={isAdmin} studentNetID={studentNetID}/>  
        <div className="selected-files-and-departments">
          <div className="selected-files">
          <ul className="file-list">
          {fileNames.length > 0 && fileNames[0] ? (
          fileNames.map((file, index) => {
              return <li key={index} onClick={() => downloadFile(index)}>{file?.slice(25)}</li>;
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
