import Issue from '../../models/issueModel.js';

export async function adminPostHandler(req, res) {
  const issueindex = req.body.issueindex;
  const newcomment = req.body.commentbox;
  const currentStatus = req.body.issueStatus;
  const currentPriority = req.body.issuePriority;
  const departmentTags = req.body.issueDepartmentTags;
  const isProposed = req.body.isProposed;
  try {
    const specificIssue = await Issue.findOne({ index: issueindex });
    if (!specificIssue) {
      console.error('This specific issue could not found');
      return;
    }
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
    const updatedIssue = await specificIssue.save();
    console.log('Issue updated:', updatedIssue);
  } catch (err) {
    console.error('Error updating issue:', err);
  }
  res.status(200).send("Success");
}
