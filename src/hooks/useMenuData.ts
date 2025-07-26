import { useState, useEffect } from 'react';
import { useMenuPrices } from './useMenuPrices';
import { menuCategories, categoryList } from '@/data/menuData';

export function useMenuData() {
  const { menuPrices, loading } = useMenuPrices();
  const [currentMenuData, setCurrentMenuData] = useState<typeof menuCategories>(menuCategories);

  useEffect(() => {
    if (menuPrices) {
      // Firebase'den gelen güncel fiyatları kullan
      const updatedMenuData = { ...menuCategories };
      
      Object.keys(menuPrices).forEach(categoryKey => {
        const firebaseCategory = menuPrices[categoryKey];
        const originalCategory = menuCategories[categoryKey as keyof typeof menuCategories];
        
        if (originalCategory && firebaseCategory) {
          updatedMenuData[categoryKey as keyof typeof menuCategories] = {
            ...originalCategory,
            items: originalCategory.items.map(originalItem => {
              const firebaseItem = firebaseCategory.items.find(fi => fi.name === originalItem.name);
              return {
                ...originalItem,
                price: firebaseItem ? firebaseItem.price : originalItem.price
              };
            })
          };
        }
      });
      
      setCurrentMenuData(updatedMenuData);
    } else {
      // Firebase'de veri yoksa orijinal verileri kullan
      setCurrentMenuData(menuCategories);
    }
  }, [menuPrices]);

  return {
    menuCategories: currentMenuData,
    categoryList,
    loading
  };
} 