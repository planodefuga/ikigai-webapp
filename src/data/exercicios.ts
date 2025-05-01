export interface Exercicio {
  id: string;
  titulo: string;
  descricao: string;
}

export const exercicios: Exercicio[] = [
  {
    id: 'ex1',
    titulo: 'Reflexão sobre Propósito',
    descricao: 'Reflita sobre o que te motiva e escreva suas conclusões'
  },
  {
    id: 'ex2',
    titulo: 'Análise de Habilidades',
    descricao: 'Liste suas principais habilidades e como elas podem ser aplicadas'
  },
  {
    id: 'ex3',
    titulo: 'Planejamento de Carreira',
    descricao: 'Crie um plano de ação para seus próximos passos profissionais'
  }
]; 