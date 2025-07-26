import Link from 'next/link';
import MenuCarousel from './MenuCarousel';
import type { DailySpecial } from '@/lib/types';

interface MenuPreviewProps {
  dailySpecial: DailySpecial;
}

export default function MenuPreview({ dailySpecial }: MenuPreviewProps) {
  // Her kategoriden popüler ürünler
  const featuredItems = [
    {
      name: 'Kıymalı Pide',
      price: '260₺',
      description: 'Özel kıyma harcı ile hazırlanan geleneksel Türk pidesi',
      category: 'PİDELER',
      popular: true
    },
    {
      name: 'Adana Kebap',
      price: '320₺',
      description: 'Acılı, bol baharatlı, közde pişmiş Adana usulü kebap',
      category: 'ANA YEMEKLER',
      popular: true
    },
    {
      name: 'Kaşarlı Gözleme',
      price: '160₺',
      description: 'Taze açılmış hamurda bol kaşar ile hazırlanan gözleme',
      category: 'ATIŞTIRMALIKLAR',
      popular: true
    },
    {
      name: 'Kuzu Şiş',
      price: '380₺',
      description: 'Izgarada pişmiş, yumuşacık kuzu şiş',
      category: 'ANA YEMEKLER',
      popular: true
    },
    {
      name: 'Künefe',
      price: '150₺',
      description: 'Sıcak künefe, Antep fıstığı ve özel şerbeti ile',
      category: 'TATLILAR',
      popular: true
    },
    {
      name: 'Milkshake',
      price: '90₺',
      description: 'Soğuk, ferahlatıcı, bol sütlü milkshake',
      category: 'SOĞUK İÇECEKLER',
      popular: true
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        {/* Dinamik Carousel */}
        <div className="mb-12">
          <MenuCarousel items={featuredItems} />
        </div>

        {/* Kategori Önizlemeleri - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* Kahvaltı */}
          <div className="menu-card group">
            <div className="text-center">
              <h3 className="category-title mb-4">KAHVALTI ÇEŞİTLERİ</h3>
              <p className="text-gray-600 mb-4">Günün en önemli öğünü için özel hazırlanan kahvaltı çeşitlerimiz</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="item-name">Serpme Kahvaltı</span>
                  <span className="price">350₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="item-name">Sahanda Yumurta</span>
                  <span className="price">120₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="item-name">Menemen</span>
                  <span className="price">180₺</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ana Yemekler */}
          <div className="menu-card group">
            <div className="text-center">
              <h3 className="category-title mb-4">ANA YEMEKLER (Izgara & Kebap)</h3>
              <p className="text-gray-600 mb-4">Özel baharatlarla hazırlanan ızgara ve kebap çeşitleri</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="item-name">Kuzu Pirzola</span>
                  <span className="price">450₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="item-name">Saç Kavurma</span>
                  <span className="price">380₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="item-name">Adana Kebap</span>
                  <span className="price">320₺</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pideler */}
          <div className="menu-card group">
            <div className="text-center">
              <h3 className="category-title mb-4">PİDELER</h3>
              <p className="text-gray-600 mb-4">Geleneksel Türk mutfağının vazgeçilmezi</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="item-name">Kıymalı Pide</span>
                  <span className="price">260₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="item-name">Kaşarlı Pide</span>
                  <span className="price">250₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="item-name">Bafra Pidesi</span>
                  <span className="price">270₺</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/menu" 
            className="btn-primary text-lg px-8 py-4 inline-flex items-center"
          >
            Tüm Menüyü Görüntüle
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Günün Yemeği Bölümü */}
        <div className="mt-12 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              GÜNÜN YEMEĞİ
            </h3>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h4 className="text-xl md:text-2xl font-semibold mb-2">
                {dailySpecial.isim}
              </h4>
              <p className="text-lg mb-4 opacity-90">
                {dailySpecial.aciklama}
              </p>
              <div className="flex justify-center items-center space-x-4">
                <span className="text-2xl font-bold">{dailySpecial.fiyat}₺</span>
                {dailySpecial.ozelFiyat && (
                  <span className="bg-yellow-400 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ÖZEL FİYAT
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm opacity-75 mt-4">
              * Günlük özel menü, stok durumuna göre değişebilir
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 