import Issue from '../../models/issueModel.js';

export async function adminPostHandler(req, res) {
  const { paramName } = req.params;
  const { department } = req.params;
  const newcomment = req.body.commentbox;
  const currentStatus = req.body.issueStatus;
  const currentPriority = req.body.issuePriority;
  const departmentTags = req.body.issueDepartmentTags;
  const isProposed = req.body.isProposed;
  try {
    const specificIssue = await Issue.findOne({ departments: department, index: paramName });
    if (newcomment !== undefined) {
      specificIssue.comments.unshift(newcomment);
    }
    if (currentStatus !== undefined) {
      specificIssue.currentStatus = currentStatus;
    }
    if (currentPriority !== undefined) {
      specificIssue.currentPriority = currentPriority;
    }
    if (departmentTags !== undefined && departmentTags.length !== 0) {
      specificIssue.departments = departmentTags;
    }
    if (req.files !== undefined) {
      const newfilesattachments = req.files.map(file => file.filename);
      if (specificIssue.attachments[0] == null) {
        specificIssue.attachments = newfilesattachments;
      } else {
        newfilesattachments.forEach(element => {
          specificIssue.attachments.push(element);
       });
      }
    }
    if (isProposed !== undefined) {
      specificIssue.isProposed = isProposed;
    }
    if (specificIssue.isProposed === true) {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      const isProposedDate = formattedDate;
      specificIssue.isProposedDate = isProposedDate;
    }
    const updatedIssue = await specificIssue.save();
    res.status(200).send("Success");
  } catch (error) {
    console.error('Error updating data:', error.message);
    res.status(500).send("An error occurred while updating the data.");
  }
}
