"use client";

import { useState, useEffect } from 'react';
import { 
  getMenuCategories, 
  getMenuItems,
  subscribeToDailySpecial,
  subscribeToMenuItems,
  DailySpecial,
  MenuCategory,
  MenuItem
} from '@/lib/database';

// ===== GÜNÜN YEMEĞİ HOOK'U =====

export const useDailySpecial = () => {
  const [dailySpecial, setDailySpecial] = useState<DailySpecial | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToDailySpecial((data) => {
      setDailySpecial(data);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  return { dailySpecial, loading, error };
};

// ===== MENÜ KATEGORİLERİ HOOK'U =====

export const useMenuCategories = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await getMenuCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Kategoriler yüklenirken hata oluştu');
        console.error('Kategoriler yükleme hatası:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
};

// ===== MENÜ ÜRÜNLERİ HOOK'U =====

export const useMenuItems = (categoryId: string) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setItems([]);
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToMenuItems(categoryId, (data) => {
      setItems(data);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, [categoryId]);

  return { items, loading, error };
};

// ===== TÜM MENÜ ÜRÜNLERİ HOOK'U =====

export const useAllMenuItems = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllItems = async () => {
      try {
        setLoading(true);
        const data = await getMenuItems(); // categoryId olmadan tüm ürünleri getir
        setItems(data);
        setError(null);
      } catch (err) {
        setError('Ürünler yüklenirken hata oluştu');
        console.error('Ürünler yükleme hatası:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllItems();
  }, []);

  return { items, loading, error };
};

// ===== KATEGORİ BAZLI ÜRÜN GRUPLAMA HOOK'U =====

export const useMenuByCategories = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useMenuCategories();
  const { items, loading: itemsLoading, error: itemsError } = useAllMenuItems();

  const menuByCategories = categories.map(category => ({
    ...category,
    items: items.filter(item => item.kategori === category.id)
  }));

  return {
    menuByCategories,
    loading: categoriesLoading || itemsLoading,
    error: categoriesError || itemsError
  };
};

// ===== GÜNÜN YEMEĞİ YÖNETİMİ HOOK'U =====

export const useDailySpecialManagement = () => {
  const { dailySpecial, loading, error } = useDailySpecial();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateDailySpecial = async (data: Omit<DailySpecial, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsUpdating(true);
      const { setDailySpecial } = await import('@/lib/database');
      const success = await setDailySpecial(data);
      
      if (!success) {
        throw new Error('Günün yemeği güncellenirken hata oluştu');
      }
      
      return true;
    } catch (err) {
      console.error('Günün yemeği güncelleme hatası:', err);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    dailySpecial,
    loading,
    error,
    isUpdating,
    updateDailySpecial
  };
};

// ===== MENÜ YÖNETİMİ HOOK'U =====

export const useMenuManagement = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const addMenuItem = async (data: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsUpdating(true);
      const { addMenuItem: addItem } = await import('@/lib/database');
      const itemId = await addItem(data);
      
      if (!itemId) {
        throw new Error('Ürün eklenirken hata oluştu');
      }
      
      return itemId;
    } catch (err) {
      console.error('Ürün ekleme hatası:', err);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  const updateMenuItem = async (id: string, data: Partial<MenuItem>) => {
    try {
      setIsUpdating(true);
      const { updateMenuItem: updateItem } = await import('@/lib/database');
      const success = await updateItem(id, data);
      
      if (!success) {
        throw new Error('Ürün güncellenirken hata oluştu');
      }
      
      return true;
    } catch (err) {
      console.error('Ürün güncelleme hatası:', err);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      setIsUpdating(true);
      const { deleteMenuItem: deleteItem } = await import('@/lib/database');
      const success = await deleteItem(id);
      
      if (!success) {
        throw new Error('Ürün silinirken hata oluştu');
      }
      
      return true;
    } catch (err) {
      console.error('Ürün silme hatası:', err);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
  };
};