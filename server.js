/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Adithya S Shenoy
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const express = require("express");
const logger = require("./config/logger.js");
const noteRouter = require("./app/routes/note.routes.js");
const userRouter = require("./app/routes/user.routes.js");
const labelRouter = require("./app/routes/label.routes.js");
const db = require("./config/dbConnect");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors());

app.use(express.json());

app.use("/notes", noteRouter);
app.use("/user", userRouter);
app.use("/label", labelRouter);

 app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static("uploads"));

const PORT = process.env.PORT || process.env.portNumber 
//connecting to server
const server = app.listen(PORT, () => {
  logger.info("Example app listening at port");
  db.dbConnection();
});

module.exports = app;
