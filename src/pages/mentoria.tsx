import { useRouter } from 'next/router';
import { Button } from '../components/Button';
import { cronograma } from '../data/cronograma';

export default function Mentoria() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">
              Mentoria Ikigai: 21 Dias para Encontrar seu Propósito
            </h1>
            
            <p className="text-xl text-gray-700 mb-8">
              Uma jornada transformadora para descobrir sua verdadeira vocação profissional
            </p>

            <Button 
              size="lg"
              onClick={() => router.push('/comunidade')}
            >
              Garantir Minha Vaga
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="heading-2 mb-6">O que você vai receber:</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>21 dias de conteúdo exclusivo</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Exercícios práticos diários</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Acesso à comunidade exclusiva</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Suporte personalizado</span>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h2 className="heading-2 text-center">Cronograma da Mentoria</h2>
            
            {cronograma.map((modulo) => (
              <div key={modulo.id} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="heading-3 mb-2">{modulo.titulo}</h3>
                <p className="text-gray-600 mb-4">{modulo.descricao}</p>
                <p className="text-sm text-gray-500 mb-4">Duração: {modulo.duracao}</p>
                
                <div className="space-y-2">
                  {modulo.materiais.map((material, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <span className="mr-2">•</span>
                      {material.titulo}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg font-semibold mb-4">
              Vagas limitadas! Garanta sua vaga agora.
            </p>
            <Button 
              size="lg"
              onClick={() => router.push('/comunidade')}
            >
              Quero Participar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 