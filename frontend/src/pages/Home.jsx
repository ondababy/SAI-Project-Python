import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"; // Import the updated CSS file

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [editing, setEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Added state for search term
    const [noteId, setNoteId] = useState(null);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`) // Fixed endpoint URL syntax
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        if (noteId) {
            // Update existing note
            api
                .put(`/api/notes/update/${noteId}/`, { title, content }) // Fixed endpoint URL syntax
                .then((res) => {
                    if (res.status === 200) {
                        alert("Note updated!");
                        getNotes();
                        setEditing(false);
                    } else {
                        alert("Failed to update note.");
                    }
                })
                .catch((error) => alert(error));
        } else {
            // Create new note
            api
                .post("/api/notes/", { title, content })
                .then((res) => {
                    if (res.status === 201) {
                        alert("Note created!");
                        getNotes();
                        setEditing(false);
                    } else {
                        alert("Failed to create note.");
                    }
                })
                .catch((error) => alert(error));
        }
    };

    // Filter notes based on search term
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNoteClick = (note) => {
        setNoteId(note.id);
        setTitle(note.title);
        setContent(note.content);
        setEditing(true);
    };

    return (
        <div className="home-container">
            <div className="sidebar">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="fas fa-search search-icon"></i>
                </div>
                <button
                    className="doc-create"
                    onClick={() => {
                        setNoteId(null);
                        setTitle('');
                        setContent('');
                        setEditing(true);
                    }}
                >
                    + Create Note
                </button>
                <h2>My Notes</h2>
                <div className="notes-container">
                    {filteredNotes.map((note) => (
                        <div key={note.id} onClick={() => handleNoteClick(note)}>
                            <Note note={note} onDelete={deleteNote} />
                        </div>
                    ))}
                </div>
            </div>
    
            <div className="content">
                {editing && (
                    <div className="document-editor">
                        <form onSubmit={createNote}>
                            <button
                                type="submit"
                                className="save-button"
                            >
                                Save Note
                            </button>
                            <button
                                type="button"
                                className="doc-button"
                                onClick={() => setEditing(false)}
                            >
                                Close
                            </button>
                            <div className="editor-header">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="editor-title"
                                    required
                                />
                            </div>
                            <div
                                contentEditable="true"
                                className="editable-area"
                                onInput={(e) => setContent(e.target.textContent)}
                            >
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );    
}

export default Home;
