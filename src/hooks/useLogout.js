import { useState } from 'react';
import { auth, firestore } from 'firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await firestore
        .collection('users')
        .doc(user.uid)
        .update({ online: false });

      await auth.signOut();

      dispatch({ type: 'LOGOUT' });

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
};
