// ===== ADMIN SAYFASI SABİTLERİ =====
// !!! GÜVENLİK UYARISI: Şifre kontrolü istemci tarafında yapılmamalıdır.
// Bu implementasyon sadece demo amaçlıdır. Production'da backend servisi kullanılmalıdır.
export const ADMIN_CONSTANTS = {
  // Environment variable'dan şifre al, yoksa default değer kullan (sadece development için)
  PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || (process.env.NODE_ENV === 'production' ? '' : 'h123'),
  MAX_LOGIN_ATTEMPTS: 3,
  LOCK_DURATION: 60 * 1000, // 1 dakika (milisaniye)
  TOAST_DURATION: 3000, // 3 saniye
} as const;

// ===== TAB SABİTLERİ =====
export const TAB_NAMES = {
  DAILY_SPECIAL: 'dailySpecial',
  CATEGORIES: 'categories', 
  PRODUCTS: 'products',
  MENU_PRICES: 'menuPrices',
} as const;

// ===== TOAST TİPLERİ =====
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
} as const;

// ===== NAVIGATION SABİTLERİ =====
export const NAVIGATION = {
  LINKS: [
    { href: '/menu', label: 'Menü' },
    { href: '/about', label: 'Hakkımızda' },
    { href: '/gallery', label: 'Görseller' },
    { href: '/contact', label: 'İletişim' },
  ],
  ADMIN_PATH: '/admin',
} as const;

// ===== İLETİŞİM SABİTLERİ =====
export const CONTACT_CONSTANTS = {
  PHONE: '+90 358 213 05 93',
  LOCATION: {
    GOOGLE_MAPS: 'https://maps.google.com/?q=Hasbahçe+Restoran+Amasya',
    ADDRESS: 'Amasya Merkez, Yeşilırmak Mahallesi',
  },
  FEATURES: {
    TAZE_MALZEMELER: {
      TITLE: 'Taze Malzemeler',
      DESCRIPTION: 'Günlük taze malzemelerle hazırlanan lezzetli yemekler',
      LINK_TEXT: 'Menüyü İncele',
      LINK_HREF: '/menu',
    },
    MERKEZI_KONUM: {
      TITLE: 'Merkezi Konum',
      DESCRIPTION: 'Amasya\'nın merkezinde kolay ulaşılabilir konum',
      LOCATION_LINK: 'https://maps.google.com/?q=Hasbahçe+Restoran+Amasya',
    },
    ILETISIM: {
      TITLE: 'İletişim',
      DESCRIPTION: 'Telefon ile bilgi alabilirsiniz',
      PHONE: '+90 358 213 05 93',
    },
  },
} as const;

// ===== ÇEREZ SABİTLERİ =====
export const COOKIE_CONSTANTS = {
  STORAGE_KEY: 'cookiesAccepted',
  MESSAGE: 'Daha iyi ve hızlı bir site deneyimi için çerezler kullanıyoruz. Devam etmek ister misiniz?',
  BUTTONS: {
    ACCEPT: 'Kabul Et',
    REJECT: 'Reddet',
    MORE_INFO: 'Daha fazla bilgi',
  },
  MORE_INFO_URL: 'https://policies.google.com/technologies/cookies?hl=tr',
  ANALYTICS: {
    ID: 'G-SF6KC2P4WS',
    SCRIPT_URL: 'https://www.googletagmanager.com/gtag/js?id=G-SF6KC2P4WS',
  },
} as const;

// ===== VALIDATION MESAJLARI =====
export const VALIDATION_MESSAGES = {
  // Günün yemeği validasyonları
  DAILY_SPECIAL: {
    NAME_REQUIRED: 'Günün yemeği adı gereklidir',
    NAME_MAX_LENGTH: 'Günün yemeği adı 100 karakterden uzun olamaz',
    DESCRIPTION_REQUIRED: 'Açıklama gereklidir',
    DESCRIPTION_MAX_LENGTH: 'Açıklama 500 karakterden uzun olamaz',
    PRICE_REQUIRED: 'Fiyat gereklidir',
    PRICE_POSITIVE: 'Fiyat pozitif bir sayı olmalıdır',
    PRICE_MAX: 'Fiyat 10.000₺\'den fazla olamaz',
  },
  
  // Kategori validasyonları
  CATEGORY: {
    NAME_REQUIRED: 'Kategori adı gereklidir',
    NAME_MAX_LENGTH: 'Kategori adı 100 karakterden uzun olamaz',
    DESCRIPTION_REQUIRED: 'Açıklama gereklidir',
    DESCRIPTION_MAX_LENGTH: 'Açıklama 500 karakterden uzun olamaz',
    SORT_ORDER_MIN: 'Sıralama 0\'dan küçük olamaz',
    SORT_ORDER_MAX: 'Sıralama 1000\'den büyük olamaz',
  },
  
  // Ürün validasyonları
  PRODUCT: {
    NAME_REQUIRED: 'Ürün adı gereklidir',
    NAME_MAX_LENGTH: 'Ürün adı 100 karakterden uzun olamaz',
    DESCRIPTION_REQUIRED: 'Açıklama gereklidir',
    DESCRIPTION_MAX_LENGTH: 'Açıklama 500 karakterden uzun olamaz',
    PRICE_MIN: 'Fiyat 0\'dan büyük olmalıdır',
    PRICE_MAX: 'Fiyat 10.000₺\'den fazla olamaz',
    CATEGORY_REQUIRED: 'Kategori seçimi gereklidir',
    SORT_ORDER_MIN: 'Sıralama 0\'dan küçük olamaz',
    SORT_ORDER_MAX: 'Sıralama 1000\'den büyük olamaz',
  },
  
  // Genel validasyon mesajları
  GENERAL: {
    INVALID_PRICE: 'Geçerli bir fiyat giriniz',
    FIELD_REQUIRED: (fieldName: string) => `${fieldName} gereklidir`,
    MAX_LENGTH: (fieldName: string, maxLength: number) => `${fieldName} ${maxLength} karakterden uzun olamaz`,
    UNKNOWN_ERROR: 'Bilinmeyen doğrulama hatası',
  },
} as const;

// ===== HATA MESAJLARI =====
export const ERROR_MESSAGES = {
  // Veritabanı hataları
  DATABASE: {
    DAILY_SPECIAL_SAVE: 'Günün yemeği kaydetme hatası',
    DAILY_SPECIAL_GET: 'Günün yemeği getirme hatası',
    CATEGORY_ADD: 'Kategori ekleme hatası',
    CATEGORY_UPDATE: 'Kategori güncelleme hatası',
    CATEGORY_DELETE: 'Kategori silme hatası',
    CATEGORY_GET: 'Kategori getirme hatası',
    PRODUCT_ADD: 'Ürün ekleme hatası',
    PRODUCT_UPDATE: 'Ürün güncelleme hatası',
    PRODUCT_DELETE: 'Ürün silme hatası',
    PRODUCT_GET: 'Ürün getirme hatası',
    CATEGORIES_LOAD: 'Kategoriler yüklenirken hata oluştu',
    PRODUCTS_LOAD: 'Ürünler yüklenirken hata oluştu',
  },
  
  // Form hataları
  FORM: {
    VALIDATION_ERROR: 'Form doğrulama hatası',
    FIX_ERRORS: 'Lütfen form hatalarını düzeltin!',
    SAVE_ERROR: 'Kaydetme sırasında hata oluştu!',
  },
  
  // Auth hataları
  AUTH: {
    WRONG_PASSWORD: 'Şifre yanlış!',
    TOO_MANY_ATTEMPTS: 'Çok fazla yanlış deneme! Lütfen biraz bekleyin.',
    LOCKED_OUT: 'Çok fazla yanlış deneme! 1 dakika bekleyin.',
  },
  
  // Genel hatalar
  GENERAL: {
    LOADING_ERROR: 'Yüklenirken hata oluştu',
    NETWORK_ERROR: 'Ağ bağlantısı hatası',
    UNKNOWN_ERROR: 'Bilinmeyen bir hata oluştu',
  },
} as const;

// ===== BAŞARILI İŞLEM MESAJLARI =====
export const SUCCESS_MESSAGES = {
  DAILY_SPECIAL_SAVED: 'Günün yemeği başarıyla kaydedildi!',
  CATEGORY_ADDED: 'Kategori başarıyla eklendi!',
  CATEGORY_UPDATED: 'Kategori başarıyla güncellendi!',
  CATEGORY_DELETED: 'Kategori başarıyla silindi!',
  PRODUCT_ADDED: 'Ürün başarıyla eklendi!',
  PRODUCT_UPDATED: 'Ürün başarıyla güncellendi!',
  PRODUCT_DELETED: 'Ürün başarıyla silindi!',
  LOGOUT: 'Çıkış yapıldı!',
  RESET: 'Günün yemeği varsayılan değerlere sıfırlandı!',
} as const;

// ===== BİLGİ MESAJLARI =====
export const INFO_MESSAGES = {
  UNSAVED_CHANGES: 'Kaydedilmemiş değişiklikler var. Çıkmak istediğinizden emin misiniz?',
  LOGOUT_CONFIRM: 'Çıkış yapıldı!',
  RESET_CONFIRM: 'Günün yemeği varsayılan değerlere sıfırlandı!',
  LOADING: 'Yükleniyor...',
} as const;

// ===== VARSAYILAN DEĞERLER =====
export const DEFAULT_DAILY_SPECIAL = {
  isim: "Kuzu Pirzola",
  aciklama: "Taze kuzu etinden özel baharatlarla hazırlanan ızgara pirzola",
  fiyat: "450",
  ozelFiyat: true,
  aktif: true,
} as const;

// ===== SAYISAL SABİTLER =====
export const NUMERIC_CONSTANTS = {
  // Fiyat limitleri
  PRICE: {
    MIN: 0.01,
    MAX: 10000,
  },
  
  // Karakter limitleri
  LENGTH: {
    NAME_MAX: 100,
    DESCRIPTION_MAX: 500,
  },
  
  // Sıralama limitleri
  SORT_ORDER: {
    MIN: 0,
    MAX: 1000,
  },
  
  // Giriş deneme limitleri
  LOGIN: {
    MAX_ATTEMPTS: 3,
    LOCK_DURATION_MS: 60 * 1000, // 1 dakika
  },
  
  // Toast süreleri
  TOAST: {
    DURATION_MS: 3000, // 3 saniye
  },
  
  // UI sabitleri
  UI: {
    MOBILE_BREAKPOINT: 768,
    TABLET_BREAKPOINT: 1024,
    DESKTOP_BREAKPOINT: 1280,
  },
} as const;

// ===== MENÜ SABİTLERİ =====
export const MENU_CONSTANTS = {
  // Arama placeholder metni
  SEARCH_PLACEHOLDER: 'Menüde ara... (örn: kebap, pide, kahvaltı)',
  
  // Arama sonucu mesajları
  SEARCH: {
    NO_RESULTS: 'Sonuç bulunamadı',
    NO_RESULTS_DESCRIPTION: 'için arama sonucu bulunamadı.',
    CLEAR_SEARCH: 'Aramayı Temizle',
  },
  
  // Kategori butonları
  CATEGORY: {
    SHOW_ALL: 'Tümü',
  },
  
  // Hero section metinleri
  HERO: {
    TITLE: 'Menümüz',
    DESCRIPTION: 'Geleneksel lezzetlerimizi keşfedin. Her yemek özenle hazırlanır, taze malzemelerle pişirilir.',
  },
} as const;

// ===== FIREBASE SABİTLERİ =====
export const FIREBASE_CONSTANTS = {
  COLLECTIONS: {
    DAILY_SPECIAL: 'dailySpecial',
    MENU_PRICES: 'menuPrices',
  },
  DOCUMENTS: {
    CURRENT: 'current',
    PRICES: 'prices',
  },
} as const;

// ===== MENÜ FİYATLARI SABİTLERİ =====
export const MENU_PRICE_CONSTANTS = {
  // Tab adı
  TAB_NAME: 'menuPrices',
  
  // Mesajlar
  MESSAGES: {
    LOADING: 'Menü fiyatları yükleniyor...',
    SAVING: 'Fiyatlar kaydediliyor...',
    SAVE_SUCCESS: 'Menü fiyatları başarıyla güncellendi!',
    SAVE_ERROR: 'Fiyatlar kaydedilirken hata oluştu!',
    RESET_SUCCESS: 'Fiyatlar varsayılan değerlere sıfırlandı!',
    RESET_CONFIRM: 'Tüm fiyatları varsayılan değerlere sıfırlamak istediğinizden emin misiniz?',
  },
  
  // Buton metinleri
  BUTTONS: {
    SAVE_ALL: 'Tüm Fiyatları Kaydet',
    RESET_ALL: 'Varsayılan Fiyatlara Sıfırla',
    EXPAND_ALL: 'Tümünü Genişlet',
    COLLAPSE_ALL: 'Tümünü Daralt',
  },
  
  // Form etiketleri
  LABELS: {
    CATEGORY: 'Kategori',
    ITEM_NAME: 'Ürün Adı',
    CURRENT_PRICE: 'Mevcut Fiyat',
    NEW_PRICE: 'Yeni Fiyat',
    ORIGINAL_PRICE: 'Orijinal Fiyat',
  },
  
  // Placeholder metinleri
  PLACEHOLDERS: {
    PRICE: 'Fiyat giriniz (örn: 150 TL)',
  },
  
  // Validasyon mesajları
  VALIDATION: {
    PRICE_REQUIRED: 'Fiyat gereklidir',
    PRICE_FORMAT: 'Geçerli bir fiyat formatı giriniz (örn: 150 TL)',
    PRICE_POSITIVE: 'Fiyat pozitif olmalıdır',
  },
} as const;

// ===== ANIMATION SABİTLERİ =====
export const ANIMATION_CONSTANTS = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.6,
  },
  DELAY: {
    SMALL: 0.1,
    MEDIUM: 0.2,
    LARGE: 0.3,
  },
} as const;

// ===== TİP TANIMLARI =====
export type TabType = typeof TAB_NAMES[keyof typeof TAB_NAMES];
export type ToastType = typeof TOAST_TYPES[keyof typeof TOAST_TYPES]; 