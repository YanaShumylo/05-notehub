export interface Note {
    id: number;
    title: string;
    content: string;
    created: string;
    updated: string;
    tag: string;
}

export interface NewNoteData{
    title: string;
    content: string;
    tag: string;
}