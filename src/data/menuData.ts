// ===== MENÜ VERİLERİ =====

// Menü kategorileri ve ürünleri
export const menuCategories = {
  kahvalti: {
    name: 'KAHVALTI',
    description: 'Günün en önemli öğünü için özel hazırlanan kahvaltı çeşitlerimiz',
    items: [
      { name: 'Serpme Kahvaltı', price: '350 TL' },
      { name: 'Kahvaltı Tabağı', price: '350 TL' },
      { name: 'Sahanda Yumurta / Omlet', price: '120 TL' },
      { name: 'Sucuklu Yumurta', price: '150 TL' },
      { name: 'Menemen', price: '180 TL' },
      { name: 'Sahanda Çökelek', price: '160 TL' }
    ]
  },
  corbalar: {
    name: 'ÇORBALAR',
    description: 'Sıcak ve lezzetli çorbalarımız',
    items: [
      { name: 'Günün Çorbası (Mercimek, Yayla, Ezogelin, Mantar)', price: '120 TL' },
      { name: 'Kelle Paça', price: '180 TL' },
      { name: 'İşkembe', price: '180 TL' }
    ]
  },
  anaYemekler: {
    name: 'ANA YEMEKLER',
    description: 'Özel baharatlarla hazırlanan ızgara ve kebap çeşitleri',
    items: [
      { name: 'Kuzu Pirzola', price: '450 TL' },
      { name: 'Saç Kavurma', price: '380 TL' },
      { name: 'Çoban Kavurma', price: '380 TL' },
      { name: 'Karışık Izgara', price: '450 TL' },
      { name: 'Köfte Izgara', price: '350 TL' },
      { name: 'Adana Kebap', price: '320 TL' },
      { name: 'Yoğurtlu Adana Kebap', price: '350 TL' },
      { name: 'Sarma Beyti Kebap', price: '380 TL' },
      { name: 'Kuzu Şiş', price: '380 TL' },
      { name: 'Tavuk Şiş', price: '280 TL' },
      { name: 'Kiremitte Şiş', price: '400 TL' },
      { name: 'Kiremitte Köfte', price: '360 TL' },
      { name: 'Kuzu Tandır (Ön Sipariş)', price: '600 TL' },
      { name: 'Kiremitte Kaşarlı Köfte', price: '380 TL' },
      { name: 'Kiremitte Tavuk', price: '300 TL' },
      { name: 'Ciğer Şiş', price: '320 TL' },
      { name: 'Tavuk Kanat', price: '300 TL' },
      { name: 'Tavuk Pirzola', price: '320 TL' },
      { name: 'Kori Soslu Tavuk', price: '300 TL' },
      { name: 'Tavuk Şinitzel', price: '300 TL' },
      { name: 'Hamsi Izgara / Tava', price: '320 TL' },
      { name: 'Tabldot Yemek', price: '200 TL' }
    ]
  },
  pideler: {
    name: 'PİDELER',
    description: 'Geleneksel Türk pideleri',
    items: [
      { name: 'Kıymalı Pide', price: '260 TL' },
      { name: 'Bafra Pidesi', price: '270 TL' },
      { name: 'Kuşbaşılı Pide', price: '290 TL' },
      { name: 'Karışık Pide', price: '320 TL' },
      { name: 'Kaşarlı Pide', price: '250 TL' },
      { name: 'Kavurmalı Pide', price: '300 TL' },
      { name: 'Konya İşi', price: '260 TL' },
      { name: 'Kavurmalı Pastırmalı (Görele)', price: '380 TL' },
      { name: 'Yumurta Ekleme', price: '+10 TL' }
    ]
  },
  atistirmaliklar: {
    name: 'ATIŞTIRMALIKLAR',
    description: 'Hızlı ve lezzetli atıştırmalıklar',
    items: [
      { name: 'Tost', price: '120 TL' },
      { name: 'Hamburger', price: '150 TL' },
      { name: 'Sigara Böreği', price: '120 TL' },
      { name: 'Gözleme', price: '160 TL' },
      { name: 'Yağlı', price: '180 TL' },
      { name: 'Peynirli Söğüş', price: '100 TL' },
      { name: 'Patates Cipsi', price: '90 TL' },
      { name: 'Mevsim Meyve Tabağı', price: '130 TL' },
      { name: 'Çekirdek', price: '100 TL' },
      { name: 'Karışık Kuruyemiş', price: '250 TL' }
    ]
  },
  salatalar: {
    name: 'SALATALAR',
    description: 'Taze ve sağlıklı salatalar',
    items: [
      { name: 'Çoban Salata', price: '120 TL' },
      { name: 'Mevsim Salata', price: '120 TL' },
      { name: 'Tavuklu Salata', price: '200 TL' }
    ]
  },
  tatlılar: {
    name: 'TATLILAR',
    description: 'Geleneksel Türk tatlıları',
    items: [
      { name: 'Fırın Sütlaç', price: '140 TL' },
      { name: 'Künefe', price: '150 TL' },
      { name: 'Fıstıklı Katmer', price: '150 TL' },
      { name: 'Kadayıf Dondurma', price: '160 TL' },
      { name: 'Magnolya', price: '160 TL' },
      { name: 'Cheesecake', price: '150 TL' },
      { name: 'Waffle', price: '180 TL' },
      { name: 'Dondurma (3 top)', price: '120 TL' },
      { name: 'Dilim Pasta', price: '120 TL' },
      { name: 'Cevizli Baklava', price: '150 TL' },
      { name: 'Kadayıf', price: '130 TL' },
      { name: 'Trileçe', price: '120 TL' }
    ]
  },
  sicakIcecekler: {
    name: 'SICAK İÇECEKLER',
    description: 'Sıcak içecek çeşitlerimiz',
    items: [
      { name: 'Çay', price: '20 TL' },
      { name: 'Fincan Çay', price: '45 TL' },
      { name: 'Türk Kahvesi', price: '70 TL' },
      { name: 'Salep', price: '80 TL' },
      { name: 'Bitki Çayı', price: '50 TL' },
      { name: 'Sıcak Çikolata', price: '70 TL' },
      { name: 'Cappuccino', price: '70 TL' },
      { name: 'Nescafe', price: '70 TL' },
      { name: 'Filtre Kahve', price: '100 TL' },
      { name: 'Semaver', price: '280 TL' },
      { name: 'Termos', price: '150 TL' }
    ]
  },
  sogukIcecekler: {
    name: 'SOĞUK İÇECEKLER',
    description: 'Soğuk içecek çeşitlerimiz',
    items: [
      { name: 'Kutu Kola / Fanta', price: '60 TL' },
      { name: 'Şişe Kola / Fanta', price: '50 TL' },
      { name: 'Kutu Meyve Suyu', price: '60 TL' },
      { name: 'Sprite', price: '60 TL' },
      { name: 'Ice Tea', price: '60 TL' },
      { name: 'Limonata', price: '55 TL' },
      { name: 'Ayran', price: '35 TL' },
      { name: 'Soda', price: '35 TL' },
      { name: 'Su (0.5L)', price: '15 TL' },
      { name: 'Gazoz Çeşitleri', price: '50 TL' }
    ]
  }
};

// Kategori sıralaması
export const categoryList = [
  'kahvalti',
  'corbalar', 
  'anaYemekler',
  'pideler',
  'atistirmaliklar',
  'salatalar',
  'tatlılar',
  'sicakIcecekler',
  'sogukIcecekler'
]; 