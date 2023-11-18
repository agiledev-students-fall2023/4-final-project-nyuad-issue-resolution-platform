import { publicpath } from "../../app.js";
import { promises as fs } from 'fs';
import axios from 'axios';

// The function updates the issue related to this student
export async function studentIssueUpdateHandler(req, res) {

    const { studentNetID, 
        paramName } = req.params;

    const issueindex = req.body.issueindex;
    const newcomment = req.body.comments;
    const currentStatus = req.body.currentStatus;
    const filePath = publicpath + "/json/mockapi.json";
    const fileContent = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);


  //   const specificIssue = jsonData.filter(
  //       (item) => String(item.index) === String(issueindex)
  //     );

  //   if (newcomment !== undefined) {
  //       specificIssue[0].comments.unshift(newcomment);
  //   }
  //   if (currentStatus !== undefined) {
  //       specificIssue[0].currentStatus = currentStatus;
  //   }

  //   fs.writeFile(filePath, JSON.stringify(jsonData, null, '\t'), (err) => {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //         console.log('File written successfully.');
  //       }
  //     });

  // const updateData = req.body; // This should contain the data you want to update

  try {
    // Make a POST request to the backend API to update the student issue
    // const response = await axios.post(
    //   `${process.env.BACKEND_URL}/api/actions/student/${studentNetID}`,
    //   updateData
    // );
    
    const response = await axios.post(
      `${process.env.BACKEND_URL}/json/mockapi.json`,
      updateData // will be replaced with db call
    );

    const specificIssue = jsonData.filter(
        (item) => String(item.index) === String(paramName)
      );

    if (newcomment !== undefined) {
        specificIssue[0].comments.unshift(newcomment);
    }
    if (currentStatus !== undefined) {
        specificIssue[0].currentStatus = currentStatus;
    }

    fs.writeFile(filePath, JSON.stringify(jsonData, null, '\t'), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('File written successfully.');
        }
      });


    // Send a response back to the client indicating success
    res.json({ message: 'Issue updated successfully', updatedIssue: response.data });
  } catch (error) {
    // Log the error and send an appropriate response
    console.error('Error updating data:', error.message);
    res.status(500).send('An error occurred while updating the data.');
  }
}
