import PocketBase from 'pocketbase';
import Link from 'next/link';
import styles from './Notes.module.css';
import CreateNote from './CreateNote';
import DeleteNote from './DeleteNote';

export const dynamic = 'force-dynamic',
  revalidate = 0
  
async function getNotes() {
  const db = new PocketBase('https://lotctl.pockethost.io');
  const res = await db.collection('notes').getList(1,30);
  const data = await res;
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
      <CreateNote />
    </div>
  );
}


function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
   
      <div className={styles.note}>
        <DeleteNote noteId={note.id} />
        <Link href={`/notes/${id}`}>
          <h2 className={styles.title}>{title}</h2>
          <h5>{content}</h5>
          <p>{created}</p>
        </Link>
      </div>
    
  );
}