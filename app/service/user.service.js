const userModel = require("../models/user.model.js");

class userService {
  registerUser = (body,callback) => {
    userModel.registerUser(body,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
    })
  };

  findAllUser = (callback) => {
    userModel.findAllUser((err,data) => {
        return err ? callback(err, null) : callback(null, data);
    })    
  };

  findOneUser = (userID, callback) => {
    userModel.findOneUser(userID, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  updateUserDetail = (userID,body,callback) => {
    userModel.updateUserDetail(userID,body,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  deleteUser = (userID,callback) => {
    userModel.deleteUser(userID,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new userService();
