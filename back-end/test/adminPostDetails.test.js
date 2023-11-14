/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { adminPostHandler } from "../src/controllers/adminPostHandler.js";
import { promises as fs } from 'fs';
import express from 'express';
import bodyParser from 'body-parser';

const { assert } = chai;
chai.use(chaiHttp);

describe('Unit test of of adminPostHandler', () => {
  let req, res, readFileStub, writeFileStub;

  beforeEach(() => {
    // Mock request and response objects
    req = {
      body: {
        issueindex: '1',
        commentbox: 'New comment',
        issueStatus: 'Open',
        issuePriority: 'High',
        issueDepartmentTags: ['IT', 'HR']
      }
    };

    res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ send: sinon.spy() })
    };

    // Stub fs methods
    readFileStub = sinon.stub(fs, 'readFile');
    writeFileStub = sinon.stub(fs, 'writeFile');
  });

  afterEach(() => {
    // Restore the stubs
    sinon.restore();
  });

  it('should update the issue and write to the file', async () => {
    readFileStub.resolves(JSON.stringify([{ index: '1', comments: [], currentStatus: '', currentPriority: '', departments: [] }]));

    await adminPostHandler(req, res);

    // Assert that readFile was called once
    assert.isTrue(readFileStub.calledOnce,"readFile was called once");
    
    // Assert that writeFile was called with correct arguments
    assert.isTrue(writeFileStub.calledWithMatch(sinon.match.string, sinon.match.string),"writeFile was called with correct arguments");
  });

});


// Integration Testing

chai.use(chaiHttp);

describe('Integration test of adminPostHandler', () => {
  let app, readFileStub, writeFileStub;

  before(() => {
    // Set up Express app
    app = express();
    app.use(bodyParser.json());
    app.post('/api/actions/admin/IT', adminPostHandler); // Update the route

    // Stub fs methods
    readFileStub = sinon.stub(fs, 'readFile');
    writeFileStub = sinon.stub(fs, 'writeFile');
  });

  after(() => {
    // Restore the original fs methods
    sinon.restore();
  });

  it('should handle a POST request and update the issue', async function() {

    const mockData = JSON.stringify([{ index: '1', comments: [], currentStatus: '', currentPriority: '', departments: [] }]);
    readFileStub.resolves(mockData);
    writeFileStub.resolves();

    const testData = {
      issueindex: '1',
      commentbox: 'New comment',
      issueStatus: 'Open',
      issuePriority: 'High',
      issueDepartmentTags: ['IT', 'HR']
    };

    chai.request(app)
      .post('/api/actions/admin/IT') // Use the updated URL
      .send(testData)
      .end((err, res) => {
        if (err) {
          return;
        }
        // Assert the response
        assert.equal(res.status, 200, 'Response status should be 200');
        // Assert that readFile and writeFile were called
        assert.isTrue(readFileStub.calledOnce, 'readFile should be called once');
        assert.isTrue(writeFileStub.calledOnce, 'writeFile should be called once');
      });
  });

  // Add more tests here if necessary
});
