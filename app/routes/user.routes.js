/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : user routes for user url end points
 * @file            : user.router.js
 * @author          : Adithya S Shenoy
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const express = require("express");
const userController = require("../controllers/user/user.controller");
const userRoute = express.Router();
const { body } = require("express-validator");

//User login
userRoute.post("/login", userController.loginUser);

// Create a new User
userRoute.post(
  "/",
  body("firstName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage(
      "First Name should begin with caps and should be minimum of length 3"
    ),
  body("lastName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage(
      "Last Name should begin with caps and should be minimum of length 3"
    ),
  body("email").isEmail().withMessage("Enter a valid Email"),
  body("password").matches("^[a-zA-Z0-9@#$%^&*()!~]{8,}$").withMessage("Enter a valid password"),
  userController.registerUser
);

// Retrieve all users
userRoute.get("/", userController.findAllUser);

// Retrieve a single User with userID
userRoute.get("/:userID", userController.findOneUser);

// Update a User with userID
userRoute.put(
  "/:userID",
  body("firstName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage(
      "First Name should begin with caps and should be minimum of length 3"
    ),
  body("lastName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage(
      "Last Name should begin with caps and should be minimum of length 3"
    ),
  body("email").isEmail().withMessage("Enter a valid Email"),
  userController.updateUserDetail
);

// Delete a User with userID
userRoute.delete("/:userID", userController.deleteUser);

//forgot password route
userRoute.post("/forgot", userController.forgotPassword);

//email password reset route
userRoute.post("/reset/:token", userController.resetPassword);

module.exports = userRoute;
