import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService.ts";
import type { Note } from "../../types/note.ts";

import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onSelect: (note: Note) => void;
}

export default function NoteList({ notes, onSelect }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      alert("Failed to delete note");
    },
  });

  const handleDelete = (noteId: string) => {
    deleteNoteMutation.mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => onSelect(note)}
          className={css.listItem}
        >
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(note.id.toString());
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}