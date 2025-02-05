const router = require("express").Router();

const uploadFiles = require("../middlewares/filehandle.middleware");
const { Register, Login } = require("../controllers/auth.controller");

const handleFileUpload = uploadFiles("/users").single("profilePic");
router.post("/register", handleFileUpload, Register);
router.post("/login", Login);

module.exports = router;
