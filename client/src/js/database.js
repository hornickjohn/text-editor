import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
    const jateDB = await openDB('jate', 1);
    const transaction = jateDB.transaction('jate','readwrite');
    const store = transaction.objectStore('jate');
    const request = store.add({text:content});
    await request;
};

export const getDb = async () => {
    const jateDB = await openDB('jate', 1);
    const transaction = jateDB.transaction('jate','readonly');
    const store = transaction.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    return result;
};

initdb();
