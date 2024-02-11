import PocketBase from 'pocketbase';
import styles from '../Notes.module.css';
import Link from 'next/link';

export const dynamic = 'force-dynamic',
  revalidate = 0

async function getNote(noteId: string) {
  // const db = new PocketBase('http://127.0.0.1:8090');
  const db = new PocketBase('https://lotctl.pockethost.io');
  const res = await db.collection('notes').getOne(noteId);
  const data = await res;
  return data;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
      </div>
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}