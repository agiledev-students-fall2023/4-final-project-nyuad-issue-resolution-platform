/* eslint-disable */
import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import server from "../app.js";
import IssueModel from "../models/issueModel.js";

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

// Integration tests for the adminPostHandler.js file
describe("Integration Tests for Admin Post Handler Endpoint", () => {
  let paramName = 101;
  let department = "admin";
  let currentStatus;
  let currentPriority;
  
  describe("POST /api/actions/admin/:department/:paramName", () => {
    it("should update the issue's comment for a valid department and issue index", async () => {
      const newComment = "This is a new comment.";

      const res = await chai
        .request(server)
        .post(`/api/actions/admin/${department}/${paramName}`)
        .send({ commentbox: newComment });

      // Check that the response is correct
      assert.equal(res.status, 200);
      assert.equal(res.text, "Success");

      // Query the database to find the updated issue
      const updatedIssue = await IssueModel.findOne({ departments: department, index: paramName });

      // Check that the comment is added to the issue
      assert.include(updatedIssue.comments, newComment);
    });

    it("should update the issue's status for a valid department and issue index", async () => {
      const currentIssue = await IssueModel.findOne({ departments: department, index: paramName });
      currentStatus = currentIssue.currentStatus;   
      const newStatus = "In Progress";
      const res = await chai
        .request(server)
        .post(`/api/actions/admin/${department}/${paramName}`)
        .send({ issueStatus: newStatus });

      // Check that the response is correct
      assert.equal(res.status, 200);
      assert.equal(res.text, "Success");

      // Query the database to find the updated issue
      const updatedIssue = await IssueModel.findOne({ departments: department, index: paramName });

      // Check that the status is updated
      assert.equal(updatedIssue.currentStatus, newStatus);
    });

    it("should update the issue's priority for a valid department and issue index", async () => {
      const currentIssue = await IssueModel.findOne({ departments: department, index: paramName });
      currentPriority = currentIssue.currentPriority;
      const newPriority = "New"; // Change this to your desired priority value
      const res = await chai
        .request(server)
        .post(`/api/actions/admin/${department}/${paramName}`)
        .send({ issuePriority: newPriority });

      // Check that the response is correct
      assert.equal(res.status, 200);
      assert.equal(res.text, "Success");

      // Query the database to find the updated issue
      const updatedIssue = await IssueModel.findOne({ departments: department, index: paramName });

      // Check that the priority is updated
      assert.equal(updatedIssue.currentPriority, newPriority);
    });

    it("should update the issue's department tags for a valid department and issue index", async () => {
      const currentIssue = await IssueModel.findOne({ departments: department, index: paramName });
      const newDepartmentTags = ["admin", "IT"];
      const res = await chai
        .request(server)
        .post(`/api/actions/admin/${department}/${paramName}`)
        .send({ issueDepartmentTags: newDepartmentTags });

      // Check that the response is correct
      assert.equal(res.status, 200);
      assert.equal(res.text, "Success");

      // Query the database to find the updated issue
      const updatedIssue = await IssueModel.findOne({ departments: department, index: paramName });

      // Check that the department tags are updated
      assert.deepEqual(updatedIssue.departments, newDepartmentTags);
    });

    it("should handle errors gracefully for an invalid department and issue index", async () => {
      paramName = 1;
      const newStatus = "In Progress";
      const newComment = "This is a new comment.";
      const res = await chai
        .request(server)
        .post(`/api/actions/admin/${department}/${paramName}`)
        .send({ commentbox: newComment, issueStatus: newStatus });

      console.log(res.text);
      // Check that the response indicates an error
      assert.equal(res.status, 500);
      assert.equal(res.text, "An error occurred while updating the data.");
      paramName = 101; // Reset paramName to its original value
    });

    after(async () => {    
        try {
          // Find the issue in the database by its index
          const issue = await IssueModel.findOne({ index: paramName });
          // Remove the last comment from the comments array
          issue.comments.pop();
          // Revert to the previous status
          issue.currentStatus = currentStatus;
          // Revert to the previous priority
          issue.currentPriority = currentPriority;
          // Revert to the previous department tags
          issue.departments = ["admin"];
          // Save the updated issue back to the database
          await issue.save();
        } catch (error) {
          // Handle errors
          console.error("Error:", error.message);
        }
    });
  });
});
/* eslint-enable */