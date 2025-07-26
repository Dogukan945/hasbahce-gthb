'use client';

import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import Link from 'next/link';

interface MenuItem {
  name: string;
  price: string;
  description: string;
  category: string;
  popular?: boolean;
}

interface MenuCarouselProps {
  items: MenuItem[];
}

export default function MenuCarousel({ items }: MenuCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Otomatik oynatma
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, items.length, isAutoPlaying]);

  // Mouse hover'da otomatik oynatmayı durdur
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Başlık */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Öne Çıkan Lezzetlerimiz
        </h3>
        <p className="text-gray-600">
          Her kategoriden en popüler ve özel yemeklerimizi keşfedin
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 carousel-nav-btn"
          aria-label="Önceki"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 carousel-nav-btn"
          aria-label="Sonraki"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>

        {/* Slides */}
        <div className="flex transition-transform duration-500 ease-in-out">
          {items.map((item, index) => (
            <div
              key={index}
              className={`w-full flex-shrink-0 ${
                index === currentIndex ? 'block' : 'hidden'
              }`}
            >
              <div className="bg-white rounded-xl shadow-xl p-8 mx-4 transform transition-all duration-500 hover:scale-105">
                <div className="text-center">
                  {/* Kategori Badge */}
                  <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {item.category}
                  </div>

                  {/* Ürün Adı */}
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    {item.name}
                  </h4>

                  {/* Popüler Badge */}
                  {item.popular && (
                    <div className="flex items-center justify-center mb-4">
                      <FaStar className="text-yellow-400 mr-2" />
                      <span className="text-yellow-600 font-semibold">Popüler</span>
                    </div>
                  )}

                  {/* Açıklama */}
                  <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
                    {item.description}
                  </p>

                  {/* Fiyat */}
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-6">
                    {item.price}
                  </div>

                  {/* CTA Button */}
                  <Link 
                    href="/menu" 
                    className="btn-primary text-lg px-8 py-4 inline-flex items-center"
                  >
                    Menüde Görüntüle
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-dot ${
                index === currentIndex ? 'active' : ''
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="carousel-progress">
          <div
            className="carousel-progress-bar"
            style={{
              width: `${((currentIndex + 1) / items.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
} 