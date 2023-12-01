/* eslint-disable */
import chai, { assert } from "chai";
import IssueModel from "../models/issueModel.js";
import chaiHttp from "chai-http";
import server from "../app.js";

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

// Integration tests for the adminIssues.js file
describe("Integration Tests for Admin Issue Handler Endpoint", () => {
    describe("GET /api/issues/admin/:paramName", () => {
        it("should retrieve all issues for a valid admin user", async () => {
            const paramName = "admin";
            const res = await chai
                .request(server)
                .get(`/api/issues/admin/${paramName}`);
            // Check that the response is correct
            assert.equal(res.status, 200);
            // Check that the response is an array
            assert.isArray(res.body);
            // Check that the response is the same length as the number of issues
            const userIssues = await IssueModel.find({ "departments": paramName });
            // Check that the response is the same length as the number of issues of that user
            assert.equal(res.body.length, userIssues.length);
        });

        it("should handle errors gracefully for an invalid admin user", async () => {
            const paramName = "invalid";
            const res = await chai
                .request(server)
                .get(`/api/issues/admin/${paramName}`);
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, []);
        });
    });
    describe("GET /api/issues/admin/:department/:paramName", () => {
        it ("should retrieve the issue for a valid admin user, department, and issue index", async () => {
            const department = "admin";
            const paramName = "101";
            const res = await chai
                .request(server)
                .get(`/api/issues/admin/${department}/${paramName}`);
            // Check that the response is correct
            assert.equal(res.status, 200);
            // Check that the response is an array
            assert.isArray(res.body);
            // Check that the response is the same length as the number of issues
            const userIssues = await IssueModel.find({ "departments": department, "index": paramName });
            // Check that the response is the same length as the number of issues of that user
            assert.equal(res.body.length, userIssues.length);
        });
        it ("should handle errors gracefully for an invalid department", async () => {
            const department = "invalid";
            const paramName = "101";
            const res = await chai
                .request(server)
                .get(`/api/issues/admin/${department}/${paramName}`);
            assert.equal(res.status, 500);
            assert.equal(res.text, "No issues found for the given department and index.");
        });
    });
});
/* eslint-enable */
