# Hasbahçe Restoran Sitesi

Hasbahçe, aile dostu bir lokanta olarak özenle hazırladığımız pide ve kebap çeşitlerimizle misafirlerimize samimi bir ortamda kaliteli lezzetler sunuyoruz.

## Özellikler

- 📱 Mobil uyumlu responsive tasarım
- 🍽️ Detaylı menü sayfası
- 📱 QR kod ile menü erişimi
- 📍 Google Maps entegrasyonu
- 📞 Direkt telefon arama
- 🎨 Modern ve kullanıcı dostu arayüz
- 🔐 Admin paneli ile günlük yemek yönetimi
- 🍪 Çerez onay sistemi
- 📊 Google Analytics entegrasyonu

## Teknolojiler

- **Next.js 15** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Firebase** - Hosting ve veritabanı
- **Framer Motion** - Animasyonlar
- **React Icons** - İkonlar
- **Zod** - Form validasyonu

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/Dogukan945/hasbahce-gthb.git
cd hasbahce-gthb
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Firebase konfigürasyonu için `.env.local` dosyası oluşturun:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Admin Paneli

Admin paneline erişmek için:
- URL: `/admin`
- Şifre: `h123`

## Sayfa Yapısı

- **Ana Sayfa (`/`)** - Restoran tanıtımı ve günlük yemek
- **Menü Sayfası (`/menu`)** - Tüm menü öğeleri ve fiyatları
- **Hakkımızda (`/about`)** - Restoran hakkında bilgiler
- **Galeri (`/gallery`)** - Restoran fotoğrafları
- **İletişim (`/contact`)** - İletişim bilgileri ve harita
- **Admin Panel (`/admin`)** - Günlük yemek yönetimi

## İletişim

- **Adres:** Amasya Merkez, Yeşilırmak Mahallesi
- **Telefon:** +90 358 123 45 67
- **Google Maps:** [Haritada Göster](https://maps.google.com/?q=Hasbahçe+Restoran+Amasya)

## Lisans

Bu proje özel kullanım için geliştirilmiştir.
