import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: "Hakkımızda | Hasbahçe Amasya",
  description: "Hasbahçe restoranın hikayesi, misyonu ve değerleri. Amasya'nın en sevilen restoranı hakkında bilgi alın!",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutSection />
    </>
  );
} 