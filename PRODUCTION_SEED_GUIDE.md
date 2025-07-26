# 🚀 Canlı Veritabanını Güvenli Şekilde Doldurma Rehberi

Bu rehber, canlı (production) Firestore veritabanınızı güvenli bir şekilde menü verileriyle doldurmak için kullanılır.

## ⚠️ Güvenlik Uyarısı

Bu işlem sadece **bir kez** yapılmalıdır. İşlem tamamlandıktan sonra `.env.production.local` dosyasını **mutlaka silin**.

## 📋 Adım Adım Talimatlar

### 1. Production Environment Dosyası Oluştur

Proje ana dizininde `.env.production.local` adında yeni bir dosya oluşturun:

```bash
# Proje ana dizininde
touch .env.production.local
```

### 2. Firebase Production Konfigürasyonunu Ekle

`.env.production.local` dosyasına **CANLI (PRODUCTION)** Firebase projenizin konfigürasyon bilgilerini ekleyin:

```env
# CANLI (PRODUCTION) Firebase Konfigürasyonu
NEXT_PUBLIC_FIREBASE_API_KEY=your_production_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_production_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_production_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_production_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_production_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_production_app_id
```

**Önemli:** Bu bilgileri Firebase Console > Project Settings > General > Your Apps > Web App bölümünden alabilirsiniz.

### 3. Veritabanını Doldur

Aşağıdaki komutu çalıştırarak canlı veritabanını doldurun:

```bash
npm run db:seed:prod
```

### 4. İşlem Sonucunu Kontrol Et

Script başarıyla tamamlandığında şu mesajı göreceksiniz:

```
🎉 Migration başarıyla tamamlandı!
   - 9 kategori eklendi
   - 86 ürün eklendi
```

### 5. 🔒 Güvenlik İçin Dosyayı Sil

**ÇOK ÖNEMLİ:** İşlem tamamlandıktan sonra `.env.production.local` dosyasını silin:

```bash
rm .env.production.local
```

### 6. Son Kontroller

- [ ] Canlı web sitenizi ziyaret edin: `https://yourdomain.com/menu`
- [ ] Menünün doğru görüntülendiğini kontrol edin
- [ ] Firebase Console'da verilerin eklendiğini doğrulayın

## 🛠️ Sorun Giderme

### Script Çalışmıyor mu?

1. `.env.production.local` dosyasının doğru konumda olduğunu kontrol edin
2. Firebase konfigürasyon bilgilerinin doğru olduğunu doğrulayın
3. `dotenv-cli` paketinin yüklü olduğunu kontrol edin: `npm list dotenv-cli`

### Menü Hala Boş mu?

1. Firebase Console'da `menuCategories` ve `menuItems` koleksiyonlarını kontrol edin
2. Web sitesinin doğru Firebase projesine bağlandığını doğrulayın
3. Browser console'da hata mesajları olup olmadığını kontrol edin

### Veriler Yanlış mı?

1. Script'i `--force` parametresi ile tekrar çalıştırın:
   ```bash
   npm run db:seed:prod -- --force
   ```

## 📞 Destek

Sorun yaşarsanız:
1. Firebase Console'da verileri kontrol edin
2. Browser console'da hata mesajlarını inceleyin
3. Script çıktısını kontrol edin

---

**Not:** Bu işlem sadece ilk kurulum için gereklidir. Gelecekte menü değişiklikleri admin panelinden yapılabilir. 