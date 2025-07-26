import Link from "next/link";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

interface AdminHeaderProps {
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  onLogout: () => void;
}

export default function AdminHeader({ isPreviewMode, onTogglePreview, onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <Link href="/" className="flex items-center text-red-600 hover:text-red-700">
            <FaArrowLeft className="mr-2" /> Ana Sayfaya Dön
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">Hasbahçe Yönetim Paneli</h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onTogglePreview}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold flex items-center text-sm sm:text-base ${
                isPreviewMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {isPreviewMode ? <FaEyeSlash className="mr-1 sm:mr-2" /> : <FaEye className="mr-1 sm:mr-2" />}
              <span className="hidden sm:inline">{isPreviewMode ? 'Önizlemeyi Kapat' : 'Önizleme'}</span>
              <span className="sm:hidden">Önizleme</span>
            </button>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 text-sm sm:text-base"
            >
              Çıkış
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 