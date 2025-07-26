interface EditingDailySpecial {
  isim: string;
  aciklama: string;
  fiyat: string;
  ozelFiyat: boolean;
  aktif: boolean;
}

interface DailySpecialPreviewProps {
  editingDailySpecial: EditingDailySpecial;
}

export default function DailySpecialPreview({ editingDailySpecial }: DailySpecialPreviewProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Canlı Önizleme</h3>
      
      {/* Hero altındaki küçük önizleme */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Ana Sayfa - Hero Altı</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30 bg-gradient-to-r from-red-600 to-red-700">
          <div className="flex items-center justify-between">
            <div className="text-left">
                              <p className="text-sm font-semibold text-yellow-300 mb-1">GÜNÜN YEMEĞİ</p>
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
                      <h3 className="text-lg font-bold mb-2">GÜNÜN YEMEĞİ</h3>
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
  );
} 