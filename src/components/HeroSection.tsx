'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaUtensils } from 'react-icons/fa';
import Navbar from './Navbar';
import dynamic from 'next/dynamic';
const MobileQuickActions = dynamic(() => import('@/components/MobileQuickActions'), { ssr: false });
import { useState, useRef, useEffect } from 'react';
import type { DailySpecial } from '@/lib/types';

interface HeroSectionProps {
  dailySpecial: DailySpecial;
}

export default function HeroSection({ dailySpecial }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [selectedSrc, setSelectedSrc] = useState<string>("/hero-video.mp4");
  const [playEnabled, setPlayEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Data saver / reduced data kontrolü
    type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };
    const nav = typeof navigator !== 'undefined' ? (navigator as NavigatorWithConnection) : undefined;
    const saveData = !!(nav && nav.connection && nav.connection.saveData);
    const prefersReducedData = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-data: reduce)').matches
      : false;
    if (saveData || prefersReducedData) {
      setPlayEnabled(false);
      return; // sadece poster gösterilecek
    }

    // Ekran genişliğine göre kaynak seçimi
    const width = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const candidates: string[] = width <= 640
      ? ['/hero-video-480p.mp4', '/hero-video.mp4']
      : width <= 1024
        ? ['/hero-video-720p.mp4', '/hero-video.mp4']
        : ['/hero-video.mp4'];

    const pickFirstAvailable = async () => {
      for (const src of candidates) {
        try {
          // HEAD ile var mı kontrol et
          const res = await fetch(src, { method: 'HEAD' });
          if (res.ok) {
            setSelectedSrc(src);
            break;
          }
        } catch {
          // yoksay
        }
      }
    };
    pickFirstAvailable();

    // Düşük güç / otomatik oynatma engellerine karşı kullanıcı etkileşiminden sonra başlat
    const tryPlay = () => {
      if (!videoRef.current) return;
      const playPromise = videoRef.current.play();
      if (playPromise && typeof (playPromise as Promise<void>).then === 'function') {
        (playPromise as Promise<void>).catch(() => {/* sessizce yut */});
      }
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('click', tryPlay);
    };
    tryPlay();
    window.addEventListener('touchstart', tryPlay, { passive: true } as AddEventListenerOptions);
    window.addEventListener('click', tryPlay, { passive: true } as AddEventListenerOptions);
    return () => {
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('click', tryPlay);
    };
  }, []);

  return (
    <>
      <Navbar />
      {/* Hero Section - Video Arka Plan ile */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden text-center px-4 pt-8 pb-20">
        {/* Video preload (layout.tsx head içinde global de yapılabilir) */}
        <link rel="preload" as="video" href="/hero-video.mp4" />
        {/* Video Arka Plan */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay={playEnabled}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onLoadedData={() => setVideoLoaded(true)}
            style={{ opacity: videoLoaded ? 1 : 0 }}
            preload={playEnabled ? 'auto' : 'none'}
            poster="/hasbahce-logo.png"
          >
            <source src={selectedSrc} type="video/mp4" />
          </video>
          {/* Video yüklenemezse veya mobilde fallback gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-600/80 via-red-700/60 to-red-800/80"></div>
        </div>

        {/* İçerik */}
        <div className="flex flex-col items-center z-10 w-full relative">
          <Image 
            src="/hasbahce-logo.png" 
            alt="Hasbahçe Restoran Amasya - Geleneksel Türk Mutfağı" 
            width={200} 
            height={200} 
            className="object-contain mb-6 md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px] drop-shadow-2xl" 
            priority 
          />
          <p className="body-text-large md:text-xl lg:text-2xl mb-6 font-light max-w-2xl mx-auto leading-relaxed text-white/95 drop-shadow-lg">
            15 yıllık tecrübe, her damak zevkine hitap eden tatlar, güvenli ortam: Ailece keyifli vakit geçirebileceğiniz bir buluşma noktası.
          </p>
          <div className="flex justify-center mb-8">
            <Link 
              href="/menu" 
              className="btn-accent text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 flex items-center text-center shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
            >
              <FaUtensils className="mr-3 text-xl md:text-2xl" />
              Menüyü Görüntüle
            </Link>
          </div>

          {/* Günün Yemeği Kutucuğu - Geliştirilmiş */}
          <div className="w-full flex justify-center mb-8">
            <div className="bg-white/25 backdrop-blur-md rounded-xl p-6 border border-white/40 max-w-md w-full shadow-2xl hover:shadow-white/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-semibold text-yellow-300 mb-1 drop-shadow-sm">GÜNÜN YEMEĞİ</p>
                  <p className="text-white font-medium text-base drop-shadow-sm">{dailySpecial.isim}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-xl drop-shadow-sm">{dailySpecial.fiyat}₺</p>
                  {dailySpecial.ozelFiyat && (
                    <p className="text-yellow-300 text-xs font-semibold drop-shadow-sm">ÖZEL FİYAT</p>
                  )}
                </div>
              </div>
              {dailySpecial.aciklama && (
                <p className="text-white/95 text-sm mt-2 drop-shadow-sm">{dailySpecial.aciklama}</p>
              )}
            </div>
          </div>

        </div>
        
      </section>
      <MobileQuickActions />
    </>
  );
} 