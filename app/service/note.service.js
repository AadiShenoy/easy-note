const noteModel = require("../models/note.model.js");

class noteService {
  createNote = (body,callback) => {
    noteModel.createNote(body.title,body.content,(err,data)=>{
        return err ? callback(err, null) : callback(null, data);
    })
      
  };

  findAll = (callback) => {
    noteModel.findAll((err,data) => {
        return err ? callback(err, null) : callback(null, data);
    })    
  };

  findOne = (noteId, callback) => {
    noteModel.findOne(noteId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  updateNote = (noteId,body,callback) => {
    noteModel.updateNote(noteId,body.title,body.content,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  deleteOne = (noteId,callback) => {
    noteModel.deleteOne(noteId,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new noteService();
