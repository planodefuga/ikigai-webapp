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

  const confirmarPagamento = async () => {
    if (!state.user) {
      throw new Error('Usuário não autenticado');
    }

    try {
      setState((prev) => ({ ...prev, loading: true }));
      const token = await state.user.getIdToken();
      
      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          progresso: {
            ...state.userData?.progresso,
            pixConfirmado: true,
            respostas: state.userData?.progresso?.respostas || {},
            ultimaAtualizacao: new Date(),
            ...(state.userData?.progresso?.etapaAtual !== undefined && {
              etapaAtual: state.userData.progresso.etapaAtual
            })
          }
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao confirmar pagamento');
      }

      setState((prev) => {
        if (!prev.userData) {
          return {
            ...prev,
            userData: {
              id: prev.user?.uid || '',
              email: prev.user?.email || '',
              nome: prev.user?.displayName || '',
              progresso: {
                pixConfirmado: true,
                etapaAtual: 0,
                respostas: {},
                ultimaAtualizacao: new Date()
              }
            },
            loading: false
          };
        }

        return {
          ...prev,
          userData: {
            ...prev.userData,
            progresso: {
              ...prev.userData.progresso,
              pixConfirmado: true,
              respostas: prev.userData.progresso?.respostas || {},
              etapaAtual: prev.userData.progresso?.etapaAtual || 0,
              ultimaAtualizacao: new Date()
            }
          },
          loading: false
        };
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error as Error,
        loading: false
      }));
      throw error;
    }
  };

  const marcarAulaConcluida = async (aulaId: string) => {
    if (!state.user) {
      throw new Error('Usuário não autenticado');
    }

    try {
      setState((prev) => ({ ...prev, loading: true }));
      const token = await state.user.getIdToken();
      
      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          progresso: {
            ...state.userData?.progresso,
            aulasConcluidas: {
              ...state.userData?.progresso?.aulasConcluidas,
              [aulaId]: true
            },
            ultimaAtualizacao: new Date()
          }
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao marcar aula como concluída');
      }

      const updatedData = await response.json();
      setState((prev) => ({
        ...prev,
        userData: updatedData,
        loading: false
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error as Error,
        loading: false
      }));
      throw error;
    }
  };

  const marcarExercicioRespondido = async (exercicioId: string, resposta: string | number | boolean) => {
    if (!state.user) {
      throw new Error('Usuário não autenticado');
    }

    try {
      setState((prev) => ({ ...prev, loading: true }));
      const token = await state.user.getIdToken();
      
      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          progresso: {
            ...state.userData?.progresso,
            respostas: {
              ...state.userData?.progresso?.respostas,
              [exercicioId]: resposta
            },
            ultimaAtualizacao: new Date()
          }
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar resposta do exercício');
      }

      const updatedData = await response.json();
      setState((prev) => ({
        ...prev,
        userData: updatedData,
        loading: false
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error as Error,
        loading: false
      }));
      throw error;
    }
  };

  return {
    ...state,
    signIn,
    signOut,
    confirmarPagamento,
    marcarAulaConcluida,
    marcarExercicioRespondido
  };
} 