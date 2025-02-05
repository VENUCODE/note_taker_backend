const { NoteModel } = require("../models/index");

const getUserNotes = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    const notes = await NoteModel.find({ addedBy: user.id });
    res.json(notes).status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const addNewNote = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    const payload = { ...req.body, addedBy: user.id };
    const note = new NoteModel(payload);
    await note.save();

    return res
      .status(201)
      .json({ status: true, message: "Note added successfully !" });
  } catch (err) {
    return res.status(500).json({ error: err.message, status: false });
  }
};

const updateNote = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }

    const note = await NoteModel.findByIdAndUpdate(
      { _id: req.params.id, addedBy: user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({ message: "note not found", status: false });
    }

    res
      .status(200)
      .json({ message: "Laptop updated Successfully", status: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }

    const note = await NoteModel.findOneAndDelete({
      _id: req.params.id,
      addedBy: user.id,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted", status: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserNotes,
  addNewNote,
  updateNote,
  deleteNote,
};
