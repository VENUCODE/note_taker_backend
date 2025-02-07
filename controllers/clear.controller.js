const { NoteModel, AuthModel } = require("../models/index");
const clearDb = async (req, res) => {
  try {
    await NoteModel.deleteMany({});
    await AuthModel.deleteMany({});
    res.status(200).json({ message: "All records deleted successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error deleting records", error: e.toString() });
  }
};

module.exports = clearDb;
