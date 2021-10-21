const noteModel = require("../models/note.model.js");

class noteService {
  /**
   * @description Service layer function to create a note
   * @param {Object} body
   * @param {callback} callback
   * @returns err or data
   */
  createNote = (body, callback) => {
    noteModel.createNote(body.title, body.content, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   * @description Service layer function to find all note
   * @param {callback} callback
   * @returns err or data
   */
  findAll = (callback) => {
    noteModel.findAll((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   * @description Service layer function to find a note
   * @param {string} noteId
   * @param {callback} callback
   * @returns err or data
   */
  findOne = (noteId, callback) => {
    noteModel.findOne(noteId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   * @description Service layer function to update a note
   * @param {string} noteId
   * @param {Object} body
   * @param {callback} callback
   * @returns err or data
   */
  updateNote = (noteId, body, callback) => {
    noteModel.updateNote(noteId, body.title, body.content, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   * @description Service layer function to delete a note
   * @param {String} noteId
   * @param {callback} callback
   * @returns err or data
   */
  deleteOne = (noteId, callback) => {
    noteModel.deleteOne(noteId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new noteService();
