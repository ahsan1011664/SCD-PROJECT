import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { Trash2 } from "lucide-react";

function Trash() {
    const { deletedNotes, getDeletedNotes } = useContext(noteContext);

    useEffect(() => {
        getDeletedNotes(); // Fetch deleted notes when the component mounts
    }, []);

    return (
        <div>

            {/* Header */}
            <div className="mx-auto flex justify-between items-center my-4 px-2 sm:px-6 mt-4">
                <h2 className="text-2xl md:text-3xl font-bold">Trash</h2>
                <button
                    className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                    <Trash2 size={20}/>
                    <span className="hidden md:block">Delete All Notes</span>
                </button>
            </div>

                {/* Trash Notes List */}
                <div className="max-w-screen-xl mx-auto px-2 sm:px-6 mt-6">
                    {deletedNotes.length === 0 ? (
                        <p className="text-gray-600">No Notes In Trash.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {deletedNotes.map((note) => (
                                <NoteItem key={note._id} note={note} isTrash={true} />
                            ))}
                        </div>
                    )}
                </div>
            
        </div>
    );
}

export default Trash;
