'use client';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useState } from 'react';
import Image from 'next/image';

interface ImageLightboxProps {
  images: string[];
  altTexts?: string[];
  className?: string;
  aspectRatio?: string;
}

export default function ImageLightbox({ 
  images, 
  altTexts = [], 
  className = "grid grid-cols-1 md:grid-cols-3 gap-6",
  aspectRatio = "aspect-[4/3]"
}: ImageLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className={className}>
        {images.map((src, index) => (
          <button
            key={src}
            className={`relative w-full ${aspectRatio} rounded-xl overflow-hidden shadow-lg group focus:outline-none transition-transform duration-300 hover:scale-105`}
            onClick={() => handleImageClick(index)}
            aria-label={`Fotoğrafı büyüt - ${altTexts[index] || `Görsel ${index + 1}`}`}
          >
            <Image
              src={src}
              alt={altTexts[index] || `Görsel ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg 
                  className="w-8 h-8 text-white drop-shadow-lg" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images.map((src, index) => ({
          src,
          alt: altTexts[index] || `Görsel ${index + 1}`
        }))}
        carousel={{
          finite: true,
          preload: 2
        }}
        animation={{
          fade: 300,
          swipe: 300
        }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true
        }}
        render={{
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
        }}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)'
          }
        }}
      />
    </>
  );
} 