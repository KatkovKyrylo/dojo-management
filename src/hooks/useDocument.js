import React from 'react';
import { firestore } from 'firebase/config';

export const useDocument = (collection, id) => {
  const [document, setDocument] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const ref = firestore.collection(collection).doc(id);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (!snapshot.data()) {
          setError('Document not found.');
          return;
        }

        setDocument({ ...snapshot.data(), id: snapshot.id });
        setError(null);
      },
      (err) => {
        console.log(err.message);
        setError('failed to get document');
      }
    );

    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};
