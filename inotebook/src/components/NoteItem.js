import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { Trash2, Edit, Trash, RotateCcw } from "lucide-react"; // Using RotateCcw for circular restore icon
import EditNoteModal from "./EditNoteModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteItem = ({ note, isTrash }) => {
    const { moveNoteToTrash, restoreNote, deleteNote } = useContext(noteContext);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const openEditModal = () => {
        setCurrentNote(note);
        setIsEditModalOpen(true);
    };

    const handleMoveToTrash = () => {
        moveNoteToTrash(note._id);
        toast.success("Note moved to Trash.");
    };

    const handleRestoreNote = () => {
        restoreNote(note._id);
        toast.success("Note Restored Successfully.");
    };

    const handleDeleteNote = () => {
        deleteNote(note._id);
        toast.error("Note Deleted Successfully!");
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition 
                        flex flex-col justify-between min-h-[180px]"> 
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-800 truncate">{note.title}</h3>
                    <div className="flex gap-2">
                        {isTrash ? (
                            <>
                                <button
                                    onClick={handleRestoreNote}
                                    className="text-green-500 hover:text-green-700 transition"
                                >
                                    <RotateCcw size={20} />
                                </button>

                                <button
                                    onClick={handleDeleteNote}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <Trash size={20} />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleMoveToTrash}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <Trash2 size={20} />
                                </button>
                                
                                <button
                                    onClick={openEditModal}
                                    className="text-blue-500 hover:text-blue-700 transition"
                                >
                                    <Edit size={20} />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex-grow">
                    <p className="text-gray-600 text-md break-words">
                        {note.description.length > 100 ? `${note.description.substring(0, 100)}...` : note.description}
                    </p>
                </div>
            </div>

            {/* Fixed Position Tag */}
            {note.tag && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-md self-start mt-2">
                    {note.tag}
                </span>
            )}

            {/* Edit Note Modal */}
            <EditNoteModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                currentNote={currentNote}
            />
        </div>
    );
};

export default NoteItem;
