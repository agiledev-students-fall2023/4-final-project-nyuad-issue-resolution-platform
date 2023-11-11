/* eslint-disable */

// Unit Testing
import chai, { assert } from "chai";
import sinon from "sinon";
import axios from "axios";
import fs from "fs/promises";
import { issueRetrievalHandler } from "../src/controllers/studentIssuesHandler.js";

const data = await fs.readFile("./public/json/mockapi.json", "utf8");
const mockData = JSON.parse(data);
// Filter the mock data to match the handler's expected behavior
const filteredData = mockData.filter(
  (item) => item.studentNetID[0] === "tm2005"
);

describe("Unit Tests for Student Dashboard", () => {
  let req, res, axiosGetStub;
  let sendSpy, jsonSpy;

  beforeEach(() => {
    req = { params: { paramName: "tm2005" } };
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

  it('should filter and return the correct number of data records for studentNetID "tm2005"', async () => {
    // Stub the axios call to resolve with the entire mock data
    axiosGetStub.resolves({ data: mockData });

    // Execute the handler
    await issueRetrievalHandler(req, res);

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
});

// Integration Testing

import chaiHttp from "chai-http";

chai.use(chaiHttp);

describe("Integration Tests for Issue Retrieval Endpoints", () => {
  describe("GET /api/issues/student/:paramName", () => {
    it("should retrieve issues for a given student and match all records", async () => {
      const studentNetID = "tm2005";
      const res = await chai
        .request("http://localhost:5000")
        .get(`/api/issues/student/${studentNetID}`);

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

    // it("should handle requests for a non-existent student gracefully", async () => {
    //   const nonExistentStudentNetID = "nonexistent";
    //   const res = await chai
    //     .request(server)
    //     .get(`/api/issues/student/${nonExistentStudentNetID}`);

    //   assert.equal(
    //     res.status,
    //     500,
    //     "Response status should be 500 for a non-existent student"
    //   );
    // });
  });
});
/* eslint-enable */
