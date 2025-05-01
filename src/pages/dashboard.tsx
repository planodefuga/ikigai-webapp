import { useRouter } from 'next/router';
import { Button } from '../components/Button';
import { cronograma } from '../data/cronograma';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const router = useRouter();
  const { user, userData, marcarAulaConcluida, marcarExercicioRespondido } = useAuth();

  return (
    <ProtectedRoute requirePayment>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-1 mb-8">Dashboard</h1>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="heading-2 mb-4">Seu Progresso</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Aulas Concluídas</span>
                    <span className="text-gray-700">
                      {Object.keys(userData?.progresso?.aulasConcluidas || {}).length} / {cronograma.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(Object.keys(userData?.progresso?.aulasConcluidas || {}).length) / cronograma.length * 100}%` 
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Exercícios Respondidos</span>
                    <span className="text-gray-700">
                      {Object.keys(userData?.progresso?.respostas || {}).length} / {exercicios.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-600 h-4 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(Object.keys(userData?.progresso?.respostas || {}).length) / exercicios.length * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="heading-2 mb-6">Próximas Aulas</h2>
                <div className="space-y-4">
                  {cronograma.map((aula, index) => (
                    <div 
                      key={aula.id}
                      className={`p-4 rounded-lg border ${
                        userData?.progresso?.aulasConcluidas?.[aula.id]
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{aula.titulo}</h3>
                          <p className="text-sm text-gray-600">{aula.data}</p>
                        </div>
                        {userData?.progresso?.aulasConcluidas?.[aula.id] ? (
                          <span className="text-green-600">✓ Concluída</span>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => marcarAulaConcluida(aula.id)}
                          >
                            Marcar como Concluída
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="heading-2 mb-6">Exercícios Pendentes</h2>
                <div className="space-y-4">
                  {exercicios.map((exercicio) => (
                    <div 
                      key={exercicio.id}
                      className={`p-4 rounded-lg border ${
                        userData?.progresso?.respostas?.[exercicio.id]
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{exercicio.titulo}</h3>
                          <p className="text-sm text-gray-600">{exercicio.descricao}</p>
                        </div>
                        {userData?.progresso?.respostas?.[exercicio.id] ? (
                          <span className="text-green-600">✓ Respondido</span>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => marcarExercicioRespondido(exercicio.id, true)}
                          >
                            Marcar como Respondido
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 