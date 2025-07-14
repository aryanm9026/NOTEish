// Model for making notes

import mongoose from "mongoose";
const { Schema } = mongoose;

const notesSchema = new Schema(
  {
    email: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;