/* eslint-disable */

// Unit Testing
import chai, { assert } from "chai";
import sinon from "sinon";
import axios from "axios";
import fs from "fs/promises";
import { adminIssueViewDetailsHandler } from "../src/controllers/adminIssueViewDetailsHandler.js";

const data = await fs.readFile("./public/json/mockapi.json", "utf8");
const mockData = JSON.parse(data);
// Filter the mock data to match the handler's expected behavior

const filteredData = mockData.filter(
  (item) => String(item.index) === String("3")
);

describe("Unit Tests for Retrieval of Admin specific indexed issue of a department", () => {
  let req, res, axiosGetStub;
  let sendSpy, jsonSpy;

  beforeEach(() => {
    req = { params: { paramName: "3" } };
    res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ send: sinon.spy() }) // Stubbed here
    };
    sendSpy = res.status().send; // Save a reference to the send spy created above
    jsonSpy = res.json; // Save a reference to the json spy
    axiosGetStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    sinon.restore(); // Restores all stubs and spies created through sinon
  });

  it('should filter and return the correct number of data records for the specific indexed issue in that department"', async () => {
    // Stub the axios call to resolve with the entire mock data
    axiosGetStub.resolves({ data: mockData });

    // Execute the handler
    await adminIssueViewDetailsHandler(req, res);

    // Assert the axios call was made once
    assert(axiosGetStub.calledOnce);
    // Assert the correct amount of data is returned
    assert.equal(
      res.json.firstCall.args[0].length,
      filteredData.length,
      "Number of records should match the filtered data length"
    );
    // Assert the returned data matches the filtered data
    assert.deepEqual(
      res.json.firstCall.args[0],
      filteredData,
      "Returned data should match the filtered data"
    );
  });

  // Edge Case Test Case
  it('should return an empty array when specific index of the issue is not found', async () => {
    req.params.paramName = "darkSoul";
    axiosGetStub.resolves({ data: mockData });
    await adminIssueViewDetailsHandler(req, res);
    assert.isTrue(axiosGetStub.calledOnce, "axios.get should be called once");
    assert.equal(
        res.json.firstCall.args[0].length,
        0,
        "Number of records should be 0 when paramName is not found"
    );
  });
});

// Integration Testing

import chaiHttp from "chai-http";
chai.use(chaiHttp);

describe("Integration Tests for Retrieval of Admin specific indexed issue of a department Endpoints", () => {
  describe("GET /api/issues/student/:department/:paramName", () => {
    it("should retrieve issues for a given department with a specific issue index", async () => {
      const department  = "IT";
      const issueindex  = "3";
      const res = await chai
        .request("http://localhost:5000")
        .get(`/api/issues/admin/${department}/${issueindex}`);

      assert.equal(res.status, 200, "Response status should be 200");
      assert.isArray(res.body, "Response body should be an array");
      assert.lengthOf(
        res.body,
        filteredData.length,
        `Response body should have ${filteredData.length} records`
      );

      // Check if each record in the response matches the corresponding record in filteredData
      res.body.forEach((record, index) => {
        assert.deepEqual(
          record,
          filteredData[index],
          `Record at index ${index} should match the expected data`
        );
      });
    });

    it("should handle requests for a non-existent department & non existent issue index gracefully", async () => {
      const nonExistentDepartment  = "nonexistent";
      const nonExistentissueindex  = "nonexistent";
      const res = await chai
        .request("http://localhost:5000")
        .get(`/api/issues/admin/${nonExistentDepartment}/${nonExistentissueindex}`);
        assert.lengthOf(
        res.body,
        0,
        "Response body should be empty for nonExistentDepartment and nonExistentissueIndex"
      );
    });
  });
});
/* eslint-enable */
