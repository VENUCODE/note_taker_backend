const router = require("express").Router();
const {
  getUserNotes,
  addNewNote,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");
const uploadFiles = require("../middlewares/filehandle.middleware");
const handleFileUpload = uploadFiles("notes").fields([
  { name: "audio", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

router.post("/add-new", handleFileUpload, addNewNote);
router.get("/getall", getUserNotes);
router.patch("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);

module.exports = router;
