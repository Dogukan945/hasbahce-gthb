"use client";
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/useToast';
import { useDailySpecialForm } from '@/hooks/useDailySpecialManagement';
import AdminLoginForm from '@/components/AdminLoginForm';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastNotifications from '@/components/admin/ToastNotifications';
import DailySpecialForm from '@/components/DailySpecialForm';
import DailySpecialPreview from '@/components/DailySpecialPreview';
import { INFO_MESSAGES, TOAST_TYPES, SUCCESS_MESSAGES } from '@/lib/constants';

export default function AdminPage() {
  // Hook'ları kullan
  const { toasts, addToast } = useToast();
  const { 
    isAuthenticated, 
    error, 
    isLoading, 
    login, 
    logout
  } = useAdminAuth();
  
  const {
    editingDailySpecial,
    isPreviewMode,
    setIsPreviewMode,
    hasUnsavedChanges,
    isDailySpecialUpdating,
    validationErrors,
    handleSaveDailySpecial,
    handleResetDailySpecial,
    handleFieldChange,
  } = useDailySpecialForm(isAuthenticated, addToast);

  // Çıkış yapma fonksiyonu - UI mantığı burada
  const onLogout = () => {
    if (hasUnsavedChanges) {
      if (confirm(INFO_MESSAGES.UNSAVED_CHANGES)) {
        logout();
        addToast(TOAST_TYPES.INFO, SUCCESS_MESSAGES.LOGOUT);
      }
    } else {
      logout();
      addToast(TOAST_TYPES.INFO, SUCCESS_MESSAGES.LOGOUT);
    }
  };

  // Önizleme toggle fonksiyonu
  const onTogglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // Şifreli giriş ekranı
  if (!isAuthenticated) {
    return (
      <AdminLoginForm
        onLogin={login}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  // Admin paneli ana ekranı (sadece Günün Yemeği)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      <ToastNotifications toasts={toasts} />

      {/* Header */}
      <AdminHeader
        isPreviewMode={isPreviewMode}
        onTogglePreview={onTogglePreview}
        onLogout={onLogout}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DailySpecialForm
            editingDailySpecial={editingDailySpecial}
            onFieldChange={handleFieldChange}
            onSave={handleSaveDailySpecial}
            onReset={handleResetDailySpecial}
            hasUnsavedChanges={hasUnsavedChanges}
            isUpdating={isDailySpecialUpdating}
            validationErrors={validationErrors}
          />
          <DailySpecialPreview editingDailySpecial={editingDailySpecial} />
        </div>
      </main>
    </div>
  );
} 