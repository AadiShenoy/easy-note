const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    age: {
      type: Number,
      min: 1,
      max: 100,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

const myUser = mongoose.model("User", userSchema);
let encryptedPassword;
class userModel {
  //user login
  loginUser = (body, callback) => {
    return myUser.findOne({ email: body.email }, (err, data) => {
     return err ? callback(err,null) : data == null ? callback("Email id is not present" ,null) : callback(null,data);
    });
  };

  //creates a user and saves it in database
  registerUser = (body, callback) => {
    encryptedPassword =bcrypt.hashSync(body.password, 10);
    const user = new myUser({
      firstName: body.firstName,
      lastName: body.lastName,
      age: body.age,
      email: body.email,
      password: encryptedPassword,
    });
    console.log(user);
    // Save userDetails in the database
    return user.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Retrieve and return all users from the database.
  findAllUser = (callback) => {
    return myUser.find((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Find a single user with a userID
  findOneUser = (email, callback) => {
    myUser.findOne({email:email}, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Update a user identified by the userID in the request
  updateUserDetail = (userID, body, callback) => {
    // Find user and update it with the request body
    myUser.findByIdAndUpdate(
      userID,
      {
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age,
        email: body.email,
      },
      { new: true },
      (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  // Delete a user with the specified userID in the request
  deleteUser = (userID, callback) => {
    myUser.findByIdAndRemove(userID, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new userModel();
