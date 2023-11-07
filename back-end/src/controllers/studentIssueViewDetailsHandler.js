
// const StudentIssue = require('../models/studentIssue');

// async function getStudentIssueDetails(req, res) {
//   try {
//     const { id } = req.params;
//     const studentIssue = await StudentIssue.findById(id);
//     if (!studentIssue) {
//       return res.status(404).json({ message: 'Student issue not found' });
//     }
//     return res.status(200).json(studentIssue);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// }

// module.exports = { getStudentIssueDetails };

import axios from "axios";

// The function retrieves all the issues related to this student
export async function studentIssueViewDetailsHandler(req, res) {
  const { paramName } = req.params;
  const { studentNetID } = req.params;
  try {
    // Assuming the data you want is at the response.data property
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/issues/student/${studentNetID}`
    );

    // Assuming response.data is an array of items and each item has a index
    const filteredData = response.data.filter(
      (item) => String(item.index) === String(paramName)
    );

    res.json(filteredData); // Send only the data that matches the specific issue index
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error retrieving data:", error.message);
    res.status(500).send("An error occurred while retrieving the data.");
  }
}