/* eslint-disable */
import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import server from "../app.js";
import IssueModel from "../models/issueModel.js";

chai.use(chaiHttp);
process.env.NODE_ENV = "test";

// Integration tests for the createIssue.js file
describe("Integration Tests for Create Issue Endpoint", () => {
  let createdIssueIndex; // Variable to store the created issue's index

  describe("POST /api/actions/student/:studentNetID", () => {
    it("should create a new issue for a student", async () => {
      const studentNetID = "student";
      const issueData = {
        studentName: "student",
        issueTitle: "Test Issue",
        issueDesc: "This is a test issue.",
        deptTagged: "IT",
      };

      const res = await chai
        .request(server)
        .post(`/api/actions/student/${studentNetID}`)
        .field("studentName", issueData.studentName)
        .field("issueTitle", issueData.issueTitle)
        .field("issueDesc", issueData.issueDesc)
        .field("deptTagged", issueData.deptTagged);

      // Check that the response is correct
      assert.equal(res.status, 200);
      assert.equal(res.text, "Issue created successfully");

      // Query the database to find the recently created issue
      const createdIssue = await IssueModel.findOne({
        studentNetID: studentNetID,
        title: issueData.issueTitle,
        departments: issueData.deptTagged,
      });

      // Extract the created issue's index from the database
      if (createdIssue) {
        createdIssueIndex = createdIssue.index;
      }
    });

    // Cleanup step to delete the created issue after testing
    after(async () => {
        if (createdIssueIndex) {
          // Find and delete the issue by its index
          try {
            await IssueModel.deleteOne({ index: createdIssueIndex });
          } catch (error) {
            console.error(`Error deleting issue: ${error}`);
          }
        }
      });

    it("should handle errors gracefully for missing fields", async () => {
      const studentNetID = "student";
      const issueData = {
        studentName: "student",
        issueTitle: "Test Issue",
        issueDesc: "",
        deptTagged: "",
      };

      // Send the request with missing fields
      const res = await chai
        .request(server)
        .post(`/api/actions/student/${studentNetID}`)
        .field("studentName", issueData.studentName)
        .field("issueTitle", issueData.issueTitle)
        .field("deptTagged", issueData.deptTagged);

      // Check that the response is correct
      assert.equal(res.status, 500);
      assert.equal(res.text, "An error occurred while saving the data.");
    });
  });
});
/* eslint-enable */
