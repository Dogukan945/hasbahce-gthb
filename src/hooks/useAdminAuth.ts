import { useState, useCallback } from 'react';

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
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setError("");
      } else {
        setError(data.message || "Şifre yanlış!");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("Bağlantı hatası! Lütfen tekrar deneyin.");
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