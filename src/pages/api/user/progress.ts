import { NextApiRequest, NextApiResponse } from 'next';

const { adminAuth, adminDb } = require('../../lib/firebase-admin');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verifica o token de autenticação
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    if (req.method === 'GET') {
      // Busca o progresso do usuário
      const userDoc = await adminDb.collection('users').doc(userId).get();
      
      if (!userDoc.exists) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(userDoc.data());
    }

    if (req.method === 'POST') {
      const { progresso } = req.body;

      // Atualiza o progresso do usuário
      await adminDb.collection('users').doc(userId).set({
        progresso
      }, { merge: true });

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Erro ao gerenciar progresso:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
} 