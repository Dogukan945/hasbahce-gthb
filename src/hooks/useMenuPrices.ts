import { useEffect, useState } from 'react';
import { subscribeToMenuPrices, setMenuPrices } from '@/lib/menuPriceRepository';
import type { MenuPrices } from '@/lib/types';

export function useMenuPrices() {
  const [menuPrices, setMenuPricesState] = useState<MenuPrices | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToMenuPrices((data) => {
      setMenuPricesState(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const saveMenuPrices = async (prices: MenuPrices) => {
    setSaving(true);
    try {
      await setMenuPrices(prices);
      setMenuPricesState(prices);
    } catch (error) {
      console.error('Menü fiyatları kaydedilirken hata:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  return { 
    menuPrices, 
    loading, 
    saving, 
    saveMenuPrices 
  };
} 