import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

interface NoteListProps {
  data: Note[];
}

function NoteList({ data }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {data.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.details} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button onClick={() => mutate(note.id)} className={css.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
