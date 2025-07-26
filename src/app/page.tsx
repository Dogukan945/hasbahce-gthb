import HomeContent from '@/components/HomeContent';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: "Hasbahçe | Amasya Restoran & Cafe",
  description: "Amasya'da nehir kenarında aile dostu ortamda kahvaltı, pide, kebap ve geleneksel Türk yemekleri sunan Hasbahçe restoranın resmi web sitesi.",
  path: "/"
});

export default function Home() {
  return <HomeContent />;
}
