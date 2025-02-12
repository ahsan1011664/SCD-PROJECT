import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import noteContext from "../context/notes/NoteContext";

function EditNoteModal({ isOpen, onClose, currentNote }) {

  const { updateNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  useEffect(() => {
    if (currentNote) {
      setNote({
        title: currentNote.title,
        description: currentNote.description,
        tag: currentNote.tag || "",
      });
    } else {
      setNote({ title: "", description: "", tag: "" });
    }
  }, [currentNote, isOpen]);

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleUpdateNote = () => {

    if (note.title.trim() && note.description.trim()) {
      updateNote(currentNote._id, note.title, note.description, note.tag);
      onClose();
      toast.success("Note Updated Successfully.")
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 
                transition-opacity duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
    >
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 transform transition-all duration-300">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{currentNote ? "Edit Note" : "Add Note"}</h3>
          <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="mt-4">
          <form className="space-y-3">
            <div>
              <label htmlFor="title" className="block font-medium">Title</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                id="title"
                name="title"
                value={note.title}
                onChange={handleOnChange}
                placeholder="Enter Title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium">Description</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2"
                id="description"
                name="description"
                value={note.description}
                rows="3"
                onChange={handleOnChange}
                placeholder="Enter Description"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="tag" className="block font-medium">Tag</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                id="tag"
                name="tag"
                value={note.tag}
                onChange={handleOnChange}
                placeholder="Enter Tag (optional)"
              />
            </div>
          </form>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition" onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={handleUpdateNote}
            className="px-4 py-2 rounded-lg bg-blue-800 text-white hover:bg-blue-900 transition"
          >
            {currentNote ? "Update Note" : "Add Note"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditNoteModal;
