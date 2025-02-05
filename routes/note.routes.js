const router = require("express").Router();
const {
  getUserNotes,
  addNewNote,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");

router.get("/getall", getUserNotes);
router.post("/add-new", addNewNote);
router.patch("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);

module.exports = router;
