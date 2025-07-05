'use client';

import Link from 'next/link';
import { FaPhone, FaMapMarkerAlt, FaUtensils, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useDailySpecial } from '@/hooks/useFirestore';

export default function Home() {
  // Firestore'dan günün yemeği verisini al
  const { dailySpecial, loading } = useDailySpecial();

  if (loading || !dailySpecial) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Mobil odaklı büyük hero */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Arka plan deseni */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        {/* Hero içeriği - Mobil odaklı */}
        <div className="text-center text-white z-10 px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            HASBAHÇE
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            Aile dostu bir lokanta olarak özenle hazırladığımız pide ve kebap çeşitlerimizle 
            misafirlerimize samimi bir ortamda kaliteli lezzetler sunuyoruz.
          </p>
          
          {/* Ana CTA butonu - Sadece menü */}
          <div className="flex justify-center">
            <Link 
              href="/menu" 
              className="btn-primary text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 flex items-center text-center"
            >
              <FaUtensils className="mr-3 text-xl md:text-2xl" />
              Menüyü Görüntüle
            </Link>
          </div>

          {/* Küçük Günün Yemeği Bilgisi */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-semibold text-yellow-300 mb-1">🍽️ GÜNÜN YEMEĞİ</p>
                  <p className="text-white font-medium text-sm">{dailySpecial.isim}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">{dailySpecial.fiyat}₺</p>
                  {dailySpecial.ozelFiyat && (
                    <p className="text-yellow-300 text-xs font-semibold">ÖZEL FİYAT</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Özellikler - Mobil odaklı */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Özellik 1 */}
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUtensils className="text-white text-2xl md:text-3xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                Taze Malzemeler
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Günlük taze malzemelerle hazırlanan lezzetli yemekler
              </p>
            </div>
            
            {/* Özellik 2 */}
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-white text-2xl md:text-3xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                Merkezi Konum
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Amasya&apos;nın merkezinde kolay ulaşılabilir konum
              </p>
            </div>
            
            {/* Özellik 3 */}
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-white text-2xl md:text-3xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                İletişim
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Telefon ile bilgi alabilirsiniz
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menü Önizlemesi */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Lezzetli Menümüz
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Geleneksel Türk mutfağının en lezzetli yemekleri, özenle seçilmiş malzemelerle hazırlanıyor
            </p>
          </div>

                     {/* Kategori Önizlemeleri */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
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
                 </div>
               </div>
             </div>

             {/* Tavuk, Balık, Güveç */}
             <div className="menu-card group">
               <div className="text-center">
                 <h3 className="category-title mb-4">ANA YEMEKLER (Tavuk, Balık, Güveç)</h3>
                 <p className="text-gray-600 mb-4">Tavuk, balık ve güveç çeşitleri</p>
                 <div className="space-y-2 text-sm">
                   <div className="flex justify-between">
                     <span className="item-name">Kiremitte Tavuk</span>
                     <span className="price">300₺</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="item-name">Kiremitte Balık</span>
                     <span className="price">450₺</span>
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
          <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                🍽️ GÜNÜN YEMEĞİ
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
                      Özel Fiyat
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

      {/* İletişim Bölümü - Mobil odaklı */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Bize Ulaşın
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Restoranımız hakkında bilgi almak için telefon edebilir veya adresimize gelebilirsiniz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Telefon */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaPhone className="text-4xl md:text-5xl text-red-600 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                Telefon
              </h3>
              <a 
                href="tel:+903582130593" 
                className="text-2xl md:text-3xl font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                +90 358 213 05 93
              </a>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Bilgi almak için arayabilirsiniz
              </p>
            </div>
            
            {/* Adres */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaMapMarkerAlt className="text-4xl md:text-5xl text-red-600 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                Adres
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Örnek Mahallesi, Hasbahçe Sokak No:1, Amasya
              </p>
              <a 
                href="https://maps.app.goo.gl/iAEQMt22wNkRqKJ87" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-4"
              >
                <FaMapMarkerAlt className="mr-2" />
                Haritada Göster
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Mobil odaklı */}
      <footer className="bg-black text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* İletişim Bilgileri */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-red-500">İletişim</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-red-500 mr-3 text-xl" />
                  <div>
                    <p className="font-semibold">Adres</p>
                    <p className="text-gray-300 text-sm md:text-base">
                      Örnek Mahallesi, Hasbahçe Sokak No:1, Amasya
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-red-500 mr-3 text-xl" />
                  <div>
                    <p className="font-semibold">Telefon</p>
                    <a 
                      href="tel:+903582130593" 
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      +90 358 213 05 93
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hızlı Linkler */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-red-500">Hızlı Linkler</h3>
              <div className="space-y-3">
                <Link href="/menu" className="block text-gray-300 hover:text-white transition-colors">
                  Menü
                </Link>
                <a 
                  href="https://maps.app.goo.gl/iAEQMt22wNkRqKJ87" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Haritada Göster
                </a>
              </div>
            </div>
            
            {/* Sosyal Medya */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-red-500">Bizi Takip Edin</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <FaFacebook className="text-white text-xl" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <FaInstagram className="text-white text-xl" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <FaTwitter className="text-white text-xl" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Alt Footer */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Hasbahçe. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
