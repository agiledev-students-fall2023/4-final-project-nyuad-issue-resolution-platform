import Issue from '../../models/issueModel.js';

// The function updates the issue related to this student
export async function studentIssueUpdateHandler(req, res) {
    const { paramName } = req.params; // Get the issue index from request params
    const { studentNetID } = req.params; // Get the studentNetID from request params
    const newcomment = req.body.comments;
    const currentStatus = req.body.currentStatus;
    const currentPriority = req.body.currentPriority;
    const isProposed = req.body.isProposed;

  try {

    const specificIssue = await Issue.findOne({ studentNetID:studentNetID, index: paramName });

    if (newcomment !== undefined) {
        specificIssue.comments.unshift(newcomment);
    }
    if (currentStatus !== undefined) {
        specificIssue.currentStatus = currentStatus;
    }
    if (currentPriority !== undefined) {
      specificIssue.currentPriority = currentPriority;
    }
    if (isProposed !== undefined) {
      specificIssue.isProposed = isProposed;
    } 

    if (specificIssue.currentStatus === 'Resolved') {
      specificIssue.currentPriority = "";
    }

    const updatedIssue = await specificIssue.save();

    // Send a response back to the client indicating success
    res.json({ message: 'Issue updated successfully', updatedIssue: updatedIssue });
  } catch (error) {
    // Log the error and send an appropriate response
    console.error('Error updating data:', error.message);
    res.status(500).send('An error occurred while updating the data.');
  }
}
