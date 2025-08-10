import { useState, useCallback } from 'react';
import { ADMIN_CONSTANTS } from '@/lib/constants';

interface UseAdminAuthReturn {
  isAuthenticated: boolean;
  error: string;
  isLoading: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

export const useAdminAuth = (): UseAdminAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (password: string) => {
    setError("");
    setIsLoading(true);
    try {
      // Basit, client-side kontrol (demo amaçlı). Production için gerçek auth gerekir.
      await new Promise((r) => setTimeout(r, 300));
      if (password && ADMIN_CONSTANTS.PASSWORD && password === ADMIN_CONSTANTS.PASSWORD) {
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Şifre yanlış!");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    error,
    isLoading,
    login,
    logout,
  };
}; 