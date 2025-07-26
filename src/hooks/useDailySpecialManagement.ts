import { useState, useEffect, useReducer, useCallback } from 'react';
import { 
  DEFAULT_DAILY_SPECIAL, 
  TOAST_TYPES, 
  SUCCESS_MESSAGES, 
  ERROR_MESSAGES
} from '@/lib/constants';
import { dailySpecialSchema, validateForm } from '@/lib/validation';
import { setDailySpecial, getDailySpecial } from '@/lib/dailySpecialRepository';
import type { EditingDailySpecial, ValidationErrors } from '@/lib/types';

// Reducer action tipleri
type EditingDailySpecialAction =
  | { type: 'field'; field: keyof EditingDailySpecial; value: string | boolean }
  | { type: 'reset'; payload: EditingDailySpecial }
  | { type: 'load'; payload: EditingDailySpecial };

function editingDailySpecialReducer(state: EditingDailySpecial, action: EditingDailySpecialAction): EditingDailySpecial {
  switch (action.type) {
    case 'field':
      return { ...state, [action.field]: action.value };
    case 'reset':
      return { ...action.payload };
    case 'load':
      return { ...action.payload };
    default:
      return state;
  }
}

// useDailySpecialForm fonksiyonu sadece local state ile çalışacak şekilde bırakılacak
export const useDailySpecialForm = (isAuthenticated: boolean, addToast: (type: 'success' | 'error' | 'info', message: string) => void) => {
  // Local state'ler
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isDailySpecialUpdating, setIsDailySpecialUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useReducer ile form state yönetimi
  const [editingDailySpecial, dispatchEditingDailySpecial] = useReducer(
    editingDailySpecialReducer,
    DEFAULT_DAILY_SPECIAL
  );

  // Firebase'den günün yemeği verilerini yükle
  useEffect(() => {
    const loadDailySpecial = async () => {
      if (isAuthenticated) {
        setIsLoading(true);
        try {
          const dailySpecial = await getDailySpecial();
          if (dailySpecial) {
            // Firebase'den gelen veriyi form formatına çevir
            dispatchEditingDailySpecial({
              type: 'load',
              payload: {
                isim: dailySpecial.isim,
                aciklama: dailySpecial.aciklama,
                fiyat: dailySpecial.fiyat.toString(),
                ozelFiyat: dailySpecial.ozelFiyat,
                aktif: dailySpecial.aktif
              }
            });
          } else {
            // Firebase'de veri yoksa varsayılan değerleri kullan
            dispatchEditingDailySpecial({
              type: 'load',
              payload: DEFAULT_DAILY_SPECIAL
            });
          }
        } catch (error) {
          console.error('Günün yemeği yüklenirken hata:', error);
          // Hata durumunda varsayılan değerleri kullan
          dispatchEditingDailySpecial({
            type: 'load',
            payload: DEFAULT_DAILY_SPECIAL
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadDailySpecial();
  }, [isAuthenticated]);

  // Değişiklik kontrolü
  useEffect(() => {
    if (!isLoading) {
      setHasUnsavedChanges(true); // Her değişiklikte true
    }
  }, [editingDailySpecial, isLoading]);

  // Form doğrulama
  const validateFormData = useCallback((data: EditingDailySpecial): boolean => {
    // Form verilerini doğrulama için number tipine çevir
    const dataForValidation = {
      ...data,
      fiyat: Number(data.fiyat)
    };
    
    const result = validateForm(dailySpecialSchema, dataForValidation);
    
    if (result.success) {
      setValidationErrors({});
      return true;
    } else {
      setValidationErrors(result.errors || {});
      return false;
    }
  }, []);

  // Firestore'a kaydet
  const handleSaveDailySpecial = useCallback(async () => {
    if (!validateFormData(editingDailySpecial)) {
      addToast(TOAST_TYPES.ERROR, ERROR_MESSAGES.FORM.FIX_ERRORS);
      return;
    }
    setIsDailySpecialUpdating(true);
    try {
      await setDailySpecial({
        isim: editingDailySpecial.isim,
        aciklama: editingDailySpecial.aciklama,
        fiyat: Number(editingDailySpecial.fiyat),
        ozelFiyat: editingDailySpecial.ozelFiyat,
        aktif: editingDailySpecial.aktif
      });
      setHasUnsavedChanges(false);
      setValidationErrors({});
      addToast(TOAST_TYPES.SUCCESS, SUCCESS_MESSAGES.DAILY_SPECIAL_SAVED);
    } catch {
      addToast(TOAST_TYPES.ERROR, ERROR_MESSAGES.FORM.SAVE_ERROR);
    } finally {
      setIsDailySpecialUpdating(false);
    }
  }, [editingDailySpecial, addToast, validateFormData]);

  // Günün yemeği sıfırlama fonksiyonu
  const handleResetDailySpecial = useCallback(() => {
    dispatchEditingDailySpecial({ type: 'reset', payload: DEFAULT_DAILY_SPECIAL });
    setValidationErrors({});
    addToast(TOAST_TYPES.INFO, SUCCESS_MESSAGES.RESET);
  }, [addToast]);

  // Form alan değişikliği handler'ı
  const handleFieldChange = useCallback((field: keyof EditingDailySpecial, value: string | boolean) => {
    dispatchEditingDailySpecial({ type: 'field', field, value });
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [validationErrors]);

  return {
    editingDailySpecial,
    isPreviewMode,
    setIsPreviewMode,
    hasUnsavedChanges,
    isDailySpecialUpdating,
    isLoading,
    validationErrors,
    handleSaveDailySpecial,
    handleResetDailySpecial,
    handleFieldChange,
  };
} 