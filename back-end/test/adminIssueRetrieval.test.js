/* eslint-disable */
// Unit Testing
import chai, { assert } from "chai";
import sinon from "sinon";
import axios from "axios";
import fs from "fs/promises";
import { issueRetrievalHandler } from "../src/controllers/adminIssuesHandler.js";
import chaiHttp from "chai-http";

const data = await fs.readFile("./public/json/mockapi.json", "utf8");
const mockData = JSON.parse(data);
const filteredData = mockData.filter((item) => item.departments.includes("IT"));

describe("Unit Tests for Admin Dashboard", () => {
    let req, res, axiosGetStub;
    let sendSpy, jsonSpy;

    beforeEach(() => {
        req = { params: { paramName: "IT" } };
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ send: sinon.spy() })
        };
        sendSpy = res.status().send;
        jsonSpy = res.json;
        axiosGetStub = sinon.stub(axios, "get");
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should filter and return the correct number of data records for "IT" department', async () => {
        axiosGetStub.resolves({ data: mockData });

        await issueRetrievalHandler(req, res);

        assert.isTrue(axiosGetStub.calledOnce, "axios.get should be called once");
        assert.equal(
            res.json.firstCall.args[0].length,
            filteredData.length,
            "Number of records should match the filtered data length"
        );
        assert.deepEqual(
            res.json.firstCall.args[0],
            filteredData,
            "Returned data should match the filtered data"
        );
    });

    // Error Handling Test Case
    it('should handle errors when axios request fails', async () => {
        axiosGetStub.rejects(new Error('Axios request failed'));
        await issueRetrievalHandler(req, res);
        assert.isTrue(axiosGetStub.calledOnce, "axios.get should be called once");
        assert.isTrue(sendSpy.calledOnce, "res.status().send should be called once");
        assert.equal(sendSpy.firstCall.args[0], "An error occurred while retrieving the data.", "Error message should be sent");
    });

    // Edge Case Test Case
    it('should return an empty array when paramName is not found in any data records', async () => {
        req.params.paramName = "blackMagic";
        axiosGetStub.resolves({ data: mockData });
        await issueRetrievalHandler(req, res);
        assert.isTrue(axiosGetStub.calledOnce, "axios.get should be called once");
        assert.equal(
            res.json.firstCall.args[0].length,
            0,
            "Number of records should be 0 when paramName is not found"
        );
    });

});


// Integration Testing

chai.use(chaiHttp);

describe("Integration Tests for Admin Issue Retrieval Endpoints", () => {
    describe("GET /api/issues/admin/:paramName", () => {
        it("should retrieve issues for a given department and match all records", async () => {
            const currentDept = "IT";
            const res = await chai
                .request("http://localhost:5000")
                .get(`/api/issues/admin/${currentDept}`);

            assert.strictEqual(res.status, 200, "Response status should be 200");
            assert.isArray(res.body, "Response body should be an array");
            assert.lengthOf(
                res.body,
                filteredData.length,
                `Response body should have ${filteredData.length} records`
            );

            res.body.forEach((record, index) => {
                assert.deepEqual(
                    record,
                    filteredData[index],
                    `Record at index ${index} should match the expected data`
                );
            });
        });
    });
});
/* eslint-enable */
