const express = require("express");
const userController = require("../controllers/user.controller.js");
const userRoute = express.Router();
const userMiddleware = require("../middleware/user.middleware.js");
const { body } = require("express-validator");
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
  body("age").isNumeric().withMessage("Enter a valid age"),
  body("email").isEmail().withMessage("Enter a valid Email"),
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
  body("age").isNumeric().withMessage("Enter a valid age"),
  body("email").isEmail().withMessage("Enter a valid Email"),
  userController.updateUserDetail
);

// Delete a User with userID
userRoute.delete("/:userID", userController.deleteUser);

module.exports = userRoute;