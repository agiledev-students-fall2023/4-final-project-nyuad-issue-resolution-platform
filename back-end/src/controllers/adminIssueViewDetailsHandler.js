import Issue from "../../models/issueModel.js";

export async function adminIssueViewDetailsHandler(req, res) {
  const { paramName } = req.params; // Get the issue index from request params
  const { department } = req.params; // Get the department from request params

  // Check if department is missing or invalid
  if (!department) {
    return res.status(400).send("Missing or invalid department.");
  }
  // Check if paramName (issue index) is missing or invalid
  if (!paramName) {
    return res.status(400).send("Missing or invalid issue index.");
  }

  try {
    // Query the database to find issues that match both department and index
    const response = await Issue.find({
      departments: department,
      index: paramName
    });
    // Check if no matching issues are found
    if (!response || response.length === 0) {
      return res
        .status(500)
        .send("No issues found for the given department and index.");
    }
    res.json(response); // Send only the data that matches the specific issue index
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error retrieving data:", error.message);
    res.status(500).send("An error occurred while retrieving the data.");
  }
}
