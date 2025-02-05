const { AuthModel } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        profile_pic: user.profile_pic,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await AuthModel.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }
    const profile_pic = "/uploads/users/" + req.file.filename;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AuthModel({
      username,
      email,
      password: hashedPassword,
      profile_pic,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { Login, Register };
