const express = require("express");
const userController = require("../controllers/note.controller.js");
const route = express.Router();
const validate = require("../middleware/note.middleware.js");
// Create a new Note
route.post("/", validate, userController.createNote);

// Retrieve all Notes
route.get("/", userController.findAll);

// Retrieve a single Note with noteId
route.get("/:noteId", userController.findOne);

// Update a Note with noteId
route.put("/:noteId",validate,userController.updateNote);

// Delete a Note with noteId
route.delete("/:noteId", userController.deleteOne);

module.exports = route;
