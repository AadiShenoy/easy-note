const express = require("express");
const logger = require("./config/logger.js");
const noteRouter = require("./app/routes/note.routes.js");
const userRouter = require("./app/routes/user.routes.js");
const db = require("./config/dbConnect");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const middleware = require("./app/middleware/note.middleware");

const storage = multer.diskStorage({
  destination: "./uploads/images/",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("image");

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//image upload
app.post("/upload-image", middleware.ensureToken, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(req.file);
    }
  });
});
app.use(express.static("uploads"));

//connecting to server
const server = app.listen(3001, () => {
  logger.info("Example app listening at port 3000");
  db.dbConnection();
});
