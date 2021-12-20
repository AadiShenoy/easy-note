const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const user = require("./user.json");
chai.should();

chai.use(chaiHttp);
let userId = " ";
/**
 * /POST request test
 * positive and negative - login test
 */
describe("POST user /registeration", () => {
  it("positive test case for registeration", (done) => {
    let data = user.validUserRegisteration;
    chai
      .request(server)
      .post("/user")
      .send(data)
      .end((err, res) => {
        userId = res.body.message._id;
        res.body.should.have.status(200);
        res.body.should.be.a("object");
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it("Negative test case for registeration", (done) => {
    let data = user.InvalidUserRegisteration;
    chai
      .request(server)
      .post("/user")
      .send(data)
      .end((err, res) => {
        res.body.should.have.property("status").eql(500);
        res.body.should.be.a("object");
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

/**
 * /POST request test
 * positive and negative - login test
 */

describe("POST user /login", () => {
  it("positive test case ", (done) => {
    let data = user.validLoginDetail;
    chai
      .request(server)
      .post("/user/login")
      .send(data)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a("object");
        res.body.message.should.have.property("token");
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it("Negative test case", (done) => {
    let data = user.InvalidLoginDetail;
    chai
      .request(server)
      .post("/user/login")
      .send(data)
      .end((err, res) => {
        res.body.should.have.status(500);
        res.body.should.have.property("message").eql("password mismatch");
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

/**
 * /GET request test
 * Positive and Negative - Get all user data from database
 */
describe("GET /user", () => {
  it("Given a valid request it should get all the user from database", (done) => {
    chai
      .request(server)
      .get("/user")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").should.be.a("object");
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

/**
 * /GET request test
 * Positive and Negative - Get individual user from database
 */
describe("GET /user/:id", () => {
  it("Given a valid request and userId it should get particular user from database", (done) => {
    chai
      .request(server)
      .get(`/user/${userId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").should.be.a("object");
        if (err) {
          return done(err);
        }
        done();
      });
  });
  it("Given a Invalid request and userId it should throe error", (done) => {
    chai
      .request(server)
      .get(`/user/${userId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").should.be.a("object");
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

/**
 * /PUT request test
 * Positive and Negative - update user from the database
 */
describe("PUT /user/:id", () => {
  it("Given a valid data and request it should update user from the database", (done) => {
    let data = user.validUserData;
    chai
      .request(server)
      .put(`/user/61b03295c6e446aebf2f5c5f`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Couldn't find User with given id");
        if (err) {
          return done(err);
        }
        done();
      });
  });
  it("Given a Invalid data and request it should throw error", (done) => {
    let data = user.InvalidUserData;
    chai
      .request(server)
      .put(`/user/${userId}`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

/**
 * /Delete request test
 * Positive and Negative - Delete user of given id from database
 */
describe("Delete /user/:id", () => {
  it("Given a valid request and userId it should delete a user from database", (done) => {
    chai
      .request(server)
      .delete(`/user/${userId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("deleted successfully");
        if (err) {
          return done(err);
        }
        done();
      });
  });
  it("Given a Invalid request and userId it should throw error", (done) => {
    chai
      .request(server)
      .delete(`/user/61b03295c6e446aebf2f5c5f`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Couldn't find User with given id");
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
