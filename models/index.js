const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    audio: { type: String },
    images: [{ type: String }],
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  },
  { strict: false, timestamps: true }
);
const NoteModel = mongoose.model("Laptop", NoteSchema);

const AuthSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { strict: false, timestamps: true, collection: "auth" }
);
const AuthModel = mongoose.model("Auth", AuthSchema);

module.exports = { NoteModel, AuthModel };
