import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import server from "../app.js"; 
import IssueModel from "../models/issueModel.js"; 

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

describe("Integration Tests for Student Issue Update Handler", () => {
  let paramName = 101;
  let studentNetID = "student";
  let currentStatus;
  describe("POST /api/actions/student/:studentNetID/:paramName", () => {
    it("should update the issue's comment for a valid student NetID and issue index", async () => {
      const newComment = "This is a new comment.";

      const res = await chai
        .request(server)
        .post(`/api/actions/student/${studentNetID}/${paramName}`)
        .send({ comments: newComment });

      // Check that the response is correct
      assert.equal(res.status, 200);
      assert.equal(res.body.message, "Issue updated successfully");

      // Query the database to find the updated issue
      const updatedIssue = await IssueModel.findOne({ index: paramName });

      // Check that the comment is added to the issue
      assert.include(updatedIssue.comments, newComment);
    });

    it("should update the issue's status for a valid student NetID and issue index", async () => {
      const currentIssue = await IssueModel.findOne({ studentNetID:studentNetID, index: paramName });
      currentStatus = currentIssue.currentStatus;   
      const newStatus = "In Progress";
      const res = await chai
        .request(server)
        .post(`/api/actions/student/${studentNetID}/${paramName}`)
        .send({ currentStatus: newStatus });

      // Check that the response is correct
      assert.equal(res.status, 200);
      assert.equal(res.body.message, "Issue updated successfully");

      // Query the database to find the updated issue
      const updatedIssue = await IssueModel.findOne({ index: paramName });

      // Check that the status is updated
      assert.equal(updatedIssue.currentStatus, newStatus);
    });

    it("should handle errors gracefully for an invalid student NetID and issue index", async () => {
      paramName = 1;
      const newStatus = "In Progress";
      const newComment = "This is a new comment.";
      const res = await chai
        .request(server)
        .post(`/api/actions/student/${studentNetID}/${paramName}`)
        .send({ comments:newComment, currentStatus: newStatus });

      // Check that the response indicates an error
      assert.equal(res.status, 500);
      assert.equal(res.text, "An error occurred while updating the data.");
      paramName = 101;
    });
    
    after(async () => {    
          try {
            // Find the issue in the database by its index
            const issue = await IssueModel.findOne({ index: paramName });
            // Remove the last comment from the comments array
            issue.comments.pop();
            // Revert to the previous status
            issue.currentStatus = currentStatus;
            // Save the updated issue back to the database
            await issue.save();
          } catch (error) {
            // Handle errors
            console.error("Error:", error.message);
          }
      });
  });
});
