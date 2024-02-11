"use client"
import PocketBase from 'pocketbase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Notes.module.css';

export const dynamic = 'force-dynamic',
  revalidate = 0

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const create = async() => {
    // const db = new PocketBase('http://127.0.0.1:8090');
    const db = new PocketBase('https://lotctl.pockethost.io');
    await db.collection('notes').create({
      title,
      content,
    }); 

    setContent('');
    setTitle('');

    router.refresh();
  }

  return (
    <div className={styles.formWrap}>
    <form onSubmit={create}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className={styles.buttonInner}>
        Create note
      </button>
    </form>
    </div>
  );
}