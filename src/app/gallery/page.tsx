import Navbar from '@/components/Navbar';
import GalleryContent from '@/components/GalleryContent';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: "Görseller | Hasbahçe Amasya",
  description: "Hasbahçe restoranın Amasya'daki mekanından ve yemeklerinden fotoğraflar. Galerimizi inceleyin!",
  path: "/gallery"
});

export default function GalleryPage() {
  return (
    <>
      <head>
        <link rel="canonical" href="https://hasbahceamasya.com/gallery" />
      </head>
      <Navbar />
      <GalleryContent />
    </>
  );
} 