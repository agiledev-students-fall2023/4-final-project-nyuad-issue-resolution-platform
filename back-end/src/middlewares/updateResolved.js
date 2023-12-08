import IssueModel from "../../models/issueModel.js";
import moment from "moment";

export default async function updateResolved() {
  try {
    console.log("Updating issue resolved status...");
    // Calculate the time threshold (72 hours ago) in the "date/month/year" format
    const currentDate = moment();
    const thresholdDate = currentDate.subtract(72, "hours");

    // Find open issues with an empty comments array and created over 72 hours ago
    const openIssuesToUpdate = await IssueModel.find({
      currentStatus: "Action Required",
      isProposed: true,
      isProposedDate: { $lt: thresholdDate.format("DD/MM/YYYY") }
    });

    // Update the resolve status for each eligible issue to "Resolved"
    for (const issue of openIssuesToUpdate) {
      issue.comments.unshift("Issue automatically resolved by the system.");
      issue.currentPriority = "";
      issue.currentStatus = "Resolved";
      issue.isProposed = false;
      issue.isProposedDate = "";
      await issue.save();
    }
  } catch (error) {
    // Handle errors
    console.error("Error updating issue resolved status:", error.message);
  }
}
