# Hasbahçe Restoran Sitesi

Hasbahçe, aile dostu bir lokanta olarak özenle hazırladığımız pide ve kebap çeşitlerimizle misafirlerimize samimi bir ortamda kaliteli lezzetler sunuyoruz.

## Özellikler

- 📱 Mobil uyumlu responsive tasarım
- 🍽️ Detaylı menü sayfası
- 📱 QR kod ile menü erişimi
- 📍 Google Maps entegrasyonu
- 📞 Direkt telefon arama
- 🎨 Modern ve kullanıcı dostu arayüz

## Teknolojiler

- **Next.js 15** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Firebase** - Hosting ve veritabanı
- **QRCode** - QR kod oluşturma
- **React Icons** - İkonlar

## Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd hasbahce
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

## Firebase Kurulumu

### 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/)'a gidin
2. "Yeni Proje Oluştur" butonuna tıklayın
3. Proje adını "hasbahce" olarak belirleyin
4. Google Analytics'i etkinleştirin (isteğe bağlı)
5. "Proje Oluştur" butonuna tıklayın

### 2. Web Uygulaması Ekleme

1. Firebase Console'da projenizi açın
2. "Web" simgesine tıklayın
3. Uygulama takma adını "hasbahce-web" olarak belirleyin
4. "Uygulama Kaydet" butonuna tıklayın
5. Firebase konfigürasyon bilgilerini kopyalayın

### 3. Environment Değişkenlerini Ayarlama

Kopyaladığınız Firebase konfigürasyon bilgilerini `.env.local` dosyasına ekleyin:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase CLI Kurulumu

1. Firebase CLI'yi yükleyin:
```bash
npm install -g firebase-tools
```

2. Firebase'e giriş yapın:
```bash
firebase login
```

3. Projeyi Firebase ile başlatın:
```bash
firebase init
```

4. Aşağıdaki seçenekleri seçin:
   - Hosting'i seçin
   - Mevcut projeyi seçin
   - Public directory olarak "out" seçin
   - Single-page app sorusuna "No" deyin
   - GitHub Actions sorusuna "No" deyin

### 5. Deployment

Projeyi Firebase'e deploy etmek için:

```bash
npm run deploy
```

## Sayfa Yapısı

- **Ana Sayfa (`/`)** - Restoran tanıtımı ve iletişim bilgileri
- **Menü Sayfası (`/menu`)** - Tüm menü öğeleri ve fiyatları
- **QR Kod Sayfası (`/qr`)** - Menü sayfasına yönlendiren QR kod

## Menü

### Pide Çeşitleri
- Kıymalı Pide – 120₺
- Kaşarlı Pide – 110₺

### Kebap Çeşitleri
- Adana Kebap – 150₺
- Urfa Kebap – 145₺

### İçecekler
- Ayran – 30₺
- Şalgam – 35₺

## İletişim

- **Adres:** Örnek Mahallesi, Hasbahçe Sokak No:1, Amasya
- **Telefon:** +90 358 213 05 93
- **Google Maps:** [Haritada Göster](https://maps.app.goo.gl/iAEQMt22wNkRqKJ87)

## Lisans

Bu proje özel kullanım için geliştirilmiştir.
