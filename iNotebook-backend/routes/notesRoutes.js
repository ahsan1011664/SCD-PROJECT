const express = require('express');   // importing Express
const router = express.Router();
const { validationRules, validate } = require("../middleware/validationMiddleware");
const {authenticateUser} = require('../middleware/authMiddleware')
const {getAllNotes, addNote, updateNote, deleteNote, MoveNoteToTrash, getAllDeletedNotes, restoreNote} = require("../controllers/notesController")

// ROUTE 1:  Fetch All User Notes
router.get('/fetchAllNotes', authenticateUser, getAllNotes );

// ROUTE 2: Add Note
router.post('/addNote', authenticateUser, validationRules('notes'), validate, addNote);

// ROUTE 3: Update an Existing Note
router.put('/updateNote/:id', authenticateUser, validationRules('notes'), validate,updateNote);

// ROUTE 4: Delete a Note
router.delete('/deleteNote/:id', authenticateUser, deleteNote);

// ROUTE 5:  Fetch All Deleted Notes
router.get('/fetchAllDeletedNotes', authenticateUser, getAllDeletedNotes );

// ROUTE 4: Delete a Note
router.put('/moveNoteToTrash/:id', authenticateUser, MoveNoteToTrash);

// ROUTE 4: Restore a Note
router.put('/restoreNote/:id', authenticateUser, restoreNote);


module.exports = router;