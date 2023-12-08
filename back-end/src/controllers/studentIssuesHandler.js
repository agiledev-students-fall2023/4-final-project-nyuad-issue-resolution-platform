/* eslint-disable brace-style */
import IssueModel from "../../models/issueModel.js";
import User from "../../models/UserModel.js";

export async function issueRetrievalHandler(req, res) {
  const { paramName } = req.params;

  try {
    // Check if user exists
    const user = await User.findOne({
      netId: paramName
    });
    // If user does not exist, return error
    if (!user) {
      res.status(500).send("User does not exist.");
    }
    // If user exists, return all issues for that user
    else {
      const issues = await IssueModel.find({ studentNetID: paramName });
      res.json(issues);
    }
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    res.status(500).send("An error occurred while retrieving the data.");
  }
}
