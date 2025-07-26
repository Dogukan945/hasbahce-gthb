import { useState, useCallback } from 'react';
import { ADMIN_CONSTANTS } from '@/lib/constants';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, ADMIN_CONSTANTS.TOAST_DURATION);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
  };
}; 