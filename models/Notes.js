//this is bookmark model I named it Notes.js
import mongoose, { Schema } from "mongoose";

// This is the model you will be modifying
const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //add a field to our note schema to establish it to a user

  user: {
    type: mongoose.Schema.Types.ObjectId,  //special type grab from mongoose
    ref: 'User',
    required: true,
}


});


const Note = mongoose.model("Note", noteSchema);

export default Note;
