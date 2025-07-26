import { NextRequest, NextResponse } from 'next/server';

// !!! GÜVENLİK NOTU: Gerçek uygulamada şifre hash'lenmiş olmalı ve güvenli bir veritabanında saklanmalıdır.
// Bu implementasyon sadece demo amaçlıdır.

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Güvenli şifre (demo amaçlı)
    const correctPassword = 'h123';
    
    // Şifre kontrolü
    if (password === correctPassword) {
      return NextResponse.json({ 
        success: true, 
        message: 'Giriş başarılı' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Şifre yanlış' 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth API Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Sunucu hatası' 
    }, { status: 500 });
  }
}

// GET method için hata mesajı
export async function GET() {
  return NextResponse.json({ 
    success: false, 
    message: 'Bu endpoint sadece POST method destekler' 
  }, { status: 405 });
} 