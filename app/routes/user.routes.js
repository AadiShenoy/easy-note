const express = require("express");
const userController = require("../controllers/user.controller.js");
const userRoute = express.Router();
const userMiddleware = require("../middleware/user.middleware.js");
// Create a new User
userRoute.post("/",userMiddleware.userValidation, userController.registerUser);

// Retrieve all users
userRoute.get("/", userController.findAllUser);

// Retrieve a single User with userID
userRoute.get("/:userID", userController.findOneUser);

// Update a User with userID
userRoute.put("/:userID",userMiddleware.userValidation,userController.updateUserDetail);

// Delete a User with userID
userRoute.delete("/:userID", userController.deleteUser);

module.exports = userRoute;