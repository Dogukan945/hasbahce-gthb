import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import { createPageMetadata } from '@/lib/metadata';
import dynamic from 'next/dynamic';
const Breadcrumbs = dynamic(() => import('@/components/Breadcrumbs'));

export const metadata = createPageMetadata({
  title: 'İletişim | Hasbahçe Amasya',
  description: 'Rezervasyon, toplu yemek ve özel gün organizasyonları için Hasbahçe ile iletişime geçin. Telefon, adres ve harita bilgileri burada!',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <head>
        <link rel="canonical" href="https://hasbahceamasya.com/contact" />
      </head>
      <Navbar />
      <Breadcrumbs items={[{ name: 'Ana Sayfa', href: '/' }, { name: 'İletişim', href: '/contact' }]} />
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center mb-10">
          <h1 className="heading-2 text-green-700 mb-4">İletişim</h1>
          <p className="body-text-large text-gray-700">
            Rezervasyon, toplu yemek talepleri ya da özel gün organizasyonları için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </section>
      <ContactSection />
      {/* Nasıl Gidilir? */}
      <section className="py-8 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="heading-3 text-green-700 mb-3">Nasıl Gidilir?</h3>
          <p className="body-text text-gray-700 mb-2">
            Bahçeleriçi Mahallesi, İltekin Gazi Parkı&apos;nda, pazar yerinin hemen yanında bulunmaktayız.
          </p>
          <p className="body-text text-gray-700 mb-6">
            <strong>Çalışma Saatlerimiz:</strong> Her gün sabah 08:00 - akşam 00:00 arası siz değerli müşterilerimizi ağırlamaktayız.
          </p>
          <a
            href="https://maps.app.goo.gl/iAEQMt22wNkRqKJ87"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 mt-2 hover:scale-105"
          >
            Adresi Haritada Aç
          </a>
        </div>
      </section>
    </>
  );
} 