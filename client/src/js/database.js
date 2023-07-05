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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');

  // Create connection to the database
  const jateDb = await openDB('jate', 1);

  // Create new transaction and specify the database and data privileges
  const tx = jateDb.transaction(['jate'], 'readwrite');

  // Open object store
  const store = tx.objectStore('jate');

  // Add data to the object store
  const request = store.add({ content });

  // Confirm the request
  const result = await request;
  console.log('Data saved to the database', result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create connection to the database
  const jateDb = await openDB('jate', 1);

  // Create new transaction and specify the database and data privileges
  const tx = jateDb.transaction(['jate'], 'readonly');

  // Open object store
  const store = tx.objectStore('jate');

  // GET all data in the object store
  const request = store.getAll();

  // Confirm the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

// Start the database
initdb();
