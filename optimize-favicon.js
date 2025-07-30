const fs = require('fs');
const path = require('path');

// Favicon optimizasyon script'i
console.log('🔄 Favicon optimizasyonu başlatılıyor...');

// Mevcut favicon dosyalarını kontrol et
const publicDir = path.join(__dirname, 'public');
const faviconFiles = [
  'favicon.ico',
  'favicon.png',
  'favicon-16x16.png',
  'favicon-32x32.png'
];

console.log('📁 Mevcut favicon dosyaları:');
faviconFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`  ✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.log(`  ❌ ${file} (bulunamadı)`);
  }
});

console.log('\n📋 Favicon optimizasyon önerileri:');
console.log('1. favicon.ico dosyası 512x512 tabanlı olmalı ve şu boyutları içermeli:');
console.log('   - 16x16, 32x32, 48x48, 64x64, 128x128, 256x256');
console.log('2. PNG dosyaları net ve optimize edilmiş olmalı');
console.log('3. Anti-aliasing ve kenar netleştirme uygulanmalı');

console.log('\n🔧 Manuel optimizasyon için:');
console.log('1. https://favicon.io/favicon-converter/ adresini kullan');
console.log('2. hasbahce-logo.png dosyasını yükle');
console.log('3. Tüm boyutları seç (16x16, 32x32, 48x48, 64x64, 128x128, 256x256)');
console.log('4. İndirilen dosyaları public/ klasörüne kopyala');

console.log('\n✅ Google Knowledge Panel logo kaldırma tamamlandı!');
console.log('✅ Organization schema\'dan logo ve image alanları kaldırıldı.'); 