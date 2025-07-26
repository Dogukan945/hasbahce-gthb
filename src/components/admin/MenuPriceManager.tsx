'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenuPrices } from '@/hooks/useMenuPrices';
import { useToast } from '@/hooks/useToast';
import { menuCategories, categoryList } from '@/data/menuData';
import type { MenuPrices } from '@/lib/types';
import { MENU_PRICE_CONSTANTS, ANIMATION_CONSTANTS } from '@/lib/constants';

export default function MenuPriceManager() {
  const { menuPrices, loading, saving, saveMenuPrices } = useMenuPrices();
  const { addToast } = useToast();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editedPrices, setEditedPrices] = useState<MenuPrices | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // İlk yüklemede tüm kategorileri genişlet
  useEffect(() => {
    if (categoryList.length > 0) {
      setExpandedCategories(new Set(categoryList));
    }
  }, []);

  // Firebase'den gelen verileri işle
  useEffect(() => {
    if (menuPrices) {
      setEditedPrices(menuPrices);
      setHasChanges(false);
    } else {
      // Firebase'de veri yoksa varsayılan verileri kullan
      const defaultPrices: MenuPrices = {};
      categoryList.forEach(categoryKey => {
        const category = menuCategories[categoryKey as keyof typeof menuCategories];
        if (category) {
          defaultPrices[categoryKey] = {
            name: category.name,
            description: category.description,
            items: category.items.map(item => ({
              name: item.name,
              price: item.price,
              originalPrice: item.price
            }))
          };
        }
      });
      setEditedPrices(defaultPrices);
      setHasChanges(false);
    }
  }, [menuPrices]);

  const toggleCategory = (categoryKey: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleAllCategories = () => {
    if (expandedCategories.size === categoryList.length) {
      setExpandedCategories(new Set());
    } else {
      setExpandedCategories(new Set(categoryList));
    }
  };

  const updatePrice = (categoryKey: string, itemName: string, newPrice: string) => {
    if (!editedPrices) return;

    const newPrices = { ...editedPrices };
    const category = newPrices[categoryKey];
    if (category) {
      const item = category.items.find(item => item.name === itemName);
      if (item) {
        item.price = newPrice;
        setEditedPrices(newPrices);
        setHasChanges(true);
      }
    }
  };

  const resetToOriginal = (categoryKey: string, itemName: string) => {
    if (!editedPrices) return;

    const newPrices = { ...editedPrices };
    const category = newPrices[categoryKey];
    if (category) {
      const item = category.items.find(item => item.name === itemName);
      if (item) {
        item.price = item.originalPrice;
        setEditedPrices(newPrices);
        setHasChanges(true);
      }
    }
  };

  const resetAllPrices = () => {
    if (!editedPrices) return;

    const newPrices = { ...editedPrices };
    Object.keys(newPrices).forEach(categoryKey => {
      newPrices[categoryKey].items.forEach(item => {
        item.price = item.originalPrice;
      });
    });
    setEditedPrices(newPrices);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!editedPrices) return;

    try {
      await saveMenuPrices(editedPrices);
      setHasChanges(false);
      addToast('success', MENU_PRICE_CONSTANTS.MESSAGES.SAVE_SUCCESS);
    } catch {
      addToast('error', MENU_PRICE_CONSTANTS.MESSAGES.SAVE_ERROR);
    }
  };

  const handleReset = () => {
    if (confirm(MENU_PRICE_CONSTANTS.MESSAGES.RESET_CONFIRM)) {
      resetAllPrices();
      addToast('success', MENU_PRICE_CONSTANTS.MESSAGES.RESET_SUCCESS);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">{MENU_PRICE_CONSTANTS.MESSAGES.LOADING}</div>
      </div>
    );
  }

  if (!editedPrices) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">Menü verileri yüklenemedi!</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menü Fiyatları Yönetimi</h2>
          <p className="text-gray-600 mt-1">Tüm ürünlerin fiyatlarını düzenleyebilirsiniz</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={toggleAllCategories}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {expandedCategories.size === categoryList.length ? 
              MENU_PRICE_CONSTANTS.BUTTONS.COLLAPSE_ALL : 
              MENU_PRICE_CONSTANTS.BUTTONS.EXPAND_ALL
            }
          </button>
          
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <span className="text-lg">↻</span>
            {MENU_PRICE_CONSTANTS.BUTTONS.RESET_ALL}
          </button>
          
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <span className="text-lg">💾</span>
            {saving ? MENU_PRICE_CONSTANTS.MESSAGES.SAVING : MENU_PRICE_CONSTANTS.BUTTONS.SAVE_ALL}
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {categoryList.map(categoryKey => {
          const category = editedPrices[categoryKey];
          if (!category) return null;

          const isExpanded = expandedCategories.has(categoryKey);
          const hasChangesInCategory = category.items.some(item => item.price !== item.originalPrice);

          return (
            <motion.div
              key={categoryKey}
              initial={false}
              animate={{ height: 'auto' }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(categoryKey)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-500">
                      {isExpanded ? '▼' : '▶'}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  </div>
                  {hasChangesInCategory && (
                    <span className="px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 rounded-full">
                      Değişiklik
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{category.items.length} ürün</span>
              </button>

              {/* Category Items */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: ANIMATION_CONSTANTS.DURATION.NORMAL }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-gray-600">{category.description}</p>
                      
                      <div className="space-y-3">
                        {category.items.map((item, index) => {
                          const hasChanged = item.price !== item.originalPrice;
                          
                          return (
                            <div
                              key={`${categoryKey}-${index}`}
                              className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border ${
                                hasChanged ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 truncate">{item.name}</div>
                                {hasChanged && (
                                  <div className="text-xs text-orange-600 mt-1">
                                    Orijinal: {item.originalPrice}
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={item.price}
                                  onChange={(e) => updatePrice(categoryKey, item.name, e.target.value)}
                                  className="w-24 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                  placeholder="Fiyat"
                                />
                                
                                {hasChanged && (
                                  <button
                                    onClick={() => resetToOriginal(categoryKey, item.name)}
                                    className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                                  >
                                    Sıfırla
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Save Button (Bottom) */}
      {hasChanges && (
        <div className="sticky bottom-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Kaydedilmemiş değişiklikler var
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <span className="text-lg">💾</span>
              {saving ? MENU_PRICE_CONSTANTS.MESSAGES.SAVING : MENU_PRICE_CONSTANTS.BUTTONS.SAVE_ALL}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 