const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const label = require("./label.json");
chai.should();
chai.use(chaiHttp);

describe("label API", () => {
  let token = " ";
  let labelId = " ";

  let data = label.loginDetails;

  beforeEach((done) => {
    chai
      .request(server)
      .post("/user/login")
      .send(data)
      .end((err, res) => {
        token = res.body.message.token;
        res.body.should.have.status(200);
        if (err) {
          return done(err);
        }
        done();
      });
  });

  /**
   * /GET request test
   * Positive and Negative - Get all labels data from database label
   */
  describe("GET /labels", () => {
    it("Given a valid request it should get all the labels from database", (done) => {
      chai
        .request(server)
        .get("/label")
        .set("token", `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").should.be.a("object");
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("Given a Invalid request it should throw error", (done) => {
      chai
        .request(server)
        .get("/label")
        .set("token", "bearer ")
        .end((err, res) => {
          res.body.should.have.property("name").eql("JsonWebTokenError");
          res.body.should.have.property("message").eql("jwt must be provided");
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * /POST request test
   * Positive and Negative - Add label to the database
   */
  describe("POST /labels", () => {
    it("Given a valid data and request it should add label to the database", (done) => {
      let data = label.ValidLabelData;
      chai
        .request(server)
        .post("/label")
        .set("token", `bearer ${token}`)
        .send(data)
        .end((err, res) => {
          labelId = res.body.message._id;
          res.should.have.status(200);
          res.body.should.have.property("message").should.be.a("object");
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("Passed a invalid data should throw error", (done) => {
      let data = label.InvalidLabelData;
      chai
        .request(server)
        .post("/label")
        .set("token", `bearer ${token}`)
        .send(data)
        .end((err, res) => {
          res.body.should.have.property("status").eql(500);
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * /GET request test
   * Positive and Negative - Get individual labels from database
   */
  describe("GET /labels/:id", () => {
    it("Given a valid request and labelId it should get particular label from database", (done) => {
      chai
        .request(server)
        .get(`/label/${labelId}`)
        .set("token", `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").should.be.a("object");
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("Given a Invalid request and labelId should throw error", (done) => {
      chai
        .request(server)
        .get(`/label/${labelId}`)
        .set("token", `bearer `)
        .end((err, res) => {
          res.body.should.have.property("name").eql("JsonWebTokenError");
          res.body.should.have.property("message").eql("jwt must be provided");
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * /PUT request test
   * Positive and Negative - update label from the database
   */
  describe("PUT /labels/:id", () => {
    it("Given a valid data and request it should update label from the database", (done) => {
      let data = label.ValidLabelData;
      chai
        .request(server)
        .put(`/label/${labelId}`)
        .set("token", `bearer ${token}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").should.be.a("object");
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("Passed a invalid data for update should throw error", (done) => {
      let data = label.InvalidLabelData;
      chai
        .request(server)
        .put(`/label/${labelId}`)
        .set("token", `bearer ${token}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * /Delete request test
   * Positive and Negative - Delete label of given id from database
   */
  describe("Delete /labels/:id", () => {
    it("Given a valid request and labelId it should delete a label from database", (done) => {
      chai
        .request(server)
        .delete(`/label/${labelId}`)
        .set("token", `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("deleted successfully");
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("Given a Invalid token should throw error", (done) => {
      chai
        .request(server)
        .delete(`/label/${labelId}`)
        .set("token", `bearer ${token}az`)
        .end((err, res) => {
          res.body.should.have.property("name").eql("JsonWebTokenError");
          res.body.should.have.property("message").eql("invalid signature");
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
