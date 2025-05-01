import { initializeApp } from 'firebase/app';
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