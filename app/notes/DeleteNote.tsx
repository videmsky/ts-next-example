"use client"
import PocketBase from 'pocketbase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Notes.module.css';

export const dynamic = 'force-dynamic',
  revalidate = 0

interface DeleteNoteProps {
  noteId: string;
} 

export default function DeleteNote({ noteId }: DeleteNoteProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  
  const handleDeleteNote = async() => {
    setIsDeleting(true);
    // const db = new PocketBase('http://127.0.0.1:8090');
    const db = new PocketBase('https://lotctl.pockethost.io');
    await db.collection('notes').delete(noteId);
    setIsDeleting(false);

    router.refresh();
  }

  return (
    // on click of the button, the note will be deleted
    <button 
      disabled={isDeleting}
      onClick={handleDeleteNote}
      className={styles.deleteButton}
    >
      {isDeleting ? 'x' : 'x'}
    </button>
  );
}
