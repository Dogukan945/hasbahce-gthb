'use client';

import Link from 'next/link';
import { FaArrowLeft, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';

// Menü kategorileri ve ürünleri
const menuCategories = {
  kahvalti: {
    name: 'KAHVALTI ÇEŞİTLERİ',
    description: 'Günün en önemli öğünü için özel hazırlanan kahvaltı çeşitlerimiz',
    items: [
      { name: 'Serpme Kahvaltı', price: '350₺', description: 'Zengin kahvaltı tabağı' },
      { name: 'Kahvaltı Tabağı', price: '350₺', description: 'Klasik kahvaltı' },
      { name: 'Sahanda Yumurta/Omlet', price: '120₺', description: 'Taze yumurta' },
      { name: 'Sucuklu Yumurta', price: '150₺', description: 'Sucuk ile yumurta' },
      { name: 'Menemen', price: '180₺', description: 'Domates, biber, yumurta' },
      { name: 'Sahanda Çökelek', price: '160₺', description: 'Taze çökelek peyniri' }
    ]
  },
  corbalar: {
    name: 'ÇORBALAR',
    description: 'Sıcak ve lezzetli çorbalarımız',
    items: [
      { name: 'Günün Çorbası', price: '120₺', description: 'Günlük özel çorba' },
      { name: 'Kelle Paça', price: '180₺', description: 'Geleneksel kelle paça' },
      { name: 'İşkembe', price: '180₺', description: 'Acılı işkembe çorbası' }
    ]
  },
  atistirmaliklar: {
    name: 'ATIŞTIRMALIKLAR',
    description: 'Hızlı ve lezzetli atıştırmalıklar',
    items: [
      { name: 'Tost', price: '120₺', description: 'Klasik tost' },
      { name: 'Tost (çeşit)', price: '150₺', description: 'Özel tost çeşitleri' },
      { name: 'Hamburger', price: '120₺', description: 'Lezzetli hamburger' },
      { name: 'Sigara Böreği', price: '160₺', description: 'Taze sigara böreği' },
      { name: 'Gözleme', price: '180₺', description: 'El açması gözleme' },
      { name: 'Yağlı', price: '100₺', description: 'Geleneksel yağlı' },
      { name: 'Peynirli Söğüş', price: '90₺', description: 'Peynirli söğüş' },
      { name: 'Patates Cipsi', price: '110₺', description: 'Taze patates cipsi' },
      { name: 'Ev Kurabiyesi (Tereyağlı)', price: '130₺', description: 'Tereyağlı ev kurabiyesi' },
      { name: 'Mevsim Meyve Tabağı', price: '100₺', description: 'Taze mevsim meyveleri' },
      { name: 'Çekirdek', price: '250₺', description: 'Kavrulmuş çekirdek' },
      { name: 'Karışık Kuruyemiş', price: '250₺', description: 'Çeşitli kuruyemiş karışımı' }
    ]
  },
  salatalar: {
    name: 'SALATALAR',
    description: 'Taze ve sağlıklı salatalar',
    items: [
      { name: 'Çoban Salata', price: '120₺', description: 'Geleneksel çoban salata' },
      { name: 'Mevsim Salata', price: '120₺', description: 'Taze mevsim sebzeleri' },
      { name: 'Tavuklu Salata', price: '200₺', description: 'Izgara tavuk ile' }
    ]
  },
  anaYemekler: {
    name: 'ANA YEMEKLER (Izgara & Kebap)',
    description: 'Özel baharatlarla hazırlanan ızgara ve kebap çeşitleri',
    items: [
      { name: 'Kuzu Pirzola', price: '450₺', description: 'Taze kuzu pirzola' },
      { name: 'Saç Kavurma', price: '380₺', description: 'Geleneksel saç kavurma' },
      { name: 'Çoban Kavurma', price: '380₺', description: 'Özel çoban kavurma' },
      { name: 'Karışık Izgara', price: '450₺', description: 'Çeşitli ızgara etler' },
      { name: 'Köfte Izgara', price: '350₺', description: 'Izgara köfte' },
      { name: 'Adana Kebap', price: '320₺', description: 'Geleneksel Adana kebap' },
      { name: 'Yoğurtlu Adana Kebap', price: '350₺', description: 'Yoğurt ile servis' },
      { name: 'Sarma Beyti Kebap', price: '380₺', description: 'Özel sarma beyti' },
      { name: 'Kuzu Şiş', price: '380₺', description: 'Taze kuzu eti' },
      { name: 'Tavuk Şiş', price: '280₺', description: 'Izgara tavuk şiş' },
      { name: 'Kiremitte Şiş', price: '400₺', description: 'Kiremitte pişirilmiş şiş' },
      { name: 'Kiremitte Köfte', price: '360₺', description: 'Kiremitte pişirilmiş köfte' },
      { name: 'Kuzu Tandır (Ön Sipariş)', price: '600₺', description: 'Özel tandır kuzu eti' }
    ]
  },
  anaYemekler2: {
    name: 'ANA YEMEKLER (Tavuk, Balık, Güveç)',
    description: 'Tavuk, balık ve güveç çeşitleri',
    items: [
      { name: 'Kiremitte Kaşarlı Köfte', price: '380₺', description: 'Kaşar peynirli köfte' },
      { name: 'Kiremitte Tavuk', price: '300₺', description: 'Kiremitte pişirilmiş tavuk' },
      { name: 'Ciğer Şiş', price: '320₺', description: 'Taze ciğer şiş' },
      { name: 'Tavuk Kanat', price: '300₺', description: 'Izgara tavuk kanat' },
      { name: 'Tavuk Pirzola', price: '320₺', description: 'Tavuk pirzola' },
      { name: 'Kori Soslu Tavuk', price: '300₺', description: 'Kori sosu ile tavuk' },
      { name: 'Tavuk Şinitzel', price: '300₺', description: 'Klasik tavuk şinitzel' },
      { name: 'Kiremitte Balık (Levrek, Çupra)', price: '450₺', description: 'Taze levrek veya çupra' },
      { name: 'Hamsi Izgara / Tava', price: '320₺', description: 'Taze hamsi balığı' },
      { name: 'Güveçte Mantarlı Et', price: '200₺', description: 'Mantarlı et güveci' },
      { name: 'Patlıcan Kebabı', price: '320₺', description: 'Patlıcan ile kebap' },
      { name: 'Tabldot Yemek', price: '200₺', description: 'Günlük tabldot yemek' }
    ]
  },
  pideler: {
    name: '🫓 PİDELER',
    description: 'Geleneksel Türk mutfağının vazgeçilmezi, taze hamur ve özel malzemelerle hazırlanan pidelerimiz',
    items: [
      { name: 'Kıymalı Pide', price: '260₺', description: 'Özel kıyma harcı' },
      { name: 'Bafra Pidesi', price: '270₺', description: 'Geleneksel Bafra pidesi' },
      { name: 'Kuşbaşılı Pide', price: '290₺', description: 'Kuşbaşı et ile' },
      { name: 'Karışık Pide', price: '320₺', description: 'Çeşitli malzemeler' },
      { name: 'Kaşarlı Pide', price: '250₺', description: 'Bol kaşar peyniri' },
      { name: 'Kavurmalı Pide', price: '300₺', description: 'Kavurma ile' },
      { name: 'Konya İşi', price: '260₺', description: 'Geleneksel Konya pidesi' },
      { name: 'Kavurmalı Pastırmalı (Görele)', price: '380₺', description: 'Özel Görele pastırması ile' }
    ]
  },
  tatlılar: {
    name: 'TATLILAR',
    description: 'Lezzetli tatlı çeşitlerimiz',
    items: [
      { name: 'Fırın Sütlaç', price: '140₺', description: 'Geleneksel sütlaç' },
      { name: 'Künefe', price: '150₺', description: 'Sıcak künefe' },
      { name: 'Fıstıklı Katmer', price: '150₺', description: 'Antep fıstıklı katmer' },
      { name: 'Magnolia', price: '160₺', description: 'Çikolatalı magnolia' },
      { name: 'Waffle', price: '180₺', description: 'Çikolata soslu waffle' },
      { name: 'Cevizli Baklava', price: '150₺', description: 'Geleneksel baklava' }
    ]
  },
  sicakIcecekler: {
    name: 'SICAK İÇECEKLER',
    description: 'Sıcak içecek çeşitlerimiz',
    items: [
      { name: 'Çay', price: '20₺', description: 'Demli çay' },
      { name: 'Fincan Çay', price: '45₺', description: 'Fincan çay' },
      { name: 'Türk Kahvesi', price: '70₺', description: 'Geleneksel Türk kahvesi' },
      { name: 'Salep', price: '80₺', description: 'Sıcak salep' },
      { name: 'Bitki Çayı', price: '50₺', description: 'Çeşitli bitki çayları' },
      { name: 'Sıcak Çikolata', price: '70₺', description: 'Sıcak çikolata' },
      { name: 'Cappuccino', price: '70₺', description: 'İtalyan cappuccino' },
      { name: 'Nescafe', price: '70₺', description: 'Nescafe' },
      { name: 'Filtre Kahve', price: '100₺', description: 'Taze filtre kahve' },
      { name: 'Semaver', price: '280₺', description: 'Semaver çayı' },
      { name: 'Termos', price: '150₺', description: 'Termos çay' }
    ]
  },
  sogukIcecekler: {
    name: 'SOĞUK İÇECEKLER',
    description: 'Soğuk içecek çeşitlerimiz',
    items: [
      { name: 'Kutu Kola, Fanta', price: '60₺', description: 'Soğuk gazlı içecek' },
      { name: 'Şişe Kola, Fanta', price: '50₺', description: 'Şişe gazlı içecek' },
      { name: 'Kutu Meyve Suyu', price: '60₺', description: 'Kutu meyve suyu' },
      { name: 'Sprite', price: '60₺', description: 'Sprite' },
      { name: 'Ice Tea', price: '60₺', description: 'Soğuk çay' },
      { name: 'Limonata', price: '55₺', description: 'Taze limonata' },
      { name: 'Ayran', price: '35₺', description: 'Taze ayran' },
      { name: 'Meyveli Soda', price: '35₺', description: 'Meyveli soda' },
      { name: 'Sade Soda', price: '35₺', description: 'Sade soda' },
      { name: 'Su 0.5 L', price: '15₺', description: 'Şişe su' },
      { name: 'Gazoz Çeşitleri', price: '50₺', description: 'Çeşitli gazozlar' },
      { name: 'Milkshake', price: '90₺', description: 'Çikolatalı milkshake' },
      { name: 'Frozen', price: '90₺', description: 'Frozen içecek' }
    ]
  }
};

export default function MenuPage() {
  // Aktif kategori state'i
  const [activeCategory, setActiveCategory] = useState('kahvalti');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobil odaklı header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Ana Sayfa
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              HASBAHÇE MENÜ
            </h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-20 text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Lezzetli Menümüz
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Özenle seçilmiş malzemelerle hazırlanan geleneksel Türk mutfağının en lezzetli yemekleri
          </p>
        </div>
      </section>

      {/* Menü İçeriği */}
      <main className="py-12 md:py-16">
        <div className="container-custom">
          
          {/* Kategori Tab'ları */}
          <div className="category-tabs-container">
            <div className="category-tabs">
              {Object.entries(menuCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`category-tab ${activeCategory === key ? 'active' : ''}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Seçili Kategori İçeriği */}
          {Object.entries(menuCategories).map(([key, category]) => (
            <div key={key} className={activeCategory === key ? 'block' : 'hidden'}>
              {/* Kategori Başlığı */}
              <div className="text-center mb-8 md:mb-12">
                <h3 className="category-title mb-4">
                  {category.name}
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                  {category.description}
                </p>
                {/* Pide kategorisi için özel not */}
                {key === 'pideler' && (
                  <p className="text-red-600 font-semibold mt-2">(Yumurta +10₺ eklenebilir)</p>
                )}
              </div>
              
              {/* Kategori Ürünleri */}
              <div className="category-content">
                {category.items.map((item, index) => (
                  <div key={index} className="menu-card">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="item-name text-xl md:text-2xl font-bold mb-2">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm md:text-base">
                          {item.description}
                        </p>
                      </div>
                      <span className="price text-2xl md:text-3xl font-bold">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* İletişim Bölümü */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Bize Ulaşın
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-sm md:text-base">
              Restoranımız hakkında bilgi almak için telefon edebilir veya adresimize gelebilirsiniz.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
              {/* Telefon */}
              <div className="bg-red-50 rounded-lg p-6">
                <FaPhone className="text-3xl md:text-4xl text-red-600 mx-auto mb-4" />
                <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  Telefon
                </h4>
                <a 
                  href="tel:+903582130593" 
                  className="text-xl md:text-2xl font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  +90 358 213 05 93
                </a>
                <p className="text-gray-600 mt-2 text-sm">
                  Bilgi almak için arayabilirsiniz
                </p>
              </div>
              
              {/* Adres */}
              <div className="bg-gray-50 rounded-lg p-6">
                <FaMapMarkerAlt className="text-3xl md:text-4xl text-gray-600 mx-auto mb-4" />
                <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  Adres
                </h4>
                <p className="text-gray-600 text-sm md:text-base">
                  Örnek Mahallesi, Hasbahçe Sokak No:1, Amasya
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+903582130593" 
                className="btn-primary text-lg px-8 py-4 inline-flex items-center"
              >
                <FaPhone className="mr-3" />
                Hemen Ara
              </a>
              <a 
                href="https://maps.app.goo.gl/iAEQMt22wNkRqKJ87" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center"
              >
                <FaMapMarkerAlt className="mr-3" />
                Haritada Göster
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container-custom text-center">
          <p className="text-gray-400">
            &copy; 2024 Hasbahçe. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
} 