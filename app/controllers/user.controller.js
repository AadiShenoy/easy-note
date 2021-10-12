const userService = require("../service/user.service.js");

class userController {
  //creates a user in the database
  registerUser = (req, res) => {
    let body = req.body;
    userService.registerUser(body,(err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while registeration",
        });
      }
      res.status(200).send(data);
    });
  };

  // Retrieve and return all notes from the database.
  findAllUser = (req, res) => {
    userService.findAllUser((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred.",
        });
      }
      res.status(200).send(data);
    });
  };

  // Find a single user with a userID
  findOneUser = (req, res) => {
    let id = req.params.userID;
    userService.findOneUser(id, (err, data) => {
      if (err) {
        console.log(err);
        if (err.kind === "ObjectId") {
          return res.send({
            message: "User not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error retrieving user with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "User not found with id (in then) " + id,
        });
      }
      res.status(200).send({ User: data });
    });
  };

  // Update a user identified by the userID in the request
  updateUserDetail = (req, res) => {
    let id = req.params.userID;
    let body = req.body;
    userService.updateUserDetail(id, body, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.send({
            message: "User not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error updating user with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "User not found with id (in then) " + id,
        });
      }
      res.send({ message:"Update Succesfull",User: data });
    });
  };

  // Delete a user with the specified userID in the request
  deleteUser = (req, res) => {
    let id = req.params.userID;
    userService.deleteUser(id, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.send({
            message: "User not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error deleting user with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "User not found with id (in then) " + id,
        });
      }
      res.send("Deleted successfully");
    });
  };
}

module.exports = new userController();
