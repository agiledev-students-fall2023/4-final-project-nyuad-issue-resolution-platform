/* eslint-disable */

import chai, { assert } from "chai";
import sinon from "sinon";
import {
  loginStudentHandler,
  loginAdminHandler
} from "../src/controllers/loginHandler.js";

// Unit Testing
describe("Unit Tests for Login Handlers", () => {
  let req, res, statusSpy, jsonSpy;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: () => {},
      status: function (s) {
        this.statusCode = s;
        return this;
      }
    };
    statusSpy = sinon.spy(res, "status");
    jsonSpy = sinon.spy(res, "json");
  });

  afterEach(() => {
    statusSpy.restore();
    jsonSpy.restore();
  });

  describe("loginStudentHandler", () => {
    it("should authenticate valid student credentials", () => {
      req.body = { username: "s", password: "1" };
      loginStudentHandler(req, res);
      assert(statusSpy.calledWith(200));
      assert(jsonSpy.calledWith({ authenticated: true }));
    });

    it("should not authenticate invalid student credentials", () => {
      req.body = { username: "wrong", password: "user" };
      loginStudentHandler(req, res);
      assert(statusSpy.calledWith(200));
      assert(jsonSpy.calledWith({ authenticated: false }));
    });
  });

  describe("loginAdminHandler", () => {
    it("should authenticate valid admin credentials", () => {
      req.body = { username: "a", password: "1" };
      loginAdminHandler(req, res);
      assert(jsonSpy.calledWith({ authenticated: true }));
    });

    it("should not authenticate invalid admin credentials", () => {
      req.body = { username: "wrong", password: "user" };
      loginAdminHandler(req, res);
      assert(jsonSpy.calledWith({ authenticated: false }));
    });
  });
});

//Integration Testing

import chaiHttp from "chai-http";
import server from "../app.js";

chai.use(chaiHttp);

describe("Integration Tests for Login Endpoints", () => {
  describe("POST /api/login/student", () => {
    it("should authenticate student with correct credentials", async () => {
      const res = await chai
        .request(server)
        .post("/api/login/student")
        .send({ username: "s", password: "1" });
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { authenticated: true });
    });

    it("should not authenticate student with incorrect credentials", async () => {
      const res = await chai
        .request(server)
        .post("/api/login/student")
        .send({ username: "wrong", password: "user" });
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { authenticated: false });
    });
  });

  describe("POST /api/login/admin", () => {
    it("should authenticate admin with correct credentials", async () => {
      const res = await chai
        .request(server)
        .post("/api/login/admin")
        .send({ username: "a", password: "1" });
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { authenticated: true });
    });

    it("should not authenticate admin with incorrect credentials", async () => {
      const res = await chai
        .request(server)
        .post("/api/login/admin")
        .send({ username: "wrong", password: "user" });
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { authenticated: false });
    });
  });
});

/* eslint-enable */
