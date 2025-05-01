import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase-client';
import { onAuthStateChanged, User } from 'firebase/auth';
import { loginWithGoogle, logout } from '../auth/login';
import { UserData } from '../types/user';

interface AuthState {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    userData: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Busca os dados completos do usuário
          const token = await user.getIdToken();
          const response = await fetch('/api/user/progress', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Erro ao buscar dados do usuário');
          }

          const userData = await response.json();
          setState((prev) => ({
            ...prev,
            user,
            userData,
            loading: false,
          }));
        } catch (error) {
          setState((prev) => ({
            ...prev,
            user,
            loading: false,
            error: error as Error,
          }));
        }
      } else {
        setState((prev) => ({
          ...prev,
          user: null,
          userData: null,
          loading: false,
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const userData = await loginWithGoogle();
      setState((prev) => ({
        ...prev,
        userData,
        loading: false,
      }));
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
      setState((prev) => ({
        ...prev,
        user: null,
        userData: null,
      }));
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