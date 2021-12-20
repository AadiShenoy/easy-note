/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : label routes for label url end points
 * @file            : label.routes.js
 * @author          : Adithya S Shenoy
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/

const express = require("express");
const labelController = require("../controllers/label/label.controller");
const labelRoute = express.Router();
const labelMiddleware = require("../middleware/note.middleware.js");
const { body } = require("express-validator");

// Create a new Label
labelRoute.post(
  "/",
  body("title")
    .matches("^[A-Z][a-zA-Z ]{2,}")
    .withMessage("Title cannot be empty"),
  labelMiddleware.ensureToken,
  labelController.createLabel
);

// Retrieve all Labels
labelRoute.get("/", labelMiddleware.ensureToken, labelController.findAll);

// Retrieve a single Label with LabelId
labelRoute.get(
  "/:labelId",
  labelMiddleware.ensureToken,
  labelController.findOne
);

// Update a Label with LabelId
labelRoute.put(
  "/:labelId",
  body("title")
    .matches("^[A-Z][a-zA-Z ]{2,}")
    .withMessage("Title cannot be empty"),
  labelMiddleware.ensureToken,
  labelController.updateLabel
);

// Delete a Label with LabelId
labelRoute.delete(
  "/:labelId",
  labelMiddleware.ensureToken,
  labelController.deleteOne
);

module.exports = labelRoute;
