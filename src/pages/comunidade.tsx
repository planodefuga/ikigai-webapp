import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../components/Button';
import { loginWithGoogle, logout } from '../auth/login';
import { useAuth } from '../hooks/useAuth';

export default function Comunidade() {
  const router = useRouter();
  const { user, loading, confirmarPagamento, userData } = useAuth();
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  useEffect(() => {
    if (router.query.payment === 'required') {
      setShowPaymentInfo(true);
    }
  }, [router.query]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              {userData?.progresso?.pixConfirmado 
                ? 'Bem-vindo à Comunidade Ikigai!'
                : 'Confirme seu Pagamento'}
            </h1>
            
            {userData?.progresso?.pixConfirmado ? (
              <>
                <p className="text-xl text-gray-700 mb-8">
                  Você já está logado. Acesse sua área de membros para começar sua jornada.
                </p>

                <div className="space-y-4">
                  <Button 
                    size="lg"
                    onClick={() => router.push('/dashboard')}
                  >
                    Acessar Área de Membros
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Sair
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                  <h2 className="heading-2 mb-6">Instruções de Pagamento</h2>
                  
                  <div className="text-left space-y-4">
                    <p>1. Faça o pagamento via PIX</p>
                    <p>2. Envie o comprovante para o WhatsApp</p>
                    <p>3. Aguarde a confirmação</p>
                    <p>4. Clique no botão abaixo após a confirmação</p>
                  </div>
                </div>

                <Button 
                  size="lg"
                  onClick={confirmarPagamento}
                >
                  Confirmar Pagamento
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="heading-1 mb-6">
            Acesse a Comunidade Ikigai
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Faça login com sua conta Google para acessar o conteúdo exclusivo da mentoria.
          </p>

          <Button 
            size="lg"
            onClick={handleLogin}
          >
            Entrar com Google
          </Button>
        </div>
      </div>
    </div>
  );
} 