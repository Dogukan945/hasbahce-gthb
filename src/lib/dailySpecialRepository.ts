import { getDb } from './firebase';
import type { DailySpecial } from './types';
import { FIREBASE_CONSTANTS } from './constants';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from 'firebase/firestore';

export async function getDailySpecial(): Promise<DailySpecial | null> {
  const db = await getDb();
  if (!db) {
    console.warn('Firebase bağlantısı yok. Günlük yemek verisi alınamıyor.');
    return null;
  }
  
  try {
    const ref = doc(db, FIREBASE_CONSTANTS.COLLECTIONS.DAILY_SPECIAL, FIREBASE_CONSTANTS.DOCUMENTS.CURRENT);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data() as DailySpecial;
    return null;
  } catch (error) {
    console.error('Günlük yemek verisi alınırken hata:', error);
    return null;
  }
}

export async function setDailySpecial(data: DailySpecial): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn('Firebase bağlantısı yok. Günlük yemek verisi kaydedilemiyor.');
    return;
  }
  
  try {
    const ref = doc(db, FIREBASE_CONSTANTS.COLLECTIONS.DAILY_SPECIAL, FIREBASE_CONSTANTS.DOCUMENTS.CURRENT);
    await setDoc(ref, data);
  } catch (error) {
    console.error('Günlük yemek verisi kaydedilirken hata:', error);
    throw error;
  }
}

export async function subscribeToDailySpecial(callback: (data: DailySpecial | null) => void) {
  const db = await getDb();
  if (!db) {
    console.warn('Firebase bağlantısı yok. Günlük yemek aboneliği yapılamıyor.');
    // Firebase yoksa hemen null döndür
    callback(null);
    return () => {}; // Boş unsubscribe function
  }
  
  try {
    const ref = doc(db, FIREBASE_CONSTANTS.COLLECTIONS.DAILY_SPECIAL, FIREBASE_CONSTANTS.DOCUMENTS.CURRENT);
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) callback(snap.data() as DailySpecial);
      else callback(null);
    }, (error) => {
      console.error('Günlük yemek aboneliği hatası:', error);
      callback(null);
    });
  } catch (error) {
    console.error('Günlük yemek aboneliği başlatılırken hata:', error);
    callback(null);
    return () => {}; // Boş unsubscribe function
  }
} 