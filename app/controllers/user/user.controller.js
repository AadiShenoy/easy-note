const userService = require("../../service/user.service");
const logger = require("../../../config/logger");
const { validationResult } = require("express-validator");
const dtoObject = require("./user.responseSchema");
let responseObject;

class userController {
  //user login
  loginUser = (req, res) => {
    let body = req.body;
    userService.loginUser(body, (err, data) => {
      if (err) {
        logger.error(err);
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err;
        return res.send(responseObject);
      }
      logger.info("login Successful");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  //creates a user in the database
  registerUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseObject = dtoObject.userApiFailure;
      responseObject.message = errors.array();
      res.send(responseObject);
    }
    let body = req.body;
    userService.registerUser(body, (err, data) => {
      if (err) {
        logger.error(err);
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      logger.info("Registeration Successful");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  // Retrieve and return all notes from the database.
  findAllUser = (req, res) => {
    userService.findAllUser((err, data) => {
      if (err) {
        logger.error(err);
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      logger.info("Retrieval successfull");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  // Find a single user with a userID
  findOneUser = (req, res) => {
    let email = req.params.userID
    userService.findOneUser(email, (err, data) => {
      if (err) {
        logger.error(err);
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.userApiFindFailure;
          responseObject.message = err.message;
          res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.userApiFindFailure;
        res.send(responseObject);
      }
      logger.info("Retrieval Successful");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  // Update a user identified by the userID in the request
  updateUserDetail = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let id = req.params.userID;
    let body = req.body;
    userService.updateUserDetail(id, body, (err, data) => {
      if (err) {
        logger.error(err);
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.userApiFindFailure;
          responseObject.message = err.message;
          return res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.userApiFindFailure;
        res.send(responseObject);
      }
      logger.info("Updated succesfully");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = "Updated Successfully";
      res.send(responseObject);
    });
  };

  // Delete a user with the specified userID in the request
  deleteUser = (req, res) => {
    let id = req.params.userID;
    userService.deleteUser(id, (err, data) => {
      if (err) {
        logger.error(err);
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.userApiFindFailure;
          responseObject.message = err.message;
          res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.userApiFindFailure;
        res.send(responseObject);
      }
      logger.info("delete succesfully");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = "deleted successfully";
      res.send(responseObject);
    });
  };
}

module.exports = new userController();
