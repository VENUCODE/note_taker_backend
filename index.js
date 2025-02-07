const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const noteRoutes = require("./routes/note.routes");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middlewares/auth.middleware");

const cors = require("cors");
const clearDb = require("./controllers/clear.controller");
const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/note", authMiddleware, noteRoutes);

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};
startServer();

app.get("/", (req, res) => {
  res.json({ message: "server is running " }).status(200);
});
app.get("/cleardb", clearDb);
