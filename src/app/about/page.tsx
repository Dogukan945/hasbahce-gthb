import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import { createPageMetadata } from '@/lib/metadata';
import dynamic from 'next/dynamic';
const Breadcrumbs = dynamic(() => import('@/components/Breadcrumbs'));

export const metadata = createPageMetadata({
  title: "Hakkımızda | Hasbahçe Amasya",
  description: "Hasbahçe restoranın hikayesi, misyonu ve değerleri. Amasya'nın en sevilen restoranı hakkında bilgi alın!",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <head>
        <link rel="canonical" href="https://hasbahceamasya.com/about" />
      </head>
      <Breadcrumbs items={[{ name: 'Ana Sayfa', href: '/' }, { name: 'Hakkımızda', href: '/about' }]} />
      <Navbar />
      <AboutSection />
    </>
  );
} 