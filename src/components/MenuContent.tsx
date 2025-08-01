'use client';

import Image from 'next/image';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useState, useMemo } from 'react';
import SkeletonLoader from '@/components/SkeletonLoader';
import Navbar from './Navbar';
import { MENU_CONSTANTS } from '@/lib/constants';
import { useMenuData } from '@/hooks/useMenuData';
import type { SearchResult } from '@/lib/types';

export default function MenuContent() {
  const { menuCategories, categoryList, loading } = useMenuData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Arama fonksiyonu
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const searchLower = searchTerm.toLowerCase();
    const results: SearchResult[] = [];

    categoryList.forEach((categoryKey) => {
      const category = menuCategories[categoryKey as keyof typeof menuCategories];
      const matchingItems = category.items.filter(item =>
        item.name.toLowerCase().includes(searchLower)
      );

      if (matchingItems.length > 0) {
        results.push({
          categoryKey: categoryKey,
          categoryName: category.name,
          categoryDescription: category.description,
          items: matchingItems
        });
      }
    });

    return results;
  }, [searchTerm, menuCategories, categoryList]);

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setSearchTerm('');
  };

  const clearCategory = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex flex-col items-center mb-6">
              <Image 
                src="/hasbahce-logo.png" 
                alt="Hasbahçe Restoran Amasya - Geleneksel Türk Mutfağı" 
                width={120} 
                height={120} 
                className="object-contain mb-4"
                priority
              />
              <h1 className="heading-1 mb-4">{MENU_CONSTANTS.HERO.TITLE}</h1>
            </div>
            <p className="body-text-large text-red-100 max-w-3xl mx-auto">
              {MENU_CONSTANTS.HERO.DESCRIPTION}
            </p>
          </div>
        </div>

        {/* Arama Bölümü */}
        <div className="bg-white shadow-lg -mt-8 mx-4 rounded-2xl relative z-10">
          <div className="max-w-4xl mx-auto p-6">
            <div className="relative">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <FaSearch className="text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder={MENU_CONSTANTS.SEARCH_PLACEHOLDER}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 text-lg px-3 py-2 bg-transparent border-0 outline-none placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Kategoriler Çubuğu */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categoryList.map((categoryKey) => {
                const category = menuCategories[categoryKey as keyof typeof menuCategories];
                return (
                  <button
                    key={categoryKey}
                    onClick={() => handleCategoryClick(categoryKey)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      selectedCategory === categoryKey
                        ? 'bg-red-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
              {selectedCategory && (
                <button
                  onClick={clearCategory}
                  className="px-4 py-2 rounded-lg font-semibold text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
                >
                  {MENU_CONSTANTS.CATEGORY.SHOW_ALL}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Menü İçeriği */}
        <div className="max-w-6xl mx-auto px-4 pb-16">
          {loading ? (
            <div className="space-y-8">
              {[...Array(4)].map((_, i) => (
                <SkeletonLoader key={i} type="category" />
              ))}
            </div>
          ) : searchTerm ? (
            // Arama sonuçları
            <div className="space-y-8">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div key={result.categoryKey} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
                      <h2 className="heading-2 mb-2">{result.categoryName}</h2>
                      <p className="body-text text-red-100">{result.categoryDescription}</p>
                    </div>
                    <div className="p-6">
                      <div className="grid gap-4">
                        {result.items.map((item, index) => (
                          <div key={index} className="group flex justify-between items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-gray-800 group-hover:text-red-700 transition-colors duration-300">{item.name}</h3>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-2xl text-green-600 group-hover:text-green-700 group-hover:scale-110 transition-all duration-300">{item.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-6">
                    <FaSearch className="text-8xl mx-auto" />
                  </div>
                  <h3 className="heading-3 text-gray-600 mb-3">{MENU_CONSTANTS.SEARCH.NO_RESULTS}</h3>
                  <p className="body-text text-gray-500 mb-6">&quot;{searchTerm}&quot; {MENU_CONSTANTS.SEARCH.NO_RESULTS_DESCRIPTION}</p>
                  <button
                    onClick={clearSearch}
                    className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold text-lg"
                  >
                    {MENU_CONSTANTS.SEARCH.CLEAR_SEARCH}
                  </button>
                </div>
              )}
            </div>
          ) : selectedCategory ? (
            // Seçili kategori
            <div className="space-y-8">
              {(() => {
                const category = menuCategories[selectedCategory as keyof typeof menuCategories];
                if (!category) return null;

                return (
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
                      <h2 className="heading-2 mb-2">{category.name}</h2>
                      <p className="body-text text-red-100">{category.description}</p>
                    </div>
                    <div className="p-6">
                      <div className="grid gap-4">
                        {category.items.map((item, index) => (
                          <div key={index} className="group flex justify-between items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-gray-800 group-hover:text-red-700 transition-colors duration-300">{item.name}</h3>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-2xl text-green-600 group-hover:text-green-700 group-hover:scale-110 transition-all duration-300">{item.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            // Tam menü
            <div className="space-y-8">
              {categoryList.map((categoryKey) => {
                const category = menuCategories[categoryKey as keyof typeof menuCategories];
                return (
                  <div key={categoryKey} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
                      <h2 className="heading-2 mb-2">{category.name}</h2>
                      <p className="body-text text-red-100">{category.description}</p>
                    </div>
                    <div className="p-6">
                      <div className="grid gap-4">
                        {category.items.map((item, index) => (
                          <div key={index} className="group flex justify-between items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-gray-800 group-hover:text-red-700 transition-colors duration-300">{item.name}</h3>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-2xl text-green-600 group-hover:text-green-700 group-hover:scale-110 transition-all duration-300">{item.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 