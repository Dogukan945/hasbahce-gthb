import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { FirestoreRepository } from './firestoreRepository';

// ===== TİP DÖNÜŞTÜRME YARDIMCI FONKSİYONU =====
// Firebase Timestamp'i veya Date'i güvenli şekilde JavaScript Date'e dönüştürür
// Açıklama: Firestore'dan gelen createdAt/updatedAt alanı Timestamp, Date veya undefined olabilir.
// Bu fonksiyon TypeScript uyumlu ve güvenli dönüşüm sağlar.
// Not: Timestamp tipi import edilmediği için, runtime'da toDate fonksiyonu kontrolü yapılır.
const convertTimestampToDate = (timestamp: unknown): Date => {
  if (
    timestamp &&
    typeof timestamp === 'object' &&
    typeof (timestamp as { toDate?: () => Date }).toDate === 'function'
  ) {
    // Firestore Timestamp ise
    return (timestamp as { toDate: () => Date }).toDate();
  }
  if (timestamp instanceof Date) {
    // Zaten Date ise
    return timestamp;
  }
  // Yoksa veya geçersizse şu anki tarihi döndür
  return new Date();
};

// ===== VERİ TİPLERİ =====

export interface DailySpecial {
  id?: string;
  isim: string;
  aciklama: string;
  fiyat: number;
  ozelFiyat: boolean;
  aktif: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MenuItem {
  id?: string;
  isim: string;
  aciklama: string;
  fiyat: number;
  kategori: string;
  stok: boolean;
  ozelFiyat: boolean;
  siralama: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MenuCategory {
  id?: string;
  isim: string;
  aciklama: string;
  siralama: number;
  aktif: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// ===== REPOSITORY INSTANCES =====
const menuCategoryRepository = new FirestoreRepository<MenuCategory>(db, 'menuCategories');
const menuItemRepository = new FirestoreRepository<MenuItem>(db, 'menuItems');

// ===== GÜNÜN YEMEĞİ İŞLEMLERİ =====

export const getDailySpecial = async (): Promise<DailySpecial | null> => {
  try {
    const docRef = doc(db, 'dailySpecial', 'current');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        fiyat: Number(data.fiyat) || 0, // Veritabanından string gelse bile number'a çevir
        createdAt: convertTimestampToDate(data.createdAt),
        updatedAt: convertTimestampToDate(data.updatedAt)
      } as DailySpecial;
    }
    return null;
  } catch (error) {
    console.error('Günün yemeği getirme hatası:', error);
    return null;
  }
};

export const setDailySpecial = async (data: Omit<DailySpecial, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean> => {
  try {
    const now = new Date();
    const dailySpecialData: Omit<DailySpecial, 'id'> = {
      ...data,
      createdAt: now,
      updatedAt: now
    };
    
    await setDoc(doc(db, 'dailySpecial', 'current'), dailySpecialData);
    return true;
  } catch (error) {
    console.error('Günün yemeği kaydetme hatası:', error);
    return false;
  }
};

// ===== MENÜ KATEGORİLERİ İŞLEMLERİ =====

export const getMenuCategories = async (): Promise<MenuCategory[]> => {
  const q = query(menuCategoryRepository.collection, where('aktif', '==', true), orderBy('siralama', 'asc'));
  return menuCategoryRepository.find(q).catch(() => []);
};

export const addMenuCategory = async (data: Omit<MenuCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
  try {
    const now = new Date();
    const docRef = await addDoc(menuCategoryRepository.collection, { ...data, createdAt: now, updatedAt: now });
    return docRef.id;
  } catch (error) {
    console.error('Kategori ekleme hatası:', error);
    return null;
  }
};

export const updateMenuCategory = async (id: string, data: Partial<MenuCategory>): Promise<boolean> => {
  try {
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    await updateDoc(doc(menuCategoryRepository.collection, id), updateData);
    return true;
  } catch (error) {
    console.error('Kategori güncelleme hatası:', error);
    return false;
  }
};

export const deleteMenuCategory = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(menuCategoryRepository.collection, id));
    return true;
  } catch (error) {
    console.error('Kategori silme hatası:', error);
    return false;
  }
};

// ===== MENÜ ÜRÜNLERİ İŞLEMLERİ =====

export const getMenuItems = async (categoryId?: string): Promise<MenuItem[]> => {
  const queryConstraints = [
    where('stok', '==', true),
    orderBy('siralama', 'asc')
  ];

  if (categoryId) {
    queryConstraints.push(where('kategori', '==', categoryId));
  }

  const q = query(menuItemRepository.collection, ...queryConstraints);
  return menuItemRepository.find(q).catch(() => []);
};

export const addMenuItem = async (data: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
  try {
    const now = new Date();
    const itemData: Omit<MenuItem, 'id'> = {
      ...data,
      createdAt: now,
      updatedAt: now
    };
    
    const docRef = await addDoc(menuItemRepository.collection, itemData);
    return docRef.id;
  } catch (error) {
    console.error('Ürün ekleme hatası:', error);
    return null;
  }
};

export const updateMenuItem = async (id: string, data: Partial<MenuItem>): Promise<boolean> => {
  try {
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    await updateDoc(doc(menuItemRepository.collection, id), updateData);
    return true;
  } catch (error) {
    console.error('Ürün güncelleme hatası:', error);
    return false;
  }
};

export const deleteMenuItem = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(menuItemRepository.collection, id));
    return true;
  } catch (error) {
    console.error('Ürün silme hatası:', error);
    return false;
  }
};

// ===== GERÇEK ZAMANLI DİNLEME =====

export const subscribeToDailySpecial = (callback: (data: DailySpecial | null) => void) => {
  const docRef = doc(db, 'dailySpecial', 'current');
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback({
        id: doc.id,
        ...data,
        fiyat: Number(data.fiyat) || 0,
        createdAt: convertTimestampToDate(data.createdAt),
        updatedAt: convertTimestampToDate(data.updatedAt)
      } as DailySpecial);
    } else {
      callback(null);
    }
  });
};

export const subscribeToMenuItems = (categoryId: string, callback: (items: MenuItem[]) => void) => {
  const q = query(menuItemRepository.collection, where('kategori', '==', categoryId), where('stok', '==', true), orderBy('siralama', 'asc'));
  return menuItemRepository.subscribe(q, callback);
};

// ===== VARSILAN VERİLER =====

export const initializeDefaultData = async () => {
  try {
    // Varsayılan günün yemeği
    const defaultDailySpecial: Omit<DailySpecial, 'id' | 'createdAt' | 'updatedAt'> = {
      isim: "Kuzu Pirzola",
      aciklama: "Taze kuzu etinden özel baharatlarla hazırlanan ızgara pirzola",
      fiyat: 450,
      ozelFiyat: true,
      aktif: true
    };
    
    await setDailySpecial(defaultDailySpecial);
    
    // Varsayılan kategoriler
    const defaultCategories = [
      { isim: "KAHVALTI ÇEŞİTLERİ", aciklama: "Günün en önemli öğünü için özel hazırlanan kahvaltı çeşitlerimiz", siralama: 1, aktif: true },
      { isim: "ÇORBALAR", aciklama: "Sıcak ve lezzetli çorbalarımız", siralama: 2, aktif: true },
      { isim: "ANA YEMEKLER", aciklama: "Özel baharatlarla hazırlanan ızgara ve kebap çeşitleri", siralama: 3, aktif: true },
      { isim: "   PİDELER", aciklama: "Geleneksel Türk mutfağının vazgeçilmezi", siralama: 4, aktif: true },
      { isim: "TATLILAR", aciklama: "Lezzetli tatlı çeşitlerimiz", siralama: 5, aktif: true },
      { isim: "İÇECEKLER", aciklama: "Sıcak ve soğuk içecek çeşitlerimiz", siralama: 6, aktif: true }
    ];
    
    for (const category of defaultCategories) {
      await addMenuCategory(category);
    }
    
    console.log('Varsayılan veriler başarıyla oluşturuldu!');
  } catch (error) {
    console.error('Varsayılan veri oluşturma hatası:', error);
  }
};