import { useState } from 'react';
import { auth, firestore } from 'firebase/config';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    setError(null);
    setIsPending(true);

    try {
      // login
      const res = await auth.signInWithEmailAndPassword(email, password);

      await firestore
        .collection('users')
        .doc(res.user.uid)
        .update({ online: true });

      dispatch({ type: 'LOGIN', payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { login, isPending, error };
};
