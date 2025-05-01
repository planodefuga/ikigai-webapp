import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase-client';
import { onAuthStateChanged, User } from 'firebase/auth';
import { loginWithGoogle, logout } from '../auth/login';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState((prev) => ({
        ...prev,
        user,
        loading: false,
      }));
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await loginWithGoogle();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error as Error,
        loading: false,
      }));
    }
  };

  const signOut = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await logout();
      setState((prev) => ({ ...prev, user: null }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error as Error,
        loading: false,
      }));
    }
  };

  return {
    ...state,
    signIn,
    signOut,
  };
} 