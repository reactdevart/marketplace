const DB_NAME = 'FilesDatabase';
const STORE_NAME = 'Files';

export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = (error) => reject(error);
  });
};

export const saveFilesToIndexedDB = (db, files) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const promises = files.map((file) => {
      return new Promise((res, rej) => {
        const request = store.add({ fileName: file.name, file });
        request.onsuccess = () => res(`Saved: ${file.name}`);
        request.onerror = () => rej(`Error saving: ${file.name}`);
      });
    });

    Promise.all(promises)
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};

export const getAllFilesFromIndexedDB = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.getAll(); // Fetch all records
    request.onsuccess = () => resolve(request.result);
    request.onerror = (error) => reject('Error fetching files:', error);
  });
};

export const clearObjectStore = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.clear();
    request.onsuccess = () => resolve('All records cleared from object store!');
    request.onerror = (error) => reject('Error clearing object store:', error);
  });
};

export const deleteDatabase = () => {
  const deleteRequest = indexedDB.deleteDatabase(DB_NAME);

  deleteRequest.onsuccess = function () {
    console.log(`Database '${DB_NAME}' deleted successfully.`);
  };

  deleteRequest.onerror = function (event) {
    console.error(`Error deleting database '${DB_NAME}':`, event.target.error);
  };

  deleteRequest.onblocked = function () {
    console.warn(`Database '${DB_NAME}' deletion is blocked. Close all connections.`);
  };
};

export const getImages = async () => {
  try {
    const db = await openDatabase();
    const result = await getAllFilesFromIndexedDB(db);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateFormState = (setFormState, callback) => {
  setFormState((prev) => callback(prev));
};

export const mergeImagesWithExistingState = (data, images) => ({
  ...data,
  pictures: {
    ...(data?.pictures ?? {}),
    value: [...(data?.pictures?.value ?? []), ...(images?.map((image) => image?.file) ?? [])],
  },
});
