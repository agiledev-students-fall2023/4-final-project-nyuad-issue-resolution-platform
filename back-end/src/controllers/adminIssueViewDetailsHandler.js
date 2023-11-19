import { Issue } from '../../models/issues.mjs';

// The function retrieves all the issues related to this department with index
export async function adminIssueViewDetailsHandler(req, res) {
  const { paramName } = req.params;
  // const { department } = req.params;
  try {
    // Assuming the data you want is at the response.data property
    const result = Issue.find({ index: paramName });
    console.log(result);
    res.json(result); // Send only the data that matches the specific issue index
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error retrieving data:", error.message);
    res.status(500).send("An error occurred while retrieving the data.");
  }
}
