import Script from 'next/script';

interface RestaurantSchemaProps {
  name?: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
  url?: string;
  openingHours?: string[];
  priceRange?: string;
  servesCuisine?: string[];
  hasMenu?: string;
  image?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
}

export default function JsonLd({
  name = "Hasbahçe",
  description = "Amasya'da Yeşilırmak kenarında aile dostu ortamda kahvaltı, pide, kebap ve geleneksel Türk yemekleri sunan restoran. Amasya'nın en iyi restoranı.",
  address = {
    streetAddress: "Yeşilırmak Mahallesi, Hasbahçe Sokak No:1",
    addressLocality: "Amasya",
    addressRegion: "Amasya",
    postalCode: "05000",
    addressCountry: "TR"
  },
  telephone = "+90 358 213 05 93",
  url = "https://hasbahceamasya.com",
  openingHours = [
    "Mo-Su 07:00-23:00"
  ],
  priceRange = "₺₺",
  servesCuisine = ["Turkish", "Kebab", "Pide", "Kahvaltı", "Izgara", "Tatlı"],
  hasMenu = "https://hasbahceamasya.com/menu",
  image = "https://hasbahceamasya.com/hasbahce-logo.png",
  geo = {
    latitude: 40.6499, // Amasya merkez koordinatları (yaklaşık)
    longitude: 35.8353
  }
}: RestaurantSchemaProps) {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": name,
    "description": description,
    "url": url,
    "telephone": telephone,
    "image": image,
    "priceRange": priceRange,
    "servesCuisine": servesCuisine,
    "hasMenu": hasMenu,
    "openingHours": openingHours,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "areaServed": {
      "@type": "City",
      "name": "Amasya"
    },
    "paymentAccepted": ["Cash", "Credit Card"],
    "currenciesAccepted": "TRY",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "WiFi",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "Parking",
        "value": true
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hasbahçe",
    "url": "https://hasbahceamasya.com",
    "description": "Amasya'da Yeşilırmak kenarında aile dostu ortamda kahvaltı, pide, kebap ve geleneksel Türk yemekleri sunan restoran.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "telephone": telephone,
    "sameAs": [
      "https://hasbahceamasya.com"
    ]
  };

  return (
    <>
      <Script
        id="restaurant-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
} 