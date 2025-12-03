const express = require("express");
const router = express.Router();
const Note = require("../../models/Note");
const auth = require("../../middleware/auth"); // da middlewarez

// @route   GET /api/notes
// @desc    Get all notes owned by the logged-in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/notes/:id
// @desc    Get a single note (only if owned by the user)
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    // create new note associated with logged-in user
    const note = await Note.create({
      title,
      content,
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
