import Script from 'next/script';

export default function RestaurantJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Hasbahçe",
    "image": "https://hasbahceamasya.com/hasbahce-logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hasbahçe Sokak No:1, Örnek Mahallesi",
      "addressLocality": "Amasya",
      "addressCountry": "TR"
    },
    "telephone": "+90 358 213 05 93",
    "url": "https://hasbahceamasya.com",
    "servesCuisine": ["Türk Mutfağı", "Kebap", "Kahvaltı", "Pide"],
    "priceRange": "₺₺",
    "menu": "https://hasbahceamasya.com/menu",
    "openingHours": [
      "Mo-Su 08:00-00:00"
    ]
  };

  return (
    <Script
      id="restaurant-schema-layout"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 