import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { Plus } from "lucide-react";

function Notes() {
    const { notes, getNotes, addNote } = useContext(noteContext);
    const [isOpen, setIsOpen] = useState(false); // Manage modal state

    useEffect(() => {
        getNotes(); // Fetch notes when component mounts
    }, []);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="">           
            {/* Header */}
            <div className="mx-auto flex justify-between items-center my-4 px-2 sm:px-6 mt-4">
                <h2 className="text-2xl md:text-3xl font-bold">Your Notes</h2>
                <button
                    className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                    onClick={openModal}
                >
                    <Plus size={18} />
                    <span className="hidden md:block">Add Note</span>
                </button>
            </div>

            {/* Notes List */}
            <div className="max-w-screen-xl mx-auto px-2 sm:px-6 mt-6">
                {notes.length === 0 ? (
                    <p className="text-gray-600">No Notes Added Yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notes.map((note) => (
                            <NoteItem key={note._id} note={note} isTrash={false} />
                        ))}
                    </div>
                )}
            </div>

            {/* Add Note Modal */}
            <AddNote isOpen={isOpen} onClose={closeModal} addNote={addNote} />
        </div>
    );
}

export default Notes;