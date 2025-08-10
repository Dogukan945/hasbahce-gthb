"use client";
import { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/useToast';
import { useDailySpecialForm } from '@/hooks/useDailySpecialManagement';
import AdminLoginForm from '@/components/AdminLoginForm';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastNotifications from '@/components/admin/ToastNotifications';
import DailySpecialForm from '@/components/DailySpecialForm';
import DailySpecialPreview from '@/components/DailySpecialPreview';
import MenuPriceManager from '@/components/admin/MenuPriceManager';
import { INFO_MESSAGES, TOAST_TYPES, SUCCESS_MESSAGES, TAB_NAMES } from '@/lib/constants';
import type { TabType } from '@/lib/types';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>(TAB_NAMES.DAILY_SPECIAL);
  
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
    isLoading: isDailySpecialLoading,
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

  // Tab değiştirme fonksiyonu
  const handleTabChange = (tab: TabType) => {
    if (hasUnsavedChanges) {
      if (confirm(INFO_MESSAGES.UNSAVED_CHANGES)) {
        setActiveTab(tab);
      }
    } else {
      setActiveTab(tab);
    }
  };

  // Şifreli giriş ekranı
  if (!isAuthenticated) {
    return (
      <>
        <head>
          <meta name="robots" content="noindex, nofollow" />
        </head>
        <AdminLoginForm
          onLogin={login}
          isLoading={isLoading}
          error={error}
        />
      </>
    );
  }

  // Tab listesi
  const tabs = [
    { id: TAB_NAMES.DAILY_SPECIAL, label: 'Günün Yemeği' },
    { id: TAB_NAMES.MENU_PRICES, label: 'Menü Fiyatları' },
  ];

  // Tab içeriği render fonksiyonu
  const renderTabContent = () => {
    switch (activeTab) {
      case TAB_NAMES.DAILY_SPECIAL:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DailySpecialForm
              editingDailySpecial={editingDailySpecial}
              onFieldChange={handleFieldChange}
              onSave={handleSaveDailySpecial}
              onReset={handleResetDailySpecial}
              hasUnsavedChanges={hasUnsavedChanges}
              isUpdating={isDailySpecialUpdating}
              isLoading={isDailySpecialLoading}
              validationErrors={validationErrors}
            />
            <DailySpecialPreview editingDailySpecial={editingDailySpecial} />
          </div>
        );
      
      case TAB_NAMES.MENU_PRICES:
        return <MenuPriceManager />;
      
      default:
        return null;
    }
  };

  // Admin paneli ana ekranı
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
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </main>
    </div>
  );
} 