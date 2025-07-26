import { initializeApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Environment variables eksikse Firebase'i başlatma
let app;
let db: Firestore | undefined;

try {
  // Tüm gerekli environment variables mevcut mu kontrol et
  if (firebaseConfig.apiKey && 
      firebaseConfig.authDomain && 
      firebaseConfig.projectId && 
      firebaseConfig.storageBucket && 
      firebaseConfig.messagingSenderId && 
      firebaseConfig.appId) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    console.warn('Firebase environment variables eksik. Firebase devre dışı.');
  }
} catch (error) {
  console.error('Firebase başlatma hatası:', error);
}

export { db }; 