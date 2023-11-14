import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import axios from 'axios';
import fs from 'fs/promises';
import { studentIssueUpdateHandler } from '../src/controllers/studentIssueUpdateHandler.js';

chai.use(chaiHttp);

describe('Unit Tests for studentIssueUpdateHandler', () => {
  let req, res, axiosGetStub, sendSpy, jsonSpy, statusSpy;

  beforeEach(() => {
    req = {
      params: { paramName: '123', studentNetID: 's123456' },
      body: { issueindex: '1', comments: 'Test comment', currentStatus: 'open' }
    };
    res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ send: sinon.spy() })
    };
    sendSpy = res.status().send;
    jsonSpy = res.json;

    // Stub axios.get method
    axiosGetStub = sinon.stub(axios, 'get');
  });

  afterEach(() => {
    // Restore the stub after each test
    axiosGetStub.restore();
  });

  it('should update the issue and send the correct response when the request is valid', async () => {
    // Set up the stub to return a specific value
    axiosGetStub.resolves({ data: [{ index: '1', comments: [] }] });

    await studentIssueUpdateHandler(req, res);
    expect(jsonSpy.calledOnce).to.be.false;
    expect(sendSpy.calledOnce).to.be.true;
  });

  it('should send an error response when the request is invalid', async () => {
    // Set up the stub to return a specific value
    axiosGetStub.resolves({ data: [{ index: '2', comments: [] }] });

    await studentIssueUpdateHandler(req, res);
    expect(jsonSpy.calledOnce).to.be.false;
    expect(sendSpy.calledOnce).to.be.true;
  });
});

// import app from '../app.js';

// chai.use(chaiHttp);

// describe('Integration Tests for studentIssueUpdateHandler', () => {
//     it('should update the issue and return the correct response when the request is valid', async () => {
//         const res = await chai.request(app)
//             .post(`api/actions/student/2005`)
//             .send({  issueindex: '1', studentNetID: 's123456', comments: 'Test comment', currentStatus: 'open' });

//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('message').that.equals('Issue updated successfully');
//     });

//     it('should return an error response when the request is invalid', async () => {
//         const res = await chai.request(app)
//             .post('/api/actions/student/tm2005')
//             .send({ issueindex: '2', studentNetID: 's123456', comments: 'Test comment', currentStatus: 'open' });

//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message').that.equals('Invalid request');
//     });
// });