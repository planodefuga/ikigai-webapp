import { NextApiRequest, NextApiResponse } from 'next';
import { adminAuth } from '../../lib/firebase-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { idToken } = req.body;
    
    // Verifica o token com o Firebase Admin
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
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