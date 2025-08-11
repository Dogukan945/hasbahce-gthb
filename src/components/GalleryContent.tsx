"use client";

import ImageLightbox from './ImageLightbox';

const galleryImages = [
  '/about/amasya-restoran.1.png',
  '/about/amasya-yemek-bahce.2.png',
  '/about/amasya-restorant.3.png',
  '/about/amasya-guvenilir.4.png',
  '/about/amasya.cafe.5.png',
  '/about/amasya-restorant.aile.6.png',
  '/about/amasya-restorant.ailecek.7..png',
];

const galleryImageAltTexts = [
  'Amasya nehir kenarında Hasbahçe restoranın dış görünümü ve giriş kapısı',
  'Hasbahçe restoranın bahçe alanı, masalar ve yeşil bitkiler',
  'Hasbahçe restoranın iç mekanı, modern dekorasyon ve oturma alanları',
  'Hasbahçe restoranın güvenilir hizmet kalitesi ve hijyen standartları',
  'Hasbahçe cafe alanı, kahve ve içecek servisi',
  'Hasbahçe restoranın aile dostu ortamı ve çocuklu aileler',
  'Hasbahçe restoranın ailecek keyifli vakit geçirme alanı'
];

export default function GalleryContent() {
  return (
    <section className="py-16 bg-white bg-pattern min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="heading-1 text-red-700 mb-10 text-center tracking-tight">
          İşletme Görselleri
        </h1>
        
        <ImageLightbox 
          images={galleryImages}
          altTexts={galleryImageAltTexts}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          aspectRatio="aspect-[4/3]"
        />
      </div>
    </section>
  );
} 