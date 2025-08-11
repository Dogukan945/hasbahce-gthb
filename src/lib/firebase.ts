import { hasFirebaseConfig } from './env';
import type { Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let dbPromise: Promise<Firestore | undefined> | null = null;

export async function getDb(): Promise<Firestore | undefined> {
  if (!hasFirebaseConfig()) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Firebase environment variables eksik. Firebase devre dışı.');
    }
    return undefined;
  }
  if (!dbPromise) {
    dbPromise = (async () => {
      try {
        const { initializeApp } = await import('firebase/app');
        const { getFirestore } = await import('firebase/firestore');
        const app = initializeApp(firebaseConfig);
        return getFirestore(app);
      } catch (error) {
        console.error('Firebase dinamik yükleme hatası:', error);
        return undefined;
      }
    })();
  }
  return dbPromise;
}