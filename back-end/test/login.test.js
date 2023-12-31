/* eslint-disable */
import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import server from "../app.js";

chai.use(chaiHttp);
process.env.NODE_ENV = "test";

// Integration tests for the login.js file
describe("Integration Tests for Login Endpoints", () => {
  // Check student login
  describe("POST /api/login/student", () => {
    it("should authenticate student with correct credentials", async () => {
      const res = await chai
        .request(server)
        .post("/api/login/student")
        .send({ username: "student", password: "student" });
      // Check that the response is correct
      assert.equal(res.status, 200);
      // Check if response matches expected response
      assert.deepEqual(res.body, {
        "__v": 0,
        authenticated: true,
        name: "student",
        netId: "student",
        userDept: "student",
        userType: "student",
      });
    });

    it("should not authenticate student with incorrect credentials", async () => {
      const res = await chai
        .request(server)
        .post("/api/login/student")
        .send({ username: "wrong", password: "user" });
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { authenticated: false});
    });
  });

  describe("POST /api/login/admin", () => {
    // Check admin login
    it("should authenticate admin with correct credentials", async () => {
      const res = await chai
        .request(server)
        .post("/api/login/admin")
        .send({ username: "admin", password: "admin" });
      // Check that the response is correct
      assert.equal(res.status, 200);
      // Check if response matches expected response
      assert.deepEqual(res.body, {
        "__v": 0,
        authenticated: true,
        name: "admin",
        netId: "admin",
        userDept: "admin",
        userType: "admin",
      });
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
