import React, { Component } from 'react';
import './CreateRequest.css';

class CreateRequest extends Component {
    constructor() {
        super();
        this.state = {
            issueTitle: '',
            description: '',
            department: 'department1',
            selectedFile: null,
        };
    }

    handleIssueTitleChange = (event) => {
        this.setState({ issueTitle: event.target.value });
    };

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    };

    handleDepartmentChange = (event) => {
        this.setState({ department: event.target.value });
    };

    handleFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    render() {
        return (
            <div id="createRequestComponent" className="request-container">
                <div className="top-rectangle"></div>
                <div className= "line"></div>

                <div className="label">
                    <h2 className="create-request-title">Create Request</h2>
                </div>

               <div className="input-group issue-title-group">
                    <label htmlFor="issueTitle" className="issue-title-label">Issue Title</label>
                    <input
                        type="text"
                        id="issueTitle"
                        value={this.state.issueTitle}
                        onChange={this.handleIssueTitleChange}
                        className="issue-title-input"
                    />
                </div>


                
                <div className="input-group description-group">
                    <div>
                    <label htmlFor="description" className="description-label">Description</label>
                    </div>
                    <textarea
                        id="description"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                        className="description-input"
                    />
                </div>



                <div className="department-group">
                    <div>
                    <label htmlFor="department" className="department-label">Select Department</label>
                    </div>
                    <select
                        id="department"
                        value={this.state.department}
                        onChange={this.handleDepartmentChange}
                        className="department-select"
                    >
                        <option value="department1">Select Departement </option>
                        <option value="department2">Dining</option>
                        <option value="department3">Resedential Education</option>
                        <option value="department4">Global Education</option>
                        <option value="department5">Student Finance</option>
                        {/* Add more department options as needed */}
                    </select>
                </div>

                
                <div className="input-group file-group">
                    <div>
                    <label className='file-label'>Attach File(s)</label>
                    </div>
                    <input className= 'file-select' type="file" id="fileInput" onChange={this.handleFileChange} />
                </div>
            </div>
        );
    }
}

export default CreateRequest;
