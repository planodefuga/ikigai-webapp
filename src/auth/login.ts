import { auth } from '../lib/firebase-client';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut 
} from 'firebase/auth';

export const loginWithGoogle = async () => {
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

    return await response.json();
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