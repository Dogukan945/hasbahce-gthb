import Script from 'next/script';

export default function FAQJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Çalışma saatleriniz nedir?",
        "acceptedAnswer": { "@type": "Answer", "text": "Her gün 07:00 - 23:00 arası hizmet veriyoruz." }
      },
      {
        "@type": "Question",
        "name": "Rezervasyon gerekiyor mu?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yoğun saatlerde önerilir. Telefonla hızlıca rezervasyon yapabilirsiniz: +90 358 213 05 93." }
      },
      {
        "@type": "Question",
        "name": "Konumunuz nerede?",
        "acceptedAnswer": { "@type": "Answer", "text": "Amasya, Yeşilırmak kenarında, pazar yerinin hemen yanındayız. Harita bağlantısı menüde mevcut." }
      }
    ]
  };
  return (
    <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}


