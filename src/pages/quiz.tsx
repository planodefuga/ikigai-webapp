import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../components/Button';

interface Pergunta {
  id: number;
  texto: string;
  opcoes: {
    texto: string;
    valor: number;
  }[];
}

const perguntas: Pergunta[] = [
  {
    id: 1,
    texto: "Como você se sente ao acordar para trabalhar?",
    opcoes: [
      { texto: "Motivado e animado", valor: 1 },
      { texto: "Neutro", valor: 2 },
      { texto: "Desmotivado", valor: 3 },
      { texto: "Completamente desanimado", valor: 4 }
    ]
  },
  {
    id: 2,
    texto: "Você consegue identificar um propósito claro na sua carreira atual?",
    opcoes: [
      { texto: "Sim, tenho um propósito claro", valor: 1 },
      { texto: "Mais ou menos", valor: 2 },
      { texto: "Não tenho certeza", valor: 3 },
      { texto: "Não, não vejo propósito", valor: 4 }
    ]
  }
];

export default function Quiz() {
  const router = useRouter();
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleResposta = (valor: number) => {
    const novasRespostas = [...respostas, valor];
    setRespostas(novasRespostas);

    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      setMostrarResultado(true);
    }
  };

  const calcularResultado = () => {
    const media = respostas.reduce((a, b) => a + b, 0) / respostas.length;
    return media >= 3 ? "alto" : "baixo";
  };

  if (mostrarResultado) {
    const resultado = calcularResultado();
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="heading-2 mb-6">
            {resultado === "alto" 
              ? "Você precisa de uma mudança urgente!"
              : "Você está no caminho certo, mas pode melhorar!"}
          </h2>
          
          <p className="text-xl mb-8">
            {resultado === "alto"
              ? "Sua insatisfação profissional está afetando sua qualidade de vida. É hora de agir!"
              : "Você tem potencial para encontrar mais realização na sua carreira."}
          </p>

          <Button 
            size="lg"
            onClick={() => router.push('/mentoria')}
          >
            Conhecer a Mentoria Ikigai
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((perguntaAtual + 1) / perguntas.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Pergunta {perguntaAtual + 1} de {perguntas.length}
          </p>
        </div>

        <h2 className="heading-2 mb-8">
          {perguntas[perguntaAtual].texto}
        </h2>

        <div className="space-y-4">
          {perguntas[perguntaAtual].opcoes.map((opcao, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleResposta(opcao.valor)}
            >
              {opcao.texto}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
} 