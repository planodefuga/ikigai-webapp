import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD25Ye4METaK2PIbtyrdackieLz_uyFOUM",
  authDomain: "ikigai-webapp.firebaseapp.com",
  projectId: "ikigai-webapp",
  storageBucket: "ikigai-webapp.firebasestorage.app",
  messagingSenderId: "949794266401",
  appId: "1:949794266401:web:9370fb0f55904a554bb260",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Inicializa o Firebase Client
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Inicializa o Firebase Admin
const adminApp = getApps().length === 0 
  ? initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
  : getApps()[0];

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp); 