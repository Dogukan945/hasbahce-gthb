import { db } from './firebase';
import type { DailySpecial } from './types';
import { FIREBASE_CONSTANTS } from './constants';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from 'firebase/firestore';

export async function getDailySpecial(): Promise<DailySpecial | null> {
  const ref = doc(db, FIREBASE_CONSTANTS.COLLECTIONS.DAILY_SPECIAL, FIREBASE_CONSTANTS.DOCUMENTS.CURRENT);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as DailySpecial;
  return null;
}

export async function setDailySpecial(data: DailySpecial): Promise<void> {
  const ref = doc(db, FIREBASE_CONSTANTS.COLLECTIONS.DAILY_SPECIAL, FIREBASE_CONSTANTS.DOCUMENTS.CURRENT);
  await setDoc(ref, data);
}

export function subscribeToDailySpecial(callback: (data: DailySpecial | null) => void) {
  const ref = doc(db, FIREBASE_CONSTANTS.COLLECTIONS.DAILY_SPECIAL, FIREBASE_CONSTANTS.DOCUMENTS.CURRENT);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) callback(snap.data() as DailySpecial);
    else callback(null);
  });
} 