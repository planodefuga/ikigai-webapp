export interface UserProgress {
  pixConfirmado: boolean;
  aulasConcluidas: string[];
  exerciciosRespondidos: {
    [key: string]: boolean;
  };
}

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  progresso: UserProgress;
} 