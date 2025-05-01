import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePayment?: boolean;
}

export function ProtectedRoute({ children, requirePayment = false }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, userData, loading, error } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/comunidade');
      } else if (requirePayment && !userData?.progresso?.pixConfirmado) {
        router.push('/comunidade?payment=required');
      }
    }
  }, [user, userData, loading, requirePayment, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  if (!user || (requirePayment && !userData?.progresso?.pixConfirmado)) {
    return null;
  }

  return <>{children}</>;
} 