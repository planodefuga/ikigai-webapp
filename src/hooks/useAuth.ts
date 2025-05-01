import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserData, UserProgress } from '../types/user';

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Buscar dados do usuário no Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        
        if (userDoc.exists()) {
          setUser(userDoc.data() as UserData);
        } else {
          // Criar novo usuário com progresso inicial
          const newUser: UserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || undefined,
            progresso: {
              pixConfirmado: false,
              aulasConcluidas: [],
              exerciciosRespondidos: {}
            }
          };
          
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const confirmarPagamento = async () => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      ...user,
      progresso: {
        ...user.progresso,
        pixConfirmado: true
      }
    }, { merge: true });

    setUser({
      ...user,
      progresso: {
        ...user.progresso,
        pixConfirmado: true
      }
    });
  };

  const marcarAulaConcluida = async (aulaId: string) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const novasAulasConcluidas = [...user.progresso.aulasConcluidas, aulaId];
    
    await setDoc(userRef, {
      ...user,
      progresso: {
        ...user.progresso,
        aulasConcluidas: novasAulasConcluidas
      }
    }, { merge: true });

    setUser({
      ...user,
      progresso: {
        ...user.progresso,
        aulasConcluidas: novasAulasConcluidas
      }
    });
  };

  const marcarExercicioRespondido = async (semana: string) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const novosExercicios = {
      ...user.progresso.exerciciosRespondidos,
      [semana]: true
    };
    
    await setDoc(userRef, {
      ...user,
      progresso: {
        ...user.progresso,
        exerciciosRespondidos: novosExercicios
      }
    }, { merge: true });

    setUser({
      ...user,
      progresso: {
        ...user.progresso,
        exerciciosRespondidos: novosExercicios
      }
    });
  };

  return {
    user,
    loading,
    confirmarPagamento,
    marcarAulaConcluida,
    marcarExercicioRespondido
  };
} 