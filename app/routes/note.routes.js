/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : note routes for note url end points
 * @file            : note.routes.js
 * @author          : Adithya S Shenoy
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const express = require("express");
const noteController = require("../controllers/note/note.controller");
const noteMiddleware = require("../middleware/note.middleware.js");
const noteRoute = express.Router();
// Create a new Note
noteRoute.post("/", noteMiddleware.ensureToken,noteMiddleware.validate, noteController.createNote);

// Retrieve all Notes
noteRoute.get("/",noteMiddleware.ensureToken,noteController.findAll);

// Retrieve a single Note with noteId
noteRoute.get("/:noteId", noteMiddleware.ensureToken,noteController.findOne);

// Update a Note with noteId
noteRoute.put("/:noteId",noteMiddleware.ensureToken,noteMiddleware.validate,noteController.updateNote);

// Delete a Note with noteId
noteRoute.delete("/:noteId", noteMiddleware.ensureToken,noteController.deleteOne);

//image upload
noteRoute.post("/upload-image", noteMiddleware.ensureToken, noteController.uploadImage);

module.exports = noteRoute;
