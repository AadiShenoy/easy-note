const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    age:Number,
    email:{
      type:String,
      unique:true,
      index:true,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

const myUser = mongoose.model("User", userSchema);

class userModel {
  //creates a user and saves it in database
  registerUser = (body, callback) => {   
    const user = new myUser({
      firstName: body.firstName,
      lastName: body.lastName,
      age:body.age,
      email:body.email
    });
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
  findOneUser = (userID, callback) => {
    myUser.findById(userID, (err, data) => {
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
        age:body.age,
        email:body.email
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
