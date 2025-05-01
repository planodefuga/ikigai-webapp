import { Button } from '../components/Button';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-1 mb-6">
            Mentoria Ikigai
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Descubra seu propósito e transforme sua carreira com a metodologia Ikigai.
          </p>

          <div className="space-y-4">
            <Button 
              size="lg"
              onClick={() => router.push('/comunidade')}
            >
              Começar Agora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 