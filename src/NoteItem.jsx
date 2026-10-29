
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function NoteItem({ note, onDelete }) {
  const { theme } = useContext(ThemeContext);

  return (
    <li className={`note-item ${theme}`}>
      <span>{note.text}</span>

      <button onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </li>
  );
}

export default NoteItem;
