import Script from 'next/script';
import { menuCategories, categoryList } from '@/data/menuData';

function normalizePriceToNumber(price: string): string {
  // "350 TL", "350₺", "+10 TL" gibi değerleri sadece sayı olarak döndür
  const cleaned = price.replace(/[^0-9.,]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? String(num) : '0';
}

export default function MenuJsonLd() {
  const sections = categoryList.map((key) => {
    const cat = menuCategories[key as keyof typeof menuCategories];
    return {
      '@type': 'MenuSection',
      name: cat.name,
      hasMenuItem: cat.items
        .filter((it) => /\d/.test(it.price))
        .map((it) => ({
          '@type': 'MenuItem',
          name: it.name,
          offers: {
            '@type': 'Offer',
            price: normalizePriceToNumber(it.price),
            priceCurrency: 'TRY',
          },
        })),
    };
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: 'Hasbahçe',
    hasMenu: {
      '@type': 'Menu',
      url: 'https://hasbahceamasya.com/menu',
      hasMenuSection: sections,
    },
  };

  return (
    <Script id="menu-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}