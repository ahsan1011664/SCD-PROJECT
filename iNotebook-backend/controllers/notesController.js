const Note = require('../models/Note');

// Reusable function to get notes
const getNotes = async (req, res, isDeleted) => {
    try {
        const userId = req.user.id;
        const notes = await Note.find({ user: userId, isDeleted });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// Get all non-deleted notes
const getAllNotes = (req, res) => getNotes(req, res, false);

// Get all deleted notes
const getAllDeletedNotes = (req, res) => getNotes(req, res, true);

// Add a new note
const addNote = async (req, res) => {
    const { title, description, tag } = req.body;
    const userId = req.user.id;

    try {
        const newNote = new Note({ title, description, tag, user: userId });
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// Update an existing note
const updateNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id;

    try {
        let note = await Note.findById(noteId);
        if (!note) return res.status(404).send({ error: "Note Not Found!" });

        if (note.user.toString() !== userId) return res.status(401).send("Not Allowed!");

        // Update note directly with fields from req.body
        note = await Note.findByIdAndUpdate(noteId, { $set: req.body }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// Move a note to trash (soft delete)
const MoveNoteToTrash = async (req, res) => {
    try {
        const noteId = req.params.id;
        const userId = req.user.id;

        const note = await Note.findOne({ _id: noteId, user: userId });
        if (!note) return res.status(404).json({ error: "Note not found or not authorized" });

        note.isDeleted = true;
        await note.save();

        res.json({ message: "Note moved to trash", note });
    } catch (error) {
        console.error("Error moving note to trash:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Move a note to trash (soft delete)
const restoreNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const userId = req.user.id;

        const note = await Note.findOne({ _id: noteId, user: userId });
        if (!note) return res.status(404).json({ error: "Note not found or not authorized" });

        note.isDeleted = false;
        await note.save();

        res.json({ message: "Note Restored", note });
    } catch (error) {
        console.error("Error moving note to trash:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Permanently delete a note
const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const userId = req.user.id;

        const note = await Note.findOneAndDelete({ _id: noteId, user: userId });
        
        if (!note) return res.status(404).json({ error: "Note not found or not authorized" });

        await Note.findByIdAndDelete(noteId);
        res.json({ message: "Note deleted successfully", note });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getAllNotes, addNote, updateNote, deleteNote, getAllDeletedNotes, MoveNoteToTrash, restoreNote };
