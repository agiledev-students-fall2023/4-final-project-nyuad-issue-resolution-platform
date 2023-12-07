/* eslint-disable no-unused-vars */
import Issue from "../../models/issueModel.js";

export async function createIssueHandler(req, res) {
  const { dateCreated, currentStatus, currentPriority } = req.body;

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  const issueDateCreated = dateCreated || formattedDate;
  const issueTimeCreated = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Dubai"
  });
  const attachments = req.files.map((file) => file.filename);
  const lastIssue = await Issue.findOne().sort({ index: -1 });
  const newIndex = lastIssue ? lastIssue.index + 1 : 1;

  const newIssue = new Issue({
    index: newIndex,
    studentNetID: req.params.studentNetID,
    studentName: req.body.studentName,
    title: req.body.issueTitle,
    description: req.body.issueDesc,
    attachments,
    departments: req.body.deptTagged.includes(",")
      ? req.body.deptTagged.split(",")
      : [req.body.deptTagged],
    comments: [],
    dateCreated: issueDateCreated,
    timeCreated: issueTimeCreated,
    currentStatus: "Open",
    currentPriority: "New",
    isProposed: false,
    isProposedDate: ""
  });

  try {
    await newIssue.save();
    res.status(200).send("Issue created successfully");
  } catch (error) {
    console.error("Error creating issue:", error.message);
    res.status(500).send("An error occurred while saving the data.");
  }
}
