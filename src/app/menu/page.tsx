import MenuContent from '@/components/MenuContent';
import MenuJsonLd from '@/components/MenuJsonLd';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: "Menü | Hasbahçe Amasya",
  description: "Hasbahçe menüsü: Kahvaltı, ana yemekler, pideler, tatlılar ve içecekler. Amasya'nın en lezzetli yemekleri burada!",
  path: "/menu"
});

export default function MenuPage() {
  return (
    <>
      <MenuJsonLd />
      <MenuContent />
    </>
  );
} 