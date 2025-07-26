import Script from 'next/script';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: string;
}

interface MenuSchemaProps {
  restaurantName?: string;
  menuUrl?: string;
  menuItems?: MenuItem[];
}

export default function MenuJsonLd({
  restaurantName = "Hasbahçe",
  menuUrl = "https://hasbahceamasya.com/menu",
  menuItems = [
    {
      name: "Serpme Kahvaltı",
      description: "Zengin kahvaltı tabağı",
      price: "350₺",
      category: "Kahvaltı"
    },
    {
      name: "Adana Kebap",
      description: "Geleneksel Adana kebap",
      price: "320₺",
      category: "Ana Yemek"
    },
    {
      name: "Karışık Pide",
      description: "Çeşitli malzemelerle",
      price: "180₺",
      category: "Pide"
    },
    {
      name: "Künefe",
      description: "Geleneksel künefe",
      price: "180₺",
      category: "Tatlı"
    }
  ]
}: MenuSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": restaurantName,
    "hasMenu": {
      "@type": "Menu",
      "url": menuUrl,
      "hasMenuSection": [
        {
          "@type": "MenuSection",
          "name": "Kahvaltı Çeşitleri",
          "hasMenuItem": menuItems
            .filter(item => item.category === "Kahvaltı")
            .map(item => ({
              "@type": "MenuItem",
              "name": item.name,
              "description": item.description,
              "offers": {
                "@type": "Offer",
                "price": item.price.replace('₺', ''),
                "priceCurrency": "TRY"
              }
            }))
        },
        {
          "@type": "MenuSection",
          "name": "Ana Yemekler",
          "hasMenuItem": menuItems
            .filter(item => item.category === "Ana Yemek")
            .map(item => ({
              "@type": "MenuItem",
              "name": item.name,
              "description": item.description,
              "offers": {
                "@type": "Offer",
                "price": item.price.replace('₺', ''),
                "priceCurrency": "TRY"
              }
            }))
        },
        {
          "@type": "MenuSection",
          "name": "Pideler",
          "hasMenuItem": menuItems
            .filter(item => item.category === "Pide")
            .map(item => ({
              "@type": "MenuItem",
              "name": item.name,
              "description": item.description,
              "offers": {
                "@type": "Offer",
                "price": item.price.replace('₺', ''),
                "priceCurrency": "TRY"
              }
            }))
        },
        {
          "@type": "MenuSection",
          "name": "Tatlılar",
          "hasMenuItem": menuItems
            .filter(item => item.category === "Tatlı")
            .map(item => ({
              "@type": "MenuItem",
              "name": item.name,
              "description": item.description,
              "offers": {
                "@type": "Offer",
                "price": item.price.replace('₺', ''),
                "priceCurrency": "TRY"
              }
            }))
        }
      ]
    }
  };

  return (
    <Script
      id="menu-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 