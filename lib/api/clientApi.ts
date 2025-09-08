import { Credentials, User } from '@/types/user';
import { nextServer } from './api';
import { CreatedNote, Note } from '@/types/note';

export const register = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>('/auth/register', credentials);
  return data;
};

export const login = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>('/auth/login', credentials);
  return data;
};

export const logout = async () => {
  await nextServer.post('/auth/logout');
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
  const response = await nextServer.get<NoteHttpResponse>('/notes', {
    params: {
      search: query,
      page: page,
      perPage: 12,
      tag: tag,
    },
  });
  return response.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (post: CreatedNote): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', post);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export interface updateMeProps {
  username: string;
}

export const updateMe = async (payload: updateMeProps) => {
  const response = await nextServer.patch<User>('/users/me', payload);
  return response.data;
};
