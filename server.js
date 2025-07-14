import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url"; // Required for ES modules
import { dirname } from "path";
import mongoose from "mongoose";
import Notes from "./models/Notes.js";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Db Connected"))
  .catch((err) => console.error("Db connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.locals.MAIN_URL = process.env.MAIN_URL || "http://localhost:3000";
  next();
});
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", async (req, res) => {
  try {
    const notes = await Notes.find().sort({ updatedAt: -1 });
    res.render("index", { notes });
  } catch (err) {
    res.status(500).send("Error loading notes");
  }
});

app.get("/login", (req, res) => {
  res.render("login", { root: __dirname});
});

app.get("/termsAndConditions", (req, res) => {
  res.render("terms", { root: __dirname});
});

app.get("/signup", (req, res) => {
  res.render("signup", { root: __dirname});
});

app.post("/getNotes", async (req, res) => {
  let notes = await Notes.find({ email: req.body.user });
  res.status(200).json({ success: true, notes });
});

app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body);
  console.log(user);
  if (!user) {
    return res.status(200).json({ success: false, message: "user not found" });
  } else {
    return res.status(200).json({
      success: true,
      user: { email: user.email },
      message: "user found",
    });
    res.redirect(process.env.MAIN_URL);
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  let user = await User.create(req.body);
  res.status(200).json({ success: true, user: user });
});

app.post("/addNote", async (req, res) => {
  let note = await Notes.create(req.body);
  res.status(200).json({ success: true, note: note });
});

app.delete("/deleteNote/:id", async (req, res) => {
  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put("/editNote", async (req, res) => {
  try {
    const { _id, title, desc } = req.body;
    await Notes.findByIdAndUpdate(_id, { title, desc });
    res.json({ success: true });
  } catch (err) {
    console.log("error here");
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});
