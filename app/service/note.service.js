/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : get the values from the controller and process them for the notes in fundo notes  
 * @file            : note.service.js
 * @author          : Adithya S Shenoy
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const noteModel = require("../models/note.model.js");

class NoteService {
  /**
   * @description Service layer function to create a note
   * @param {Object} body
   * @param {callback} callback
   * @returns err or data
   */
  createNote = (body, callback) => {
    noteModel.createNote(body.title, body.content,body.userId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   * @description Service layer function to find all note
   * @param {callback} callback
   * @returns err or data
   */
  findAll = (userId,callback) => {
    noteModel.findAll(userId,(err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   * @description Service layer function to find a note
   * @param {string} noteId
   * @param {callback} callback
   * @returns err or data
   */
  findOne = (userId,noteId, callback) => {
    noteModel.findOne(userId,noteId, (err, data) => {
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
  updateNote = (userId,noteId, body, callback) => {
    noteModel.updateNote(userId,noteId, body, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   * @description Service layer function to delete a note
   * @param {String} noteId
   * @param {callback} callback
   * @returns err or data
   */
  deleteOne = (userId,noteId, callback) => {
    noteModel.deleteOne(userId,noteId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new NoteService();
