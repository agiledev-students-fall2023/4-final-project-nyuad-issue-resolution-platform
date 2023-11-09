// studentIssueUpdateHandler.js

import axios from 'axios';

// The function updates the issue related to this student
export async function studentIssueUpdateHandler(req, res) {
  const { studentNetID, 
    paramName } = req.params;
  const updateData = req.body; // This should contain the data you want to update

  try {
    // Make a POST request to the backend API to update the student issue
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/actions/student/${studentNetID}/${paramName}`,
      updateData
    );

    // Send a response back to the client indicating success
    res.json({ message: 'Issue updated successfully', updatedIssue: response.data });
  } catch (error) {
    // Log the error and send an appropriate response
    console.error('Error updating data:', error.message);
    res.status(500).send('An error occurred while updating the data.');
  }
}
