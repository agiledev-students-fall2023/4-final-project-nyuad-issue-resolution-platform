import Issue from '../../models/issueModel.js';

export async function studentIssueViewDetailsHandler(req, res) {
  const { paramName } = req.params; // Get the issue index from request params
  const { studentNetID } = req.params; // Get the studentNetID from request params

  // Check if studentNetID is missing or invalid
  if (!studentNetID) {
    return res.status(400).send("Missing or invalid studentNetID.");
  }

  // Check if paramName (issue index) is missing or invalid
  if (!paramName) {
    return res.status(400).send("Missing or invalid issue index.");
  }

  try {
    // Query the database to find issues that match both studentNetID and index
    const response = await Issue.find({ studentNetID: studentNetID, index: paramName });

    // Check if no matching issues are found
    if (!response || response.length === 0) {
      return res.status(500).send("No issues found for the given studentNetID and index.");
    }
    res.json(response);
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    res.status(500).send("An error occurred while retrieving the data.");
  }
}
