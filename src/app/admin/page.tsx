"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaEye, FaEyeSlash, FaCheck, FaTimes, FaUtensils, FaChartBar, FaCog, FaQrcode } from "react-icons/fa";
import { useDailySpecialManagement } from '@/hooks/useFirestore';

// Ürün tipi - Gelecekte kullanılacak
// interface Urun {
//   isim: string;
//   fiyat: string;
//   aciklama: string;
//   stok: boolean;
// }

// Menü kategorisi tipi - Gelecekte kullanılacak
// interface Kategori {
//   isim: string;
//   aciklama: string;
//   urunler: Urun[];
// }

// Menü veri tipi - Gelecekte kullanılacak
// interface MenuData {
//   [key: string]: Kategori;
// }

const ADMIN_PASSWORD = "123";

// Günün yemeği tipi - Gelecekte kullanılacak
// interface DailySpecial {
//   isim: string;
//   aciklama: string;
//   fiyat: string;
//   ozelFiyat: boolean;
// }

// const initialDailySpecial = {
//   isim: "Kuzu Pirzola",
//   aciklama: "Taze kuzu etinden özel baharatlarla hazırlanan ızgara pirzola",
//   fiyat: "450",
//   ozelFiyat: true
// };

// Analytics tipi - Gelecekte kullanılacak
// interface Analytics {
//   toplamUrun: number;
//   toplamKategori: number;
//   stoktaUrun: number;
//   stokDisiUrun: number;
//   ortalamaFiyat: number;
//   sonGuncelleme: string;
// }

// Örnek menü verisi - Gelecekte kullanılacak
// const initialMenuData: MenuData = {
//   kahvalti: {
//     isim: "KAHVALTI ÇEŞİTLERİ",
//     aciklama: "Günün en önemli öğünü için özel hazırlanan kahvaltı çeşitlerimiz",
//     urunler: [
//       { isim: "Serpme Kahvaltı", fiyat: "350", aciklama: "Zengin kahvaltı tabağı", stok: true },
//       { isim: "Kahvaltı Tabağı", fiyat: "350", aciklama: "Klasik kahvaltı", stok: true },
//     ],
//   },
//   anaYemekler: {
//     isim: "ANA YEMEKLER (Izgara & Kebap)",
//     aciklama: "Özel baharatlarla hazırlanan ızgara ve kebap çeşitleri",
//     urunler: [
//       { isim: "Kuzu Pirzola", fiyat: "450", aciklama: "Taze kuzu pirzola", stok: true },
//       { isim: "Adana Kebap", fiyat: "320", aciklama: "Geleneksel Adana kebap", stok: true },
//     ],
//   },
//   pideler: {
//     isim: "🫓 PİDELER",
//     aciklama: "Geleneksel Türk mutfağının vazgeçilmezi",
//     urunler: [
//       { isim: "Kıymalı Pide", fiyat: "260", aciklama: "Özel kıyma harcı", stok: true },
//       { isim: "Kaşarlı Pide", fiyat: "250", aciklama: "Bol kaşar peyniri", stok: true },
//     ],
//   },
// };

// Analytics hesaplama fonksiyonu - Gelecekte kullanılacak
// const calculateAnalytics = (menuData: MenuData): Analytics => {
//   const toplamUrun = Object.values(menuData).reduce((acc, cat) => acc + cat.urunler.length, 0);
//   const toplamKategori = Object.keys(menuData).length;
//   const stoktaUrun = Object.values(menuData).reduce((acc, cat) => acc + cat.urunler.filter(u => u.stok).length, 0);
//   const stokDisiUrun = toplamUrun - stoktaUrun;
//   const ortalamaFiyat = toplamUrun > 0 ? Math.round(
//     Object.values(menuData).reduce((acc, cat) => acc + cat.urunler.reduce((sum, u) => sum + parseInt(u.fiyat), 0), 0) / toplamUrun
//   ) : 0;
//   
//   return {
//     toplamUrun,
//     toplamKategori,
//     stoktaUrun,
//     stokDisiUrun,
//     ortalamaFiyat,
//     sonGuncelleme: new Date().toLocaleDateString('tr-TR'),
//   };
// };

// Toast notification tipi
interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// Düzenleme için günün yemeği tipi (fiyat string olarak)
interface EditingDailySpecial {
  isim: string;
  aciklama: string;
  fiyat: string;
  ozelFiyat: boolean;
  aktif: boolean;
}

type DailySpecialType = import('@/lib/database').DailySpecial;

export default function AdminPage() {
  // Şifreli giriş için state'ler
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tries, setTries] = useState(0);
  const [lockUntil, setLockUntil] = useState<number|null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Firebase hooks
  const { 
    dailySpecial, 
    isUpdating: isDailySpecialUpdating,
    updateDailySpecial 
  } = useDailySpecialManagement();

  // İleride menü kategorileri yönetimi için kullanılacak
  // const { 
  //   categories, 
  //   loading: categoriesLoading, 
  //   error: categoriesError 
  // } = useMenuCategories();

  // İleride menü ürünleri yönetimi için kullanılacak
  // const { 
  //   addMenuItem, 
  //   updateMenuItem, 
  //   deleteMenuItem, 
  //   isUpdating: isMenuUpdating 
  // } = useMenuManagement();

  // Local state'ler
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [editingDailySpecial, setEditingDailySpecial] = useState<EditingDailySpecial>({
    isim: "",
    aciklama: "",
    fiyat: "",
    ozelFiyat: false,
    aktif: true
  });

  // Toast notifications için state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast ekleme fonksiyonu
  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  // Günün yemeği verilerini düzenleme state'ine yükle
  useEffect(() => {
    if (dailySpecial && isAuthenticated) {
      setEditingDailySpecial({
        isim: dailySpecial.isim ?? "",
        aciklama: dailySpecial.aciklama ?? "",
        fiyat: dailySpecial.fiyat !== undefined ? String(dailySpecial.fiyat) : "",
        ozelFiyat: dailySpecial.ozelFiyat ?? false,
        aktif: dailySpecial.aktif ?? true
      });
    }
  }, [dailySpecial, isAuthenticated]);

  // Değişiklik kontrolü
  useEffect(() => {
    if (dailySpecial && isAuthenticated) {
      const hasChanges = JSON.stringify({
        isim: dailySpecial.isim,
        aciklama: dailySpecial.aciklama,
        fiyat: String(dailySpecial.fiyat), // Number'ı string'e çevir
        ozelFiyat: dailySpecial.ozelFiyat,
        aktif: dailySpecial.aktif
      }) !== JSON.stringify(editingDailySpecial);
      setHasUnsavedChanges(hasChanges);
    }
  }, [editingDailySpecial, dailySpecial, isAuthenticated]);

  // Şifre kontrol fonksiyonu
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    if (lockUntil && Date.now() < lockUntil) {
      setError("Çok fazla yanlış deneme! Lütfen biraz bekleyin.");
      setIsLoading(false);
      return;
    }
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
      setTries(0);
      setError("");
      addToast('success', 'Başarıyla giriş yapıldı!');
    } else {
      const newTries = tries + 1;
      setTries(newTries);
      setError("Şifre yanlış!");
      if (newTries >= 3) {
        setLockUntil(Date.now() + 60 * 1000); // 1 dakika kilit
        setError("Çok fazla yanlış deneme! 1 dakika bekleyin.");
        setTries(0);
      }
    }
    setIsLoading(false);
  };

  // Ürün yönetimi fonksiyonları - Gelecekte kullanılacak
  // const addItem = (category: string) => {
  //   const newItem: Urun = { isim: "Yeni Ürün", fiyat: "100", aciklama: "Ürün açıklaması", stok: true };
  //   setMenuData((prev) => ({
  //     ...prev,
  //     [category]: {
  //       ...prev[category],
  //       urunler: [...prev[category].urunler, newItem],
  //     },
  //   }));
  // };

  // const deleteItem = (category: string, index: number) => {
  //   setMenuData((prev) => ({
  //     ...prev,
  //     [category]: {
  //       ...prev[category],
  //       urunler: prev[category].urunler.filter((_, i) => i !== index),
  //     },
  //   }));
  // };

  // const updateItem = (category: string, index: number, field: keyof Urun, value: string) => {
  //   setMenuData((prev) => ({
  //     ...prev,
  //     [category]: {
  //       ...prev[category],
  //       urunler: prev[category].urunler.map((item, i) =>
  //         i === index ? { ...item, [field]: value } : item
  //       ),
  //     },
  //   }));
  // };

  // const toggleStock = (category: string, index: number) => {
  //   setMenuData((prev) => ({
  //     ...prev,
  //     [category]: {
  //       ...prev[category],
  //       urunler: prev[category].urunler.map((item, i) =>
  //         i === index ? { ...item, stok: !item.stok } : item
  //       ),
  //     },
  //   }));
  // };

  // Günün yemeği kaydetme fonksiyonu
  const handleSaveDailySpecial = async () => {
    try {
      const dataToSave: Omit<DailySpecialType, 'id' | 'createdAt' | 'updatedAt'> = {
        isim: editingDailySpecial.isim,
        aciklama: editingDailySpecial.aciklama,
        fiyat: Number(editingDailySpecial.fiyat),
        ozelFiyat: editingDailySpecial.ozelFiyat,
        aktif: editingDailySpecial.aktif
      };
      const success = await updateDailySpecial(dataToSave);
      if (success) {
        setHasUnsavedChanges(false);
        addToast('success', 'Günün yemeği başarıyla kaydedildi!');
      } else {
        addToast('error', 'Kaydetme sırasında hata oluştu!');
      }
    } catch {
      addToast('error', 'Kaydetme sırasında hata oluştu!');
    }
  };

  // Günün yemeği sıfırlama fonksiyonu
  const handleResetDailySpecial = () => {
    const defaultData: EditingDailySpecial = {
      isim: "Kuzu Pirzola",
      aciklama: "Taze kuzu etinden özel baharatlarla hazırlanan ızgara pirzola",
      fiyat: "450",
      ozelFiyat: true,
      aktif: true
    };
    setEditingDailySpecial(defaultData);
    addToast('info', 'Günün yemeği varsayılan değerlere sıfırlandı!');
  };

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    if (hasUnsavedChanges) {
      if (confirm('Kaydedilmemiş değişiklikler var. Çıkmak istediğinizden emin misiniz?')) {
        setIsAuthenticated(false);
        setHasUnsavedChanges(false);
        addToast('info', 'Çıkış yapıldı!');
      }
    } else {
      setIsAuthenticated(false);
      addToast('info', 'Çıkış yapıldı!');
    }
  };

  // Şifreli giriş ekranı
  if (!isAuthenticated) {
    const remaining = lockUntil && Date.now() < lockUntil
      ? Math.ceil((lockUntil - Date.now()) / 1000)
      : 0;
      
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Yönetici Girişi</h2>
          <label className="block mb-2 font-medium">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-red-500"
            disabled={isLoading || remaining > 0}
            autoFocus
          />
          {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
          {remaining > 0 && (
            <div className="text-orange-600 mb-2 text-sm">{remaining} saniye bekleyin...</div>
          )}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-60"
            disabled={isLoading || remaining > 0}
          >
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    );
  }

  // Admin paneli ana ekranı
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white flex items-center space-x-2 ${
              toast.type === 'success' ? 'bg-green-500' :
              toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {toast.type === 'success' && <FaCheck />}
            {toast.type === 'error' && <FaTimes />}
            {toast.type === 'info' && <FaCog />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-red-600 hover:text-red-700">
              <FaArrowLeft className="mr-2" /> Ana Sayfaya Dön
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Hasbahçe Yönetim Paneli</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center ${
                  isPreviewMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                {isPreviewMode ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
                {isPreviewMode ? 'Önizlemeyi Kapat' : 'Önizleme'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Günün Yemeği Yönetimi */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <FaUtensils className="mr-2 text-red-600" />
              Günün Yemeği Yönetimi
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleResetDailySpecial}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm"
              >
                Varsayılana Sıfırla
              </button>
              <button
                onClick={handleSaveDailySpecial}
                disabled={!hasUnsavedChanges || isDailySpecialUpdating}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center ${
                  hasUnsavedChanges && !isDailySpecialUpdating
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                <FaSave className="mr-2" />
                {isDailySpecialUpdating ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Düzenleme Formu */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yemek Adı *
                </label>
                <input
                  type="text"
                  value={editingDailySpecial.isim}
                  onChange={(e) => setEditingDailySpecial(prev => ({ ...prev, isim: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Örn: Kuzu Pirzola"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama *
                </label>
                <textarea
                  value={editingDailySpecial.aciklama}
                  onChange={(e) => setEditingDailySpecial(prev => ({ ...prev, aciklama: e.target.value }))}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Yemeğin detaylı açıklaması..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fiyat (₺) *
                </label>
                <input
                  type="number"
                  value={editingDailySpecial.fiyat}
                  onChange={(e) => setEditingDailySpecial(prev => ({ ...prev, fiyat: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="450"
                  min="0"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ozelFiyat"
                  checked={editingDailySpecial.ozelFiyat}
                  onChange={(e) => setEditingDailySpecial(prev => ({ ...prev, ozelFiyat: e.target.checked }))}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="ozelFiyat" className="ml-2 block text-sm text-gray-700">
                  Özel Fiyat (Sarı etiket göster)
                </label>
              </div>
            </div>

            {/* Canlı Önizleme */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Canlı Önizleme</h3>
              
              {/* Hero altındaki küçük önizleme */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Ana Sayfa - Hero Altı</p>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30 bg-gradient-to-r from-red-600 to-red-700">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-sm font-semibold text-yellow-300 mb-1">🍽️ GÜNÜN YEMEĞİ</p>
                      <p className="text-white font-medium text-sm">{editingDailySpecial.isim || 'Yemek adı'}</p>
                    </div>
                    <div className="text-right">
                                              <p className="text-white font-bold text-lg">{editingDailySpecial.fiyat || '0'}₺</p>
                        {editingDailySpecial.ozelFiyat && (
                        <p className="text-yellow-300 text-xs font-semibold">ÖZEL FİYAT</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Büyük günün yemeği bölümü */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Ana Sayfa - Büyük Bölüm</p>
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-4 text-white text-center">
                  <h3 className="text-lg font-bold mb-2">🍽️ GÜNÜN YEMEĞİ</h3>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <h4 className="text-lg font-semibold mb-2">
                      {editingDailySpecial.isim || 'Yemek adı'}
                    </h4>
                    <p className="text-sm mb-3 opacity-90">
                      {editingDailySpecial.aciklama || 'Yemek açıklaması'}
                    </p>
                    <div className="flex justify-center items-center space-x-3">
                      <span className="text-xl font-bold">{editingDailySpecial.fiyat || '0'}₺</span>
                      {editingDailySpecial.ozelFiyat && (
                        <span className="bg-yellow-400 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Özel Fiyat
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FaUtensils className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Günün Yemeği</p>
                <p className="text-2xl font-semibold text-gray-900">{editingDailySpecial.isim || 'Ayarlanmamış'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaChartBar className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Fiyat</p>
                <p className="text-2xl font-semibold text-gray-900">{editingDailySpecial.fiyat || '0'}₺</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FaQrcode className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Durum</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {editingDailySpecial.ozelFiyat ? 'Özel Fiyat' : 'Normal Fiyat'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gelecek Özellikler */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Gelecek Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Menü Yönetimi</h3>
              <p className="text-blue-600 text-sm">Ürün ekleme, düzenleme, silme işlemleri</p>
              <div className="mt-2 text-xs text-blue-500">Yakında gelecek</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Analytics</h3>
              <p className="text-green-600 text-sm">Detaylı satış ve stok istatistikleri</p>
              <div className="mt-2 text-xs text-green-500">Yakında gelecek</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">QR Kod Yönetimi</h3>
              <p className="text-purple-600 text-sm">QR kod oluşturma ve yönetimi</p>
              <div className="mt-2 text-xs text-purple-500">Yakında gelecek</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 