
import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;

const initdb = async () =>
  openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log(`database already exists`);
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log(`database created`);
    },
  });

export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction(DB_NAME, 'readwrite');
  await tx.objectStore(DB_NAME).add({ content: content });
  console.log('Data added to the database');
};

export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction(DB_NAME, 'readonly');
  const data = await tx.objectStore(DB_NAME).getAll();
  console.log('Data fetched from the database');
  return data.length > 0 ? data[data.length - 1].content : '';
};

initdb();
