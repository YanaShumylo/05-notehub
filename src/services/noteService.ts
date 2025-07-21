import axios from "axios";
import type { NewNoteData, Note } from "../types/note.ts";


const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

if (!myKey) {
  throw new Error("VITE_NOTEHUB_TOKEN is not defined in .env file");
}

const myApiKey = `Bearer ${myKey}`;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common['Authorization'] = myApiKey;

console.log("➡️ Authorization header set to:", axios.defaults.headers.common["Authorization"]);
interface NotesParamsResponse{
    page?: number;
    perPage?: number;
    search?: string;
}

interface NotesHttpResponse{
  data: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

interface NotesResponse{
 notes: Note[];
  totalPages: number;
}
export const fetchNotes = async ({ search, page = 1, perPage = 12 }: NotesParamsResponse): Promise<NotesHttpResponse> => {
  const response = await axios.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(typeof search === "string" && search.trim() !== "" ? { search } : {}),
            }
            }
        );
        
  return {
    page,
    perPage,
    data: response.data.notes,
    totalPages: response.data.totalPages,
        };
    };

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  try {
    const res = await axios.post<Note>(
      "/notes",
      noteData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message =
        error.response?.data?.status_message || error.message;
      throw new Error(
        `Failed to create note: ${status ? `(${status})` : ""} ${message}`
      );
    } else {
      throw new Error("An unknown error occurred while creating note.");
    }
  }
};

export const deleteNote = async (noteId: string) => {
    await axios.delete(`/notes/${noteId}`);
    };
