export interface UserProgress {
  etapaAtual: number;
  respostas: {
    [key: string]: string | number | boolean;
  };
  ultimaAtualizacao: Date;
  pixConfirmado?: boolean;
}

export interface UserData {
  id: string;
  email: string;
  nome: string;
  foto?: string;
  progresso?: UserProgress;
} 