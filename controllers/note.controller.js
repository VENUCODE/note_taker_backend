const { NoteModel } = require("../models/index");

const getUserNotes = async (req, res) => {
  try {
    const user = req.user;
    const notes = await NoteModel.find({ addedBy: user });
    res.json(notes).status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getUserFavourites = async (req, res) => {
  try {
    const user = req.user;
    const notes = await NoteModel.find({ addedBy: user, fav: true });
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

    // Extract body fields
    const { title, description } = req.body;

    // Initialize payload
    const payload = {
      title,
      description,
      addedBy: user,
    };

    // Check if images were uploaded
    if (req.files && req.files.images) {
      payload.images = req.files.images.map(
        (file) => "/uploads/notes/" + file.filename
      );
    }

    // Check if audio was uploaded
    if (req.files && req.files.audio) {
      payload.audio = "/uploads/notes/" + req.files.audio[0].filename;
    }

    // Save note to DB
    const note = new NoteModel(payload);
    await note.save();

    return res.status(201).json({
      status: true,
      message: "Note added successfully!",
      note,
    });
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
      { _id: req.params.id, addedBy: user },
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
      .json({ message: "Note updated Successfully", status: true });
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
      addedBy: user,
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
const addMorePhotos = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    const files = [];
    const noteId = req.params.id;

    if (req.file) {
      files.push(req.file.path);
    }
    if (req.files && req.files.images) {
      files.push(
        ...req.files.images.map((file) => "/uploads/notes/" + file.filename)
      );
    }
    const updatedNote = await NoteModel.findByIdAndUpdate(
      noteId,
      {
        $push: { images: files },
      },
      { new: true }
    );
    return res.status(201).json({
      status: true,
      message: "Images added!",
      note: updatedNote,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message, status: false });
  }
};
module.exports = {
  getUserNotes,
  addNewNote,
  updateNote,
  addMorePhotos,
  deleteNote,
  getUserFavourites,
};
