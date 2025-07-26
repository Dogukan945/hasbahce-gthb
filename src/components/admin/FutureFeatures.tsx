export default function FutureFeatures() {
  return (
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
  );
} 