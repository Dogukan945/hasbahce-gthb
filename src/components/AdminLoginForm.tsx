'use client';

import { useState } from 'react';

interface AdminLoginFormProps {
  onLogin: (password: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function AdminLoginForm({ onLogin, isLoading, error }: AdminLoginFormProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Yönetici Girişi</h2>
        <label className="block mb-2 font-medium">Şifre</label>
        <input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-red-500"
          disabled={isLoading}
          autoFocus
        />
        {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-60"
          disabled={isLoading}
        >
          {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
} 