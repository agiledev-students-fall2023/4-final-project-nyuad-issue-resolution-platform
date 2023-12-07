import IssueModel from "../../models/issueModel.js";
import moment from "moment";

export default async function updatePriorityForOpenIssues() {
  try {
    console.log("Updating issue priorities...");
    // Calculate the time threshold (72 hours ago) in the "date/month/year" format
    const currentDate = moment();
    const thresholdDate = currentDate.subtract(72, "hours");

    // Find open issues with an empty comments array and created over 72 hours ago
    const openIssuesToUpdate = await IssueModel.find({
      currentStatus: "Open",
      comments: { $size: 0 },
      dateCreated: { $lt: thresholdDate.format("DD/MM/YYYY") }
    });

    // Update the priority of each eligible issue to "High Priority"
    for (const issue of openIssuesToUpdate) {
      issue.currentPriority = "High Priority";
      await issue.save();
    }
  } catch (error) {
    // Handle errors
    console.error("Error updating issue priorities:", error.message);
  }
}
