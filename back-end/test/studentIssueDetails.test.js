import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import axios from "axios";
import fs from "fs/promises";
import {studentIssueViewDetailsHandler} from "../src/controllers/studentIssueViewDetailsHandler.js";

let server = "http://localhost:5000";

const data = await fs.readFile("./public/json/mockapi.json", "utf8");
const mockResponse = JSON.parse(data);

chai.use(chaiHttp);

describe("StudentIssueViewDetailsHandler Test Suite", () => {
  // Stub for axios
  let req, res, axiosStub;

  before(() => {
    req = { params: { paramName: "tm2005" } };
    res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ send: sinon.spy() }) // Stubbed here
    };
    axiosStub = sinon.stub(axios, 'get');
  });

  after(() => {
    axiosStub.restore();
  });

  it("should retrieve and filter specific student issue correctly", async () => {
    // const mockResponse = {
    //   data: [
    //     {
    //         "index": 6,
    //         "studentNetID": ["tm2005"],
    //         "studentName": ["Ted Mosby"],
    //         "title": "Global Programs Information Session",
    //         "description": "When is the next information session for global education programs?",
    //         "attachments": [null],
    //         "departments": ["GlobalEd"],
    //         "comments": [
    //           "Our international student office can assist you with the visa process."
    //         ],
    //         "dateCreated": "05/01/2023",
    //         "timeCreated": "21:51",
    //         "currentStatus": "Action Required",
    //         "currentPriority": "High Priority"
    //       },
    //       {
    //         "index": 7,
    //         "studentNetID": ["tm2005"],
    //         "studentName": ["Ted Mosby"],
    //         "title": "Career Fair Event Details",
    //         "description": "Could you provide the details for the upcoming career fair event?",
    //         "attachments": [null],
    //         "departments": ["CDC", "Facilities"],
    //         "comments": ["Details for the career fair have been sent to your email."],
    //         "dateCreated": "11/09/2023",
    //         "timeCreated": "16:20",
    //         "currentStatus": "Action Required",
    //         "currentPriority": "High Priority"
    //       }
    //   ]
    // };

    // Execute the handler
    await studentIssueViewDetailsHandler(req, res);

    axiosStub.resolves(mockResponse);

    const studentNetID = "tm2005";
    const paramName = "6";
    const response = await chai.request(server)
      .get(`/api/issues/student/${studentNetID}/${paramName}`); // Update this with the correct route

    //   response= response.filter(
    //     (item) => String(item.index) === String(paramName)
    //   )

    // assert(axiosStub.called);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, [{
        "index": 6,
        "studentNetID": ["tm2005"],
        "studentName": ["Ted Mosby"],
        "title": "Global Programs Information Session",
        "description": "When is the next information session for global education programs?",
        "attachments": [null],
        "departments": ["GlobalEd"],
        "comments": [
          "Our international student office can assist you with the visa process."
        ],
        "dateCreated": "05/01/2023",
        "timeCreated": "21:51",
        "currentStatus": "Action Required",
        "currentPriority": "High Priority"
      }]);
  });

  it("should handle errors gracefully", async () => {
    // axiosStub.rejects(new Error("Network error"));

    const studentNetID = "tm2005";
    const paramName = "9999";
    const response = await chai.request(server)
      .get(`/api/issues/student/${studentNetID}/${paramName}`) // Update this with the correct route
    //   .query({ studentNetID: 'tm2005', paramName: '6' });

    // assert(axiosStub.called);
    assert.equal(response.status, 500);
    assert.equal(response.text, "Issue with the given index not found.");
  });
});
