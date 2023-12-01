/* eslint-disable */
import chai, { assert } from "chai";
import IssueModel from "../models/issueModel.js";
import chaiHttp from "chai-http";
import server from "../app.js";

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

// Integration tests for the studentIssues.js file
describe("Integration Tests for Student Issue Handler Endpoint", () => {
  describe("GET /api/issues/student/:paramName", () => {
    it("should retrieve all issues for a valid student NetID", async () => {
      const paramName = "student";
      const res = await chai
        .request(server)
        .get(`/api/issues/student/${paramName}`);
      // Check that the response is correct
      assert.equal(res.status, 200);
      // Check that the response is an array
      assert.isArray(res.body);
      // Check that the response is the same length as the number of issues
      const userIssues = await IssueModel.find({ "studentNetID": paramName });
      // Check that the response is the same length as the number of issues of that user
      assert.equal(res.body.length, userIssues.length);
    });

    it("should handle errors gracefully for an invalid student NetID", async () => {
      const paramName = "invalidStudentNetID";
      const res = await chai
        .request(server)
        .get(`/api/issues/student/${paramName}`);
      assert.equal(res.status, 500); 
      assert.equal(res.text, "User does not exist.");
    });
  });

  describe("GET /api/issues/student/:studentNetID/:paramName", () => {
    it("should retrieve the issue for a valid student NetID and issue index", async () => {
      const studentNetID = "student";
      const paramName = "101";
      const res = await chai
        .request(server)
        .get(`/api/issues/student/${studentNetID}/${paramName}`);
      // Check that the response is correct
      assert.equal(res.status, 200);
      // Check that the response is an array
      assert.isArray(res.body);
      // Check that the response is the same length as the number of issues
      const userIssues = await IssueModel.find({ "studentNetID": studentNetID, "index": paramName });
      // Check that the response is the same length as the number of issues of that user
      assert.equal(res.body.length, userIssues.length);
    });

    it("should handle errors gracefully for an invalid issue index", async () => {
      const studentNetID = "student";
      const paramName = "01";
      const res = await chai
        .request(server)
        .get(`/api/issues/student/${studentNetID}/${paramName}`);
      assert.equal(res.status, 500); 
      assert.equal(res.text, "No issues found for the given studentNetID and index.");
    });
  });
});

/* eslint-enable */
