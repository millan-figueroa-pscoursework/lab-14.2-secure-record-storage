const express = require("express");
const router = express.Router();
const Note = require("../../models/Note");
const auth = require("../../middleware/auth"); // da middlewarez

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
