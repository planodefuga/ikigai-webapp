export interface Modulo {
  id: number;
  titulo: string;
  descricao: string;
  duracao: string;
  materiais: {
    titulo: string;
    tipo: 'pdf' | 'video' | 'exercicio';
    link: string;
  }[];
}

export const cronograma: Modulo[] = [
  {
    id: 1,
    titulo: 'Introdução ao Ikigai',
    descricao: 'Entendendo o conceito e sua importância na vida profissional',
    duracao: '2 semanas',
    materiais: [
      {
        titulo: 'E-book: Fundamentos do Ikigai',
        tipo: 'pdf',
        link: '/assets/ebook-ikigai.pdf'
      },
      {
        titulo: 'Vídeo: O que é Ikigai?',
        tipo: 'video',
        link: 'https://exemplo.com/video-ikigai'
      }
    ]
  },
  {
    id: 2,
    titulo: 'Autoconhecimento Profissional',
    descricao: 'Mapeando suas habilidades e paixões',
    duracao: '3 semanas',
    materiais: [
      {
        titulo: 'Exercício: Mapa de Habilidades',
        tipo: 'exercicio',
        link: '/exercicios/mapa-habilidades'
      }
    ]
  }
]; 