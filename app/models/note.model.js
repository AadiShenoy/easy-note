/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : note model creates note schema and performs db operation
 * @file            : note.model.js
 * @author          : Adithya S Shenoy
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/

const mongoose = require("mongoose");
const { promisify } = require("util");
const logger = require("../../config/logger");
const fs = require("fs");
const unlinkAsync = promisify(fs.unlink);

const NoteSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isTrash: Boolean,
    color: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const myNote = mongoose.model("Note", NoteSchema);

class NoteModel {
  /**
   * @description creates a note and saves it in database
   * @param {string} title
   * @param {string} content
   * @param {callback} callback
   * @returns err or data
   */
  createNote = (title, content, userId, callback) => {
    const note = new myNote({
      title: title,
      content: content,
      userId: userId,
      isTrash: false,
      color: "white",
      image: "",
    });
    return note.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   * @description finds all notes present in data base
   * @param {callback} callback
   * @returns err or data
   */
  findAll = (userId, callback) => {
    return myNote
      .find({ userId: userId })
      .populate({
        path: "userId",
        select: ["firstName", "lastName", "email"],
      })
      .exec((error, data) => {
        return error ? callback(error, null) : callback(null, data);
      });
  };

  /**
   * @description finds one note which matches the given noteid
   * @param {Object} noteId
   * @param {callback} callback
   * @returns err or data
   */
  findOne = (userId, noteId, callback) => {
    return myNote.findOne({ userId: userId, _id: noteId }, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      if (!data) {
        return callback("You dont have access to this note", null);
      } else {
        return callback(null, data);
      }
    });
  };

  /**
   * @description Find note and update it with the request body
   * @param {Object} noteId
   * @param {string} title
   * @param {string} content
   * @param {callback} callback
   * @returns err or data
   */
  updateNote = (userId, noteId, body, callback) => {
    return myNote.findOneAndUpdate(
      { userId: userId, _id: noteId },
      {
        title: body.title,
        content: body.content,
        isTrash: body.isTrash,
        color: body.color,
        image: body.image,
      },
      { new: true },
      (error, data) => {
        if (error) {
          return callback(error, null);
        }
        if (!data) {
          return callback("You dont have access to this note", null);
        } else {
          return callback(null, data);
        }
      }
    );
  };

  /**
   * @description finds a note and deletes it
   * @param {Object} noteId
   * @param {callback} callback
   * @returns err or data
   */
  deleteOne = (userId, noteId, callback) => {
    myNote.findOneAndRemove({ userId: userId, _id: noteId }, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      if (!data) {
        return callback("You dont have access to this note", null);
      } else {
        unlinkAsync(
          `C:\\Users\\adithya.shenoy_ymedi\\Desktop\\node\\Nodejs\\easy-note\\uploads\\images\\${data.image}`,
          (err, res) => {
            if (err) {
              logger.error(err);
            }
          }
        );
        return callback(null, data);
      }
    });
  };
}

module.exports = new NoteModel();
