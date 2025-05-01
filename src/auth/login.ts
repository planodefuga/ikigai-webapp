import { auth } from '../lib/firebase-client';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { UserData } from '../types/user';

export const loginWithGoogle = async (): Promise<UserData> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Obtém o token do usuário
    const idToken = await result.user.getIdToken();
    
    // Verifica o token na API
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }

    // Busca os dados completos do usuário
    const userResponse = await fetch('/api/user/progress', {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });

    if (!userResponse.ok) {
      throw new Error('Falha ao buscar dados do usuário');
    }

    return await userResponse.json();
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Erro no logout:', error);
    throw error;
  }
}; 