'use client';

import { FaUtensils, FaSave } from 'react-icons/fa';

interface EditingDailySpecial {
  isim: string;
  aciklama: string;
  fiyat: string;
  ozelFiyat: boolean;
  aktif: boolean;
}

interface DailySpecialFormProps {
  editingDailySpecial: EditingDailySpecial;
  onFieldChange: (field: keyof EditingDailySpecial, value: string | boolean) => void;
  onSave: () => Promise<void>;
  onReset: () => void;
  hasUnsavedChanges: boolean;
  isUpdating: boolean;
  validationErrors?: Record<string, string>;
}

export default function DailySpecialForm({
  editingDailySpecial,
  onFieldChange,
  onSave,
  onReset,
  hasUnsavedChanges,
  isUpdating,
  validationErrors = {}
}: DailySpecialFormProps) {
  const getFieldError = (fieldName: string) => {
    return validationErrors[fieldName];
  };

  const getFieldClassName = (fieldName: string) => {
    const baseClass = "w-full p-3 border rounded-lg focus:ring-2 focus:border-red-500";
    return getFieldError(fieldName) 
      ? `${baseClass} border-red-500 focus:ring-red-500` 
      : `${baseClass} border-gray-300 focus:ring-red-500`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <FaUtensils className="mr-2 text-red-600" />
          Günün Yemeği Yönetimi
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={onReset}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm"
          >
            Varsayılana Sıfırla
          </button>
          <button
            onClick={onSave}
            disabled={!hasUnsavedChanges || isUpdating}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center ${
              hasUnsavedChanges && !isUpdating
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            <FaSave className="mr-2" />
            {isUpdating ? 'Kaydediliyor...' : 'Kaydet'}
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
              onChange={(e) => onFieldChange('isim', e.target.value)}
              className={getFieldClassName('isim')}
              placeholder="Örn: Kuzu Pirzola"
            />
            {getFieldError('isim') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('isim')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama *
            </label>
            <textarea
              value={editingDailySpecial.aciklama}
              onChange={(e) => onFieldChange('aciklama', e.target.value)}
              rows={3}
              className={getFieldClassName('aciklama')}
              placeholder="Yemeğin detaylı açıklaması..."
            />
            {getFieldError('aciklama') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('aciklama')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fiyat (₺) *
            </label>
            <input
              type="number"
              value={editingDailySpecial.fiyat}
              onChange={(e) => onFieldChange('fiyat', e.target.value)}
              className={getFieldClassName('fiyat')}
              placeholder="450"
              min="0"
            />
            {getFieldError('fiyat') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('fiyat')}</p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={editingDailySpecial.ozelFiyat}
                onChange={(e) => onFieldChange('ozelFiyat', e.target.checked)}
                className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Özel Fiyat</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={editingDailySpecial.aktif}
                onChange={(e) => onFieldChange('aktif', e.target.checked)}
                className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Aktif</span>
            </label>
          </div>
        </div>

        {/* Özet Bilgiler */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Özet Bilgiler</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600">Yemek Adı:</span>
              <p className="text-gray-800">{editingDailySpecial.isim || 'Belirtilmemiş'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Açıklama:</span>
              <p className="text-gray-800">{editingDailySpecial.aciklama || 'Belirtilmemiş'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Fiyat:</span>
              <p className="text-gray-800">{editingDailySpecial.fiyat ? `${editingDailySpecial.fiyat}₺` : 'Belirtilmemiş'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Durum:</span>
              <p className="text-gray-800">
                {editingDailySpecial.aktif ? 'Aktif' : 'Pasif'} 
                {editingDailySpecial.ozelFiyat && ' (Özel Fiyat)'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 