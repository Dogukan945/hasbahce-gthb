import HomeContent from '@/components/HomeContent';
import { createPageMetadata } from '@/lib/metadata';
import dynamic from 'next/dynamic';
const FAQSection = dynamic(() => import('@/components/FAQSection'));
const FAQJsonLd = dynamic(() => import('@/components/FAQJsonLd'));

export const metadata = createPageMetadata({
  title: "Hasbahçe | Amasya'nın En İyi Restoranı - Kahvaltı, Pide, Kebap",
  description: "Amasya'da Yeşilırmak kenarında aile dostu ortamda kahvaltı, pide, kebap, ızgara ve geleneksel Türk yemekleri. Amasya'nın en iyi restoranı Hasbahçe'de rezervasyon yapın.",
  path: "/"
});

export default function Home() {
  return (
    <>
      <HomeContent />
      <FAQJsonLd />
      <FAQSection />
    </>
  );
}
