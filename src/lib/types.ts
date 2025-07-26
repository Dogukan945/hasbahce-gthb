// Merkezi tip yönetimi dosyası

// Menü ürün tipi
export interface MenuItem {
  name: string;
  price: string;
}

// Menü kategori tipi
export interface MenuCategory {
  name: string;
  description: string;
  items: MenuItem[];
}

// Menü arama sonucu tipi
export interface SearchResult {
  categoryKey: string;
  categoryName: string;
  categoryDescription: string;
  items: MenuItem[];
}

// Günün yemeği tipi (veritabanı için - fiyat number)
export interface DailySpecial {
  isim: string;
  aciklama: string;
  fiyat: number;
  ozelFiyat: boolean;
  aktif: boolean;
}

// Günün yemeği düzenleme tipi (form için - fiyat string)
export interface EditingDailySpecial {
  isim: string;
  aciklama: string;
  fiyat: string;
  ozelFiyat: boolean;
  aktif: boolean;
}

// Menü fiyatları yönetimi için tipler
export interface MenuPriceItem {
  name: string;
  price: string;
  originalPrice: string; // Orijinal fiyatı saklamak için
}

export interface MenuPriceCategory {
  name: string;
  description: string;
  items: MenuPriceItem[];
}

export interface MenuPrices {
  [categoryKey: string]: MenuPriceCategory;
}

// Form validation error tipi
export interface ValidationErrors {
  [key: string]: string;
}

// Toast notification tipi
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

// Admin authentication state tipi
export interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginAttempts: number;
  isLocked: boolean;
  lockUntil: number | null;
}

// Tab ve Toast tipleri (constants.ts'den alınanlar)
import { TAB_NAMES, TOAST_TYPES } from './constants';
export type TabType = typeof TAB_NAMES[keyof typeof TAB_NAMES];
export type ToastType = typeof TOAST_TYPES[keyof typeof TOAST_TYPES]; 