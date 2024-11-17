import { useState, useEffect } from "react";
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Container, 
    Grid, 
    Paper, 
    Divider, 
    IconButton, 
    InputAdornment 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import Note from "../components/Note";
import api from "../api";
import "../styles/Home.css";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [editing, setEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [noteId, setNoteId] = useState(null);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => setNotes(res.data))
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then(() => {
                alert("Note deleted!");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        if (noteId) {
            // Update note
            api
                .put(`/api/notes/update/${noteId}/`, { title, content })
                .then(() => {
                    alert("Note updated!");
                    getNotes();
                    setEditing(false);
                })
                .catch((error) => alert(error));
        } else {
            // Create new note
            api
                .post("/api/notes/", { title, content })
                .then(() => {
                    alert("Note created!");
                    getNotes();
                    setEditing(false);
                })
                .catch((error) => alert(error));
        }
    };

    const handleNoteClick = (note) => {
        setNoteId(note.id);
        setTitle(note.title);
        setContent(note.content);
        setEditing(true);
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                fontFamily: "'Poppins', sans-serif",
                backgroundColor: "#0b192f",
                color: "#fff",
            }}
        >
            <Box
                sx={{
                    width: "25%",
                    backgroundColor: "#1e293b",
                    padding: "1.5rem",
                }}
            >
                <Box sx={{ marginBottom: "1.5rem" }}>
                    <TextField
                        placeholder="Search notes..."
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#94a3b8" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                color: "#fff",
                                backgroundColor: "#172a45",
                                "& fieldset": {
                                    borderColor: "#475569",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#0ea5e9",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#0ea5e9",
                                },
                            },
                        }}
                    />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: "#0ea5e9",
                        "&:hover": { backgroundColor: "#0284c7" },
                        marginBottom: "1rem",
                        fontWeight: "bold",
                        fontFamily: "'Poppins', sans-serif",
                    }}
                    onClick={() => {
                        setNoteId(null);
                        setTitle("");
                        setContent("");
                        setEditing(true);
                    }}
                >
                    Create Note
                </Button>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        color: "#0ea5e9",
                        marginBottom: "1rem",
                    }}
                >
                    My Notes
                </Typography>
                <Box sx={{ overflowY: "auto", maxHeight: "70vh" }}>
                    {filteredNotes.map((note) => (
                        <Paper
                            key={note.id}
                            onClick={() => handleNoteClick(note)}
                            sx={{
                                padding: "1rem",
                                marginBottom: "1rem",
                                backgroundColor: "#172a45",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "#0e1726",
                                },
                            }}
                        >
                            <Note note={note} onDelete={deleteNote} />
                        </Paper>
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    padding: "2rem",
                }}
            >
                {editing && (
                    <Paper
                        sx={{
                            padding: "2rem",
                            backgroundColor: "#1e293b",
                            borderRadius: "10px",
                            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        <form onSubmit={createNote}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        variant="outlined"
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                color: "#fff",
                                                "& fieldset": {
                                                    borderColor: "#475569",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#0ea5e9",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#0ea5e9",
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder="Content"
                                        multiline
                                        rows={10}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        variant="outlined"
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                color: "#fff",
                                                "& fieldset": {
                                                    borderColor: "#475569",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#0ea5e9",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#0ea5e9",
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        sx={{
                                            backgroundColor: "#0ea5e9",
                                            "&:hover": { backgroundColor: "#0284c7" },
                                            marginRight: "1rem",
                                        }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<CloseIcon />}
                                        onClick={() => setEditing(false)}
                                        sx={{
                                            borderColor: "#475569",
                                            color: "#fff",
                                            "&:hover": {
                                                borderColor: "#0ea5e9",
                                                backgroundColor: "#172a45",
                                            },
                                        }}
                                    >
                                        Close
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                )}
            </Box>
        </Box>
    );
};

export default Home;
