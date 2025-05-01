export interface UserProgress {
  pixConfirmado: boolean;
  etapaAtual: number;
  respostas: {
    [key: string]: string | number | boolean;
  };
  aulasConcluidas: {
    [key: string]: boolean;
  };
  ultimaAtualizacao: Date;
}

export interface UserData {
  id: string;
  email: string;
  nome: string;
  foto?: string;
  progresso: UserProgress;
} 