import Issue from '../../models/issueModel.js';

// The function updates the issue related to this student
export async function studentIssueUpdateHandler(req, res) {

    const issueindex = req.body.issueindex;
    const newcomment = req.body.comments;
    const currentStatus = req.body.currentStatus;

  try {

    const specificIssue = await Issue.findOne({ index: issueindex });

    if (newcomment !== undefined) {
        specificIssue.comments.unshift(newcomment);
    }
    if (currentStatus !== undefined) {
        specificIssue.currentStatus = currentStatus;
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
