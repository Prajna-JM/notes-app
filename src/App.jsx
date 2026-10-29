
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import NoteItem from "./NoteItem";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const { theme } = useContext(ThemeContext);

  // Save notes in localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Update browser tab title
  useEffect(() => {
    document.title = `Notes (${notes.length})`;
  }, [notes.length]);

  // Add a new note
  function addNote() {
    const text = input.trim();

    if (text === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      text: text
    };

    setNotes((previousNotes) => [...previousNotes, newNote]);
    setInput("");
  }

  // Delete a note
  function deleteNote(id) {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );
  }

  return (
    <div className={`app ${theme}`}>
      <div className="notes-container">
        <h1>My Notes</h1>

        <ThemeToggle />

        <div className="input-area">
          <input
            type="text"
            placeholder="Enter your note..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") addNote();
            }}
          />

          <button onClick={addNote}>Add Note</button>
        </div>

        <h3>Total Notes: {notes.length}</h3>

        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          <ul>
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={deleteNote}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
