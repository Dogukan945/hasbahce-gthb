'use client';

import { FaUtensils, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import MenuPreview from '@/components/MenuPreview';
import ContactSection from '@/components/ContactSection';
import { useDailySpecial } from '@/hooks/useDailySpecial';
import { CONTACT_CONSTANTS } from '@/lib/constants';
import HomeSkeleton from '@/components/HomeSkeleton';

export default function HomeContent() {
  const { dailySpecial, loading } = useDailySpecial();

  if (loading) {
    return <HomeSkeleton />;
  }

  const effectiveDailySpecial = dailySpecial || {
    isim: 'Günün Önerisi',
    aciklama: 'Mutfağımızdan taze bir öneri',
    fiyat: 0,
    ozelFiyat: false,
    aktif: true
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeroSection dailySpecial={effectiveDailySpecial} />

      {/* Öne Çıkan Özellikler - Mobil odaklı */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <FeatureCard
                icon={<FaUtensils className="text-white text-2xl md:text-3xl" />}
                title={CONTACT_CONSTANTS.FEATURES.TAZE_MALZEMELER.TITLE}
                description={CONTACT_CONSTANTS.FEATURES.TAZE_MALZEMELER.DESCRIPTION}
                linkText={CONTACT_CONSTANTS.FEATURES.TAZE_MALZEMELER.LINK_TEXT}
                linkHref={CONTACT_CONSTANTS.FEATURES.TAZE_MALZEMELER.LINK_HREF}
              />
            </div>
            <div>
              <FeatureCard
                icon={<FaMapMarkerAlt className="text-white text-2xl md:text-3xl" />}
                title={CONTACT_CONSTANTS.FEATURES.MERKEZI_KONUM.TITLE}
                description={CONTACT_CONSTANTS.FEATURES.MERKEZI_KONUM.DESCRIPTION}
                locationLink={CONTACT_CONSTANTS.FEATURES.MERKEZI_KONUM.LOCATION_LINK}
              />
            </div>
            <div>
              <FeatureCard
                icon={<FaPhone className="text-white text-2xl md:text-3xl" />}
                title={CONTACT_CONSTANTS.FEATURES.ILETISIM.TITLE}
                description={CONTACT_CONSTANTS.FEATURES.ILETISIM.DESCRIPTION}
                phoneNumber={CONTACT_CONSTANTS.FEATURES.ILETISIM.PHONE}
              />
            </div>
          </div>
        </div>
      </section>

      <MenuPreview dailySpecial={effectiveDailySpecial} />
      <ContactSection />
    </div>
  );
} 