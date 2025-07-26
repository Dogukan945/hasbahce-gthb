'use client';

import { FaUtensils, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import MenuPreview from '@/components/MenuPreview';
import ContactSection from '@/components/ContactSection';
import { useDailySpecial } from '@/hooks/useDailySpecial';
import { INFO_MESSAGES, ANIMATION_CONSTANTS, CONTACT_CONSTANTS } from '@/lib/constants';

export default function HomeContent() {
  const { dailySpecial, loading } = useDailySpecial();

  if (loading || !dailySpecial) {
    return <div className="min-h-screen flex items-center justify-center">{INFO_MESSAGES.LOADING}</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeroSection dailySpecial={dailySpecial} />

      {/* Öne Çıkan Özellikler - Mobil odaklı */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: ANIMATION_CONSTANTS.DURATION.SLOW, delay: ANIMATION_CONSTANTS.DELAY.SMALL }}
            >
              <FeatureCard
                icon={<FaUtensils className="text-white text-2xl md:text-3xl" />}
                title={CONTACT_CONSTANTS.FEATURES.TAZE_MALZEMELER.TITLE}
                description={CONTACT_CONSTANTS.FEATURES.TAZE_MALZEMELER.DESCRIPTION}
                linkText={CONTACT_CONSTANTS.FEATURES.TAZE_MALZEMELER.LINK_TEXT}
                linkHref={CONTACT_CONSTANTS.FEATURES.TAZE_MALZEMELER.LINK_HREF}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: ANIMATION_CONSTANTS.DURATION.SLOW, delay: ANIMATION_CONSTANTS.DELAY.MEDIUM }}
            >
              <FeatureCard
                icon={<FaMapMarkerAlt className="text-white text-2xl md:text-3xl" />}
                title={CONTACT_CONSTANTS.FEATURES.MERKEZI_KONUM.TITLE}
                description={CONTACT_CONSTANTS.FEATURES.MERKEZI_KONUM.DESCRIPTION}
                locationLink={CONTACT_CONSTANTS.FEATURES.MERKEZI_KONUM.LOCATION_LINK}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: ANIMATION_CONSTANTS.DURATION.SLOW, delay: ANIMATION_CONSTANTS.DELAY.LARGE }}
            >
              <FeatureCard
                icon={<FaPhone className="text-white text-2xl md:text-3xl" />}
                title={CONTACT_CONSTANTS.FEATURES.ILETISIM.TITLE}
                description={CONTACT_CONSTANTS.FEATURES.ILETISIM.DESCRIPTION}
                phoneNumber={CONTACT_CONSTANTS.FEATURES.ILETISIM.PHONE}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <MenuPreview dailySpecial={dailySpecial} />
      <ContactSection />
    </div>
  );
} 