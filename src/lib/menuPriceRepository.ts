import { db } from './firebase';
import type { MenuPrices } from './types';
import { FIREBASE_CONSTANTS } from './constants';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from 'firebase/firestore';

export async function getMenuPrices(): Promise<MenuPrices | null> {
  if (!db) {
    console.warn('Firebase bağlantısı yok. Menü fiyatları alınamıyor.');
    return null;
  }
  
  try {
    const ref = doc(db, FIREBASE_CONSTANTS.COLLECTIONS.MENU_PRICES, FIREBASE_CONSTANTS.DOCUMENTS.PRICES);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data() as MenuPrices;
    return null;
  } catch (error) {
    console.error('Menü fiyatları alınırken hata:', error);
    return null;
  }
}

export async function setMenuPrices(prices: MenuPrices): Promise<void> {
  if (!db) {
    console.warn('Firebase bağlantısı yok. Menü fiyatları kaydedilemiyor.');
    return;
  }
  
  try {
    const ref = doc(db, FIREBASE_CONSTANTS.COLLECTIONS.MENU_PRICES, FIREBASE_CONSTANTS.DOCUMENTS.PRICES);
    await setDoc(ref, prices);
  } catch (error) {
    console.error('Menü fiyatları kaydedilirken hata:', error);
    throw error;
  }
}

export function subscribeToMenuPrices(callback: (data: MenuPrices | null) => void) {
  if (!db) {
    console.warn('Firebase bağlantısı yok. Menü fiyatları aboneliği yapılamıyor.');
    callback(null);
    return () => {}; // Boş unsubscribe function
  }
  
  try {
    const ref = doc(db, FIREBASE_CONSTANTS.COLLECTIONS.MENU_PRICES, FIREBASE_CONSTANTS.DOCUMENTS.PRICES);
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) callback(snap.data() as MenuPrices);
      else callback(null);
    }, (error) => {
      console.error('Menü fiyatları aboneliği hatası:', error);
      callback(null);
    });
  } catch (error) {
    console.error('Menü fiyatları aboneliği başlatılırken hata:', error);
    callback(null);
    return () => {}; // Boş unsubscribe function
  }
} 