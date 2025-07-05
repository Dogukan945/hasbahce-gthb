import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  Query,
  FirestoreError,
  Firestore,
  DocumentData
} from 'firebase/firestore';

// ===== BASE ENTITY INTERFACE =====
export interface BaseEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ===== FIRESTORE REPOSITORY CLASS =====
export class FirestoreRepository<T> {
  public collection;

  constructor(db: Firestore, collectionName: string) {
    this.collection = collection(db, collectionName);
  }

  // Tüm dokümanları getir
  async findAll(): Promise<T[]> {
    try {
      const querySnapshot = await getDocs(this.collection);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    } catch (error) {
      console.error('Veri getirme hatası:', error);
      return [];
    }
  }

  // Query ile dokümanları getir
  async find(query: Query<DocumentData>): Promise<T[]> {
    try {
      const querySnapshot = await getDocs(query);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    } catch (error) {
      console.error('Query ile veri getirme hatası:', error);
      return [];
    }
  }

  // ID ile tek doküman getir
  async findById(id: string): Promise<T | null> {
    try {
      const docRef = doc(this.collection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as T;
      }
      return null;
    } catch (error) {
      console.error('ID ile veri getirme hatası:', error);
      return null;
    }
  }

  // Yeni doküman ekle
  async create(data: Omit<T, 'id'>): Promise<string | null> {
    try {
      const docRef = await addDoc(this.collection, data);
      return docRef.id;
    } catch (error) {
      console.error('Veri ekleme hatası:', error);
      return null;
    }
  }

  // Doküman güncelle
  async update(id: string, data: Partial<T>): Promise<boolean> {
    try {
      const docRef = doc(this.collection, id);
      await updateDoc(docRef, data);
      return true;
    } catch (error) {
      console.error('Veri güncelleme hatası:', error);
      return false;
    }
  }

  // Doküman sil
  async delete(id: string): Promise<boolean> {
    try {
      const docRef = doc(this.collection, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Veri silme hatası:', error);
      return false;
    }
  }

  // Gerçek zamanlı dinleme
  subscribe(query: Query<DocumentData>, callback: (data: T[]) => void) {
    return onSnapshot(query, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
      callback(data);
    }, (error: FirestoreError) => {
      console.error('Gerçek zamanlı dinleme hatası:', error);
      callback([]);
    });
  }
} 