import { FaUtensils, FaChartBar, FaList } from "react-icons/fa";

interface AdminStatsProps {
  dailySpecialName: string;
  dailySpecialPrice: string;
  categoriesCount: number;
  productsCount: number;
}

export default function AdminStats({ 
  dailySpecialName, 
  dailySpecialPrice, 
  categoriesCount, 
  productsCount 
}: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center">
          <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600">
            <FaUtensils className="text-lg sm:text-xl" />
          </div>
          <div className="ml-3 sm:ml-4">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Günün Yemeği</p>
            <p className="text-lg sm:text-2xl font-semibold text-gray-900 truncate">
              {dailySpecialName || 'Ayarlanmamış'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center">
          <div className="p-2 sm:p-3 rounded-full bg-green-100 text-green-600">
            <FaChartBar className="text-lg sm:text-xl" />
          </div>
          <div className="ml-3 sm:ml-4">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Fiyat</p>
            <p className="text-lg sm:text-2xl font-semibold text-gray-900">
              {dailySpecialPrice || '0'}₺
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center">
          <div className="p-2 sm:p-3 rounded-full bg-purple-100 text-purple-600">
            <FaList className="text-lg sm:text-xl" />
          </div>
          <div className="ml-3 sm:ml-4">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Kategoriler</p>
            <p className="text-lg sm:text-2xl font-semibold text-gray-900">{categoriesCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center">
          <div className="p-2 sm:p-3 rounded-full bg-orange-100 text-orange-600">
            <FaList className="text-lg sm:text-xl" />
          </div>
          <div className="ml-3 sm:ml-4">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Ürünler</p>
            <p className="text-lg sm:text-2xl font-semibold text-gray-900">{productsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 