import { useRouter } from 'next/router';
import { Button } from '../components/Button';
import { cronograma } from '../data/cronograma';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const router = useRouter();
  const { user, marcarAulaConcluida, marcarExercicioRespondido } = useAuth();

  return (
    <ProtectedRoute requirePayment>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h1 className="heading-1">
                Meu Progresso
              </h1>
              
              <Button 
                variant="outline"
                onClick={() => router.push('/comunidade')}
              >
                Sair
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <h2 className="heading-2 mb-6">Progresso Geral</h2>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(user?.progresso.aulasConcluidas.length || 0) / cronograma.length * 100}%` 
                  }}
                />
              </div>
              
              <p className="text-gray-600">
                {user?.progresso.aulasConcluidas.length || 0} de {cronograma.length} módulos completos
              </p>
            </div>

            <div className="space-y-8">
              {cronograma.map((modulo) => (
                <div 
                  key={modulo.id} 
                  className={`bg-white rounded-xl p-6 shadow-lg ${
                    user?.progresso.aulasConcluidas.includes(modulo.id.toString())
                      ? 'border-2 border-green-500' 
                      : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="heading-3 mb-2">{modulo.titulo}</h3>
                      <p className="text-gray-600">{modulo.descricao}</p>
                    </div>
                    
                    {!user?.progresso.aulasConcluidas.includes(modulo.id.toString()) && (
                      <Button
                        size="sm"
                        onClick={() => marcarAulaConcluida(modulo.id.toString())}
                      >
                        Marcar como Completo
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {modulo.materiais.map((material, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <span className="mr-2">•</span>
                          {material.titulo}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            window.open(material.link, '_blank');
                            if (material.tipo === 'exercicio') {
                              marcarExercicioRespondido(`semana${modulo.id}`);
                            }
                          }}
                        >
                          Acessar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 