import axios from "axios";
import type { NewNoteData, Note } from "../types/note.ts";

interface NotesHttpResponse{
    results: Note[];
    totalPages: number;
}

interface NoteQueryResponse{
    results: Note[];
    totalPages: number;
}

export const fetchNotes = async (query: string, page: number, perPage: number = 12): Promise<NoteQueryResponse> => {
    try {
        const response = await axios.get<NotesHttpResponse>('https://notehub-public.goit.study/api/notes', {
            params: { search: query, page, perPage },
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            },
        }
        );
        return {
            results: response.data.results,
            totalPages: response.data.totalPages,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.status_message || error.message;
            throw new Error(`Failed to fetch notes: ${status ? `(${status})` : ""} ${message}`);
        } else {
            throw new Error("An unknown error occurred.");
        }
    }
};

export const createNote = async (noteData: NewNoteData) => {
  const res = await axios.post<Note>("/note", noteData);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
    await axios.delete(`/notes/${noteId}`);
};