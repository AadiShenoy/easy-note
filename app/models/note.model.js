const mongoose = require("mongoose");
const NoteSchema = mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const myNote = mongoose.model("Note", NoteSchema);

class noteModel {
  /**
   * @description creates a note and saves it in database
   * @param {string} title 
   * @param {string} content 
   * @param {callback} callback 
   * @returns err or data
   */
  createNote = (title, content, callback) => {
    const note = new myNote({
      title: title,
      content: content,
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
  findAll = (callback) => {
    return myNote.find((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   * @description finds one note which matches the given noteid
   * @param {Object} noteId 
   * @param {callback} callback 
   * @returns err or data
   */
  findOne = (noteId, callback) => {
    myNote.findById(noteId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
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
  updateNote = (noteId, title, content, callback) => {
    myNote.findByIdAndUpdate(
      noteId,
      {
        title: title || "Untitled Note",
        content: content,
      },
      { new: true },
      (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  /**
   * @description finds a note and deletes it
   * @param {Object} noteId 
   * @param {callback} callback 
   * @returns err or data
   */
  deleteOne = (noteId, callback) => {
    myNote.findByIdAndRemove(noteId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new noteModel();
