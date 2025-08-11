import MenuContent from '@/components/MenuContent';
import MenuJsonLd from '@/components/MenuJsonLd';
import { createPageMetadata } from '@/lib/metadata';
import dynamic from 'next/dynamic';
const Breadcrumbs = dynamic(() => import('@/components/Breadcrumbs'));

export const metadata = createPageMetadata({
  title: "Menü | Hasbahçe Amasya - Kahvaltı, Pide, Kebap, Tatlı Fiyatları",
  description: "Hasbahçe menüsü ve fiyatları: Kahvaltı, ana yemekler, pideler, tatlılar ve içecekler. Amasya'nın en lezzetli yemekleri uygun fiyatlarla!",
  path: "/menu"
});

export default function MenuPage() {
  return (
    <>
      <MenuJsonLd />
      <head>
        <link rel="canonical" href="https://hasbahceamasya.com/menu" />
      </head>
      <Breadcrumbs items={[
        { name: 'Ana Sayfa', href: '/' },
        { name: 'Menü', href: '/menu' }
      ]} />
      <MenuContent />
    </>
  );
} 