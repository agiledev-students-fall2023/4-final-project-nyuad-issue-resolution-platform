import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import axios from "axios";
import fs from "fs/promises";
import {studentIssueViewDetailsHandler} from "../src/controllers/studentIssueViewDetailsHandler.js";

let server = "http://localhost:5000";

const data = await fs.readFile("./public/json/mockapi.json", "utf8");
const mockResponse = JSON.parse(data);

// Unit Testing

describe("Unit Tests for studentIssueViewDetailsHandler", () => {
    let req, res, axiosGetStub, sendSpy, jsonSpy, statusSpy;

    beforeEach(() => {
        req = { params: { paramName: "123", studentNetID: "s123456" } };
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ send: sinon.spy() })
        };
        sendSpy = res.status().send;
        jsonSpy = res.json;
        statusSpy = res.status;
        axiosGetStub = sinon.stub(axios, "get");
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should return 400 error if studentNetID is missing", async () => {
        delete req.params.studentNetID;
        await studentIssueViewDetailsHandler(req, res);
        assert.isTrue(statusSpy.calledWith(400));
        assert.isTrue(sendSpy.calledWith("Missing or invalid studentNetID."));
    });

    it("should return 400 error if paramName is missing", async () => {
        delete req.params.paramName;
        await studentIssueViewDetailsHandler(req, res);
        assert.isTrue(statusSpy.calledWith(400));
        assert.isTrue(sendSpy.calledWith("Missing or invalid issue index."));
    });

    it("should return filtered data for a valid request", async () => {
        const mockData = [{ index: "123", detail: "Issue details" }];
        axiosGetStub.resolves({ data: mockData });
        await studentIssueViewDetailsHandler(req, res);
        assert.isTrue(jsonSpy.calledWith([mockData[0]]));
    });

    it("should return 500 error if no data found for student", async () => {
        axiosGetStub.resolves({ data: [] });
        await studentIssueViewDetailsHandler(req, res);
        assert.isTrue(statusSpy.calledWith(500));
        assert.isTrue(sendSpy.calledWith("No issues found for the given studentNetID."));
    });

    it("should return 500 error if issue index not found", async () => {
        const mockData = [{ index: "124", detail: "Issue details" }];
        axiosGetStub.resolves({ data: mockData });
        await studentIssueViewDetailsHandler(req, res);
        assert.isTrue(statusSpy.calledWith(500));
        assert.isTrue(sendSpy.calledWith("Issue with the given index not found."));
    });

    it("should handle axios errors", async () => {
        axiosGetStub.rejects(new Error("Axios error"));
        await studentIssueViewDetailsHandler(req, res);
        assert.isTrue(statusSpy.calledWith(500));
        assert.isTrue(sendSpy.calledWith("An error occurred while retrieving the data."));
    });
});

// Integration Testing

chai.use(chaiHttp);

describe("Integration Tests for Student Issue Details", () => {
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
