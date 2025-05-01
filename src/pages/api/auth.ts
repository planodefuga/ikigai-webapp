import { NextApiRequest, NextApiResponse } from 'next';
import { adminAuth, adminDb } from '../../lib/firebase-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { idToken } = req.body;
    
    // Verifica o token com o Firebase Admin
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Busca ou cria o documento do usuário no Firestore
    const userRef = adminDb.collection('users').doc(decodedToken.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // Cria o documento do usuário com dados iniciais
      await userRef.set({
        id: decodedToken.uid,
        email: decodedToken.email,
        nome: decodedToken.name || decodedToken.email?.split('@')[0] || 'Usuário',
        foto: decodedToken.picture,
        progresso: {
          etapaAtual: 1,
          respostas: {},
          ultimaAtualizacao: new Date()
        }
      });
    }

    // Retorna os dados do usuário
    return res.status(200).json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture
    });
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
} 