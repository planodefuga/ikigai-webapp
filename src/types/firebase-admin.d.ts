import { Auth } from 'firebase-admin/auth';
import { Firestore } from 'firebase-admin/firestore';

declare module '../../lib/firebase-admin' {
  export const adminAuth: Auth;
  export const adminDb: Firestore;
} 