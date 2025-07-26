import { z } from 'zod';
import { 
  VALIDATION_MESSAGES, 
  NUMERIC_CONSTANTS,
  ERROR_MESSAGES 
} from './constants';

// ===== GÜNÜN YEMEĞİ DOĞRULAMA ŞEMASI =====
export const dailySpecialSchema = z.object({
  isim: z
    .string()
    .min(1, VALIDATION_MESSAGES.DAILY_SPECIAL.NAME_REQUIRED)
    .max(NUMERIC_CONSTANTS.LENGTH.NAME_MAX, VALIDATION_MESSAGES.DAILY_SPECIAL.NAME_MAX_LENGTH)
    .trim(),
  aciklama: z
    .string()
    .min(1, VALIDATION_MESSAGES.DAILY_SPECIAL.DESCRIPTION_REQUIRED)
    .max(NUMERIC_CONSTANTS.LENGTH.DESCRIPTION_MAX, VALIDATION_MESSAGES.DAILY_SPECIAL.DESCRIPTION_MAX_LENGTH)
    .trim(),
  fiyat: z
    .number()
    .min(NUMERIC_CONSTANTS.PRICE.MIN, VALIDATION_MESSAGES.DAILY_SPECIAL.PRICE_POSITIVE)
    .max(NUMERIC_CONSTANTS.PRICE.MAX, VALIDATION_MESSAGES.DAILY_SPECIAL.PRICE_MAX),
  ozelFiyat: z.boolean(),
  aktif: z.boolean()
});

export type DailySpecialFormData = z.infer<typeof dailySpecialSchema>;

// ===== KATEGORİ DOĞRULAMA ŞEMASI =====
export const categorySchema = z.object({
  isim: z
    .string()
    .min(1, VALIDATION_MESSAGES.CATEGORY.NAME_REQUIRED)
    .max(NUMERIC_CONSTANTS.LENGTH.NAME_MAX, VALIDATION_MESSAGES.CATEGORY.NAME_MAX_LENGTH)
    .trim(),
  aciklama: z
    .string()
    .min(1, VALIDATION_MESSAGES.CATEGORY.DESCRIPTION_REQUIRED)
    .max(NUMERIC_CONSTANTS.LENGTH.DESCRIPTION_MAX, VALIDATION_MESSAGES.CATEGORY.DESCRIPTION_MAX_LENGTH)
    .trim(),
  siralama: z
    .number()
    .min(NUMERIC_CONSTANTS.SORT_ORDER.MIN, VALIDATION_MESSAGES.CATEGORY.SORT_ORDER_MIN)
    .max(NUMERIC_CONSTANTS.SORT_ORDER.MAX, VALIDATION_MESSAGES.CATEGORY.SORT_ORDER_MAX),
  aktif: z.boolean()
});

export type CategoryFormData = z.infer<typeof categorySchema>;

// ===== ÜRÜN DOĞRULAMA ŞEMASI =====
export const productSchema = z.object({
  isim: z
    .string()
    .min(1, VALIDATION_MESSAGES.PRODUCT.NAME_REQUIRED)
    .max(NUMERIC_CONSTANTS.LENGTH.NAME_MAX, VALIDATION_MESSAGES.PRODUCT.NAME_MAX_LENGTH)
    .trim(),
  aciklama: z
    .string()
    .min(1, VALIDATION_MESSAGES.PRODUCT.DESCRIPTION_REQUIRED)
    .max(NUMERIC_CONSTANTS.LENGTH.DESCRIPTION_MAX, VALIDATION_MESSAGES.PRODUCT.DESCRIPTION_MAX_LENGTH)
    .trim(),
  fiyat: z
    .number()
    .min(NUMERIC_CONSTANTS.PRICE.MIN, VALIDATION_MESSAGES.PRODUCT.PRICE_MIN)
    .max(NUMERIC_CONSTANTS.PRICE.MAX, VALIDATION_MESSAGES.PRODUCT.PRICE_MAX),
  kategori: z
    .string()
    .min(1, VALIDATION_MESSAGES.PRODUCT.CATEGORY_REQUIRED),
  stok: z.boolean(),
  ozelFiyat: z.boolean(),
  siralama: z
    .number()
    .min(NUMERIC_CONSTANTS.SORT_ORDER.MIN, VALIDATION_MESSAGES.PRODUCT.SORT_ORDER_MIN)
    .max(NUMERIC_CONSTANTS.SORT_ORDER.MAX, VALIDATION_MESSAGES.PRODUCT.SORT_ORDER_MAX)
});

export type ProductFormData = z.infer<typeof productSchema>;

// ===== DOĞRULAMA YARDIMCI FONKSİYONLARI =====

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
}

export const validateForm = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> => {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err) => {
        const field = err.path.join('.');
        errors[field] = err.message;
      });
      return {
        success: false,
        errors
      };
    }
    return {
      success: false,
      errors: { general: ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR }
    };
  }
};

// ===== ÖZEL DOĞRULAMA FONKSİYONLARI =====

// Fiyat dönüşümü ve doğrulama yardımcı fonksiyonları
export const validatePrice = (price: string | number): string | null => {
  const numPrice = typeof price === 'string' ? Number(price) : price;
  
  if (isNaN(numPrice)) {
    return VALIDATION_MESSAGES.GENERAL.INVALID_PRICE;
  }
  
  if (numPrice <= 0) {
    return VALIDATION_MESSAGES.PRODUCT.PRICE_MIN;
  }
  
  if (numPrice > NUMERIC_CONSTANTS.PRICE.MAX) {
    return VALIDATION_MESSAGES.PRODUCT.PRICE_MAX;
  }
  
  return null;
};

// String fiyatı güvenli şekilde number'a çevir
export const parsePrice = (price: string): number => {
  const numPrice = Number(price);
  if (isNaN(numPrice) || numPrice <= 0) {
    throw new Error(VALIDATION_MESSAGES.GENERAL.INVALID_PRICE);
  }
  return numPrice;
};

// Number fiyatı string'e çevir (görüntüleme için)
export const formatPrice = (price: number): string => {
  return price.toString();
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return VALIDATION_MESSAGES.GENERAL.FIELD_REQUIRED(fieldName);
  }
  return null;
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): string | null => {
  if (value.length > maxLength) {
    return VALIDATION_MESSAGES.GENERAL.MAX_LENGTH(fieldName, maxLength);
  }
  return null;
}; 