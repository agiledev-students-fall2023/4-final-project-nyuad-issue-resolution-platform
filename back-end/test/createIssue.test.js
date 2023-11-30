const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(chaiHttp);

const server = require('http://localhost:5000'); 
const createIssueHandler = require('../controllers/createIssueHandler.js'); 

describe('createIssue API Endpoint', () => {
  
  const validIssueData = {
    studentNetID: "12345678",
    studentName: "John Doe",
    issueTitle: "Network Outage",
    issueDesc: "There is an intermittent network outage in the east wing.",
    deptTagged: "IT, Maintenance", 
    dateCreated: new Date().toLocaleDateString(), 
    currentStatus: "Open",
    currentPriority: "New",
    attachments: [] 
  };

  const invalidIssueData = {
    studentNetID: "",
    studentName: "",
  };

  // unit tsts
  describe('Unit Tests for createIssueHandler', () => {
    let createStub;

    beforeEach(() => {
      createStub = sinon.stub(createIssueHandler, 'createIssueInDatabase').resolves(true);
    });

    afterEach(() => {
      createStub.restore();
    });

    it('create a new issue with valid data', async () => {
      const result = await createIssueHandler.createIssue(validIssueData);
      expect(createStub.calledOnce).to.be.true;
      expect(result).to.be.true; 
    });

    it('not create an issue with invalid data', async () => {
      try {
        await createIssueHandler.createIssue(invalidIssueData);
      } catch (error) {
        expect(createStub.called).to.be.false;
        expect(error).to.not.be.undefined; // Expecting an error to be thrown
      }
    });

  });

  describe('Integration Tests with the Server', () => {
    it('should successfully create an issue via POST request', (done) => {
      chai.request(server)
        .post('/createIssue') // endpoint
        .send(validIssueData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.include({ status: 'success' }); 
          done();
        });
    });

    it('should return an error for invalid issue data', (done) => {
      chai.request(server)
        .post('/createIssue') //endpoint
        .send(invalidIssueData)
        .end((err, res) => {
          expect(res).to.have.status(400); 
          expect(res.body).to.include({ status: 'error' }); 
          done();
        });
    });

  });

});
