import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { UserProgress } from '../types/user';

export function useProgress() {
  const { user } = useAuth();
  const [progresso, setProgresso] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setProgresso(null);
      setLoading(false);
      return;
    }

    const fetchProgresso = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch('/api/user/progress', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar progresso');
        }

        const data = await response.json();
        setProgresso(data.progresso || null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      } finally {
        setLoading(false);
      }
    };

    fetchProgresso();
  }, [user]);

  const updateProgresso = async (novoProgresso: UserProgress) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ progresso: novoProgresso })
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar progresso');
      }

      setProgresso(novoProgresso);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      throw err;
    }
  };

  return {
    progresso,
    loading,
    error,
    updateProgresso
  };
} 