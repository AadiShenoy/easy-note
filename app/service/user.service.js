const userModel = require("../models/user.model.js");
const jwtHelper = require("../../utility/jwt");
const bcrypt = require("bcrypt");

class userService {
  loginUser = (body, callback) => {
    userModel.loginUser(body, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        if (bcrypt.compareSync(body.password, data.password)) {
          var token = jwtHelper.generateToken(body.email);
          var result = data + "Token:" + token;
          return callback(null, result);
        } else {
          return callback("password mismatch");
        }
      }
    });
  };

  registerUser = (body, callback) => {
    userModel.registerUser(body, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  findAllUser = (callback) => {
    userModel.findAllUser((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  findOneUser = (email, callback) => {
    userModel.findOneUser(email, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  updateUserDetail = (userID, body, callback) => {
    userModel.updateUserDetail(userID, body, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  deleteUser = (userID, callback) => {
    userModel.deleteUser(userID, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new userService();
