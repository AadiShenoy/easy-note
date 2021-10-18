const userModel = require("../models/user.model.js");
const jwtHelper = require("../../utility/jwt");
class userService {
  loginUser = (body, callback) => {
    userModel.loginUser(body, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        if (body.email == data.email && body.password == data.password) {
          var token = jwtHelper.generateToken(body.email);
          var result = data + "Token:" + token;
          return callback(null, result);
        } else {
          return callback(err,null);
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

  findOneUser = (userID, callback) => {
    userModel.findOneUser(userID, (err, data) => {
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
