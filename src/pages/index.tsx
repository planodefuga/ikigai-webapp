import { useRouter } from 'next/router';
import { Button } from '../components/Button';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-1 mb-6 text-gray-900">
            Você está preso em um emprego que não te realiza?
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Descubra como encontrar seu propósito profissional e construir uma carreira que faça sentido para você.
          </p>

          <div className="space-y-4">
            <Button 
              size="lg"
              onClick={() => router.push('/quiz')}
              className="w-full md:w-auto"
            >
              Fazer Diagnóstico Gratuito
            </Button>
            
            <p className="text-sm text-gray-500">
              Leva menos de 5 minutos • 100% gratuito
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 