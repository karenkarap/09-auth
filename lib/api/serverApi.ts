import { cookies } from 'next/headers';
import { nextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  query?: string,
  tag?: string
): Promise<NoteHttpResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<NoteHttpResponse>('/notes', {
    params: {
      search: query,
      page: page,
      perPage: 12,
      tag: tag,
    },
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
