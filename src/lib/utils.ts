// ===== GENEL UTILITY FONKSİYONLARI =====

import { ERROR_MESSAGES } from './constants';

// ===== ERROR HANDLING UTILITIES =====

/**
 * Güvenli async fonksiyon wrapper'ı
 * Hata durumunda standart error mesajı döner
 */
export const safeAsync = async <T>(
  asyncFn: () => Promise<T>,
  errorMessage?: string
): Promise<{ success: boolean; data?: T; error?: string }> => {
  try {
    const data = await asyncFn();
    return { success: true, data };
  } catch (error) {
    console.error('Async operation failed:', error);
    return { 
      success: false, 
      error: errorMessage || ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR 
    };
  }
};

/**
 * Network error kontrolü
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.includes('network') || 
           error.message.includes('fetch') || 
           error.message.includes('connection');
  }
  return false;
};

/**
 * Error mesajını kullanıcı dostu hale getir
 */
export const getUserFriendlyError = (error: unknown): string => {
  if (isNetworkError(error)) {
    return ERROR_MESSAGES.GENERAL.NETWORK_ERROR;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR;
};

// ===== STRING UTILITIES =====

/**
 * String'i güvenli şekilde trim et
 */
export const safeTrim = (str: string | null | undefined): string => {
  return str?.trim() || '';
};

/**
 * String'i belirli uzunlukta kısalt ve ... ekle
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

/**
 * String'i capitalize et
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// ===== NUMBER UTILITIES =====

/**
 * Güvenli number dönüşümü
 */
export const safeNumber = (value: string | number | null | undefined): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

/**
 * Fiyat formatla
 */
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString('tr-TR')} ₺`;
};

/**
 * Fiyatları ekranda tutarlı göstermek için normalize eder.
 * Kabul edilen formatlar: "350 TL", "350₺", "+10 TL", "350".
 * Dönüş: "350 ₺", "+10 ₺" gibi.
 */
export const normalizePriceForDisplay = (rawPrice: string): string => {
  if (!rawPrice) return '';

  const trimmed = rawPrice.replace(/\s+/g, ' ').trim();

  // +10 TL gibi eklemeler için işaret koru
  const signMatch = trimmed.match(/^([+\-])\s*(.*)$/);
  const sign = signMatch ? signMatch[1] + '' : '';
  const numericPart = (signMatch ? signMatch[2] : trimmed)
    .replace(/TL|₺/gi, '')
    .replace(',', '.')
    .trim();

  const num = Number(numericPart);
  if (Number.isFinite(num)) {
    const formatted = `${Math.round(num).toLocaleString('tr-TR')} ₺`;
    return `${sign}${formatted}`.trim();
  }

  // Sayısal değilse orijinali döndür
  return trimmed;
};

/**
 * Sayıyı belirli aralıkta sınırla
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// ===== ARRAY UTILITIES =====

/**
 * Array'i güvenli şekilde filtrele
 */
export const safeFilter = <T>(
  array: T[] | null | undefined, 
  predicate: (item: T) => boolean
): T[] => {
  return array?.filter(predicate) || [];
};

/**
 * Array'i güvenli şekilde map et
 */
export const safeMap = <T, U>(
  array: T[] | null | undefined, 
  mapper: (item: T) => U
): U[] => {
  return array?.map(mapper) || [];
};

// ===== OBJECT UTILITIES =====

/**
 * Object'i güvenli şekilde merge et
 */
export const safeMerge = <T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T => {
  return { ...target, ...source };
};

/**
 * Object'ten null/undefined değerleri temizle
 */
export const cleanObject = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  const cleaned: Partial<T> = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] != null) {
      cleaned[key as keyof T] = obj[key] as T[keyof T];
    }
  });
  return cleaned;
};

// ===== VALIDATION UTILITIES =====

/**
 * Email formatı kontrolü
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Telefon numarası formatı kontrolü
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * URL formatı kontrolü
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ===== DATE UTILITIES =====

/**
 * Tarihi Türkçe formatında formatla
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Tarihi kısa formatında formatla
 */
export const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString('tr-TR');
};

/**
 * Zamanı formatla
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// ===== PERFORMANCE UTILITIES =====

/**
 * Debounce fonksiyonu
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle fonksiyonu
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}; 