import React, { useState, useEffect } from "react";
import noteContext from "./NoteContext";
import { getRequest, postRequest, putRequest, deleteRequest } from "../../axios";
import BASE_URL from "../../config"; // Import BASE_URL directly

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [deletedNotes, setDeletedNotes] = useState([]);

  // Use the BASE_URL from config.js
  const host = BASE_URL; // Use the dynamic URL

  useEffect(() => {
    // Fetch notes when component mounts
    getNotes();
    getDeletedNotes();
  }, []);

  // GET all notes
  const getNotes = async () => {
    try {
      const url = `/api/notes/fetchAllNotes`;
      console.log(url)
      const fetchedNotes = await getRequest(url);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    try {
      const url = `/api/notes/addNote`;
      const addedNote = await postRequest(url, { title, description, tag });
      setNotes([...notes, addedNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete Note
  const deleteNote = async (noteId) => {
    try {
      const url = `/api/notes/deleteNote/${noteId}`;
      await deleteRequest(url);
      setDeletedNotes((prevDeletedNotes) =>
        prevDeletedNotes.filter((note) => note._id !== noteId)
      );
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit/Update Note
  const updateNote = async (noteId, title, description, tag) => {
    try {
      const url = `/api/notes/updateNote/${noteId}`;
      await putRequest(url, { title, description, tag });

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId ? { ...note, title, description, tag } : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Move Note to Trash
  const moveNoteToTrash = async (noteId) => {
    try {
      const url = `/api/notes/moveNoteToTrash/${noteId}`;
      await putRequest(url);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error moving note to trash:", error);
    }
  };

  // Fetch All Deleted Notes
  const getDeletedNotes = async () => {
    try {
      const url = `/api/notes/fetchAllDeletedNotes`;
      const fetchedDeletedNotes = await getRequest(url);
      setDeletedNotes(fetchedDeletedNotes);
    } catch (error) {
      console.error("Error fetching deleted notes:", error);
    }
  };

  const restoreNote = async (noteId) => {
    try {
      const url = `/api/notes/restoreNote/${noteId}`;
      const data = await putRequest(url);

      setDeletedNotes(deletedNotes.filter((note) => note._id !== noteId));
      setNotes((prevNotes) => [...prevNotes, data.note]);

    } catch (error) {
      console.error("Error Restoring Note:", error);
    }
  }

  return (
    <noteContext.Provider value={{ notes, deletedNotes, addNote, deleteNote, updateNote, getNotes, moveNoteToTrash, getDeletedNotes, restoreNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
