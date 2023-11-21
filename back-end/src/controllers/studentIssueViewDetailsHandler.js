import Issue from '../../models/issueModel.js';

// The function retrieves all the issues related to this student
export async function studentIssueViewDetailsHandler(req, res) {
  const { paramName } = req.params;
  const { studentNetID } = req.params;

  if (!studentNetID) {
    return res.status(400).send("Missing or invalid studentNetID.");
  }

  if (!paramName) {
    return res.status(400).send("Missing or invalid issue index.");
  }

  try {

    const response = await Issue.find({ index: paramName });

    // Check if any data is returned for the student
    if (!response || response.length === 0) {
      return res.status(500).send("No issues found for the given studentNetID.");
    }

    // Check if the specific issue index exists
    if (response.length === 0) {
      return res.status(500).send("Issue with the given index not found.");
    }

    res.json(response); // Send only the data that matches the specific issue index
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error retrieving data:", error.message);
    res.status(500).send("An error occurred while retrieving the data.");
  }
}
