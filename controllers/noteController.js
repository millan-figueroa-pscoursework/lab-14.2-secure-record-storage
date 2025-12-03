const Note = require("../models/Note");

// GET /api/notes - get all notes for the logged-in user
async function getAllNotes(req, res) {
  try {
    //only notes that belong to this user
    const notes = await Note.find({
      user: req.user._id,
    }).toSorted({
      createdAt: -1,
    });
    res.json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// GET /api/notes/:id = get a single note owned owned by the logged-in user
async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // ownership check
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Forbidden: not your note" });
    }

    res.json(note);
  } catch (err) {
    console.error("Error fetching note:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// POST /api/notes - create a new note for the logged-in user
async function createNote(req, res) {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      user: req.user._id, // associate with logged-in user
    });

    res.status(201).json(note);
  } catch (err) {
    console.error("Error creating note:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
};
