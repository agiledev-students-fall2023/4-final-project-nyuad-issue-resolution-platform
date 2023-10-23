/* eslint-disable */
import React, { Component } from 'react';
import './CreateRequest.css';

export function CreateRequest() {
    const [issueTitle, setIssueTitle] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('department1');
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

    return (
        <div id="createRequestComponent" className={`request-container ${isVisible ? 'visible' : ''}`}>
            <div className="top-rectangle"></div>
            <div className="line"></div>

            <div className="label">
                <h2 className="create-request-title">Create Request</h2>
            </div>

            <div className="input-group issue-title-group">
                <label htmlFor="issueTitle" className="issue-title-label">Issue Title</label>
                <input
                    type="text"
                    id="issueTitle"
                    value={issueTitle}
                    onChange={handleIssueTitleChange}
                    className="issue-title-input"
                />
            </div>

            <div className="input-group description-group">
                <div>
                    <label htmlFor="description" className="description-label">Description</label>
                </div>
                <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="description-input"
                />
            </div>

            <div className="department-group">
                <div>
                    <label htmlFor="department" className="department-label">Select Department</label>
                </div>
                <select
                    id="department"
                    value={department}
                    onChange={handleDepartmentChange}
                    className="department-select"
                >
                    <option value="department1">Select Department</option>
                    <option value="department2">Dining</option>
                    <option value="department3">Residential Education</option>
                    <option value="department4">Global Education</option>
                    <option value="department5">Student Finance</option>
                </select>
            </div>

            <div className="input-group file-group">
                <div>
                    <label className='file-label'>Attach File(s)</label>
                </div>
                <input className='file-select' type="file" id="fileInput" onChange={handleFileChange} />
            </div>
            
            <button onClick={onClose}>Close</button>
        </div>
    );
}
