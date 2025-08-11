import Link from 'next/link';
import Script from 'next/script';

interface CrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: CrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://hasbahceamasya.com${item.href}`,
    })),
  };

  return (
    <nav aria-label="breadcrumb" className="px-4 py-2 text-sm text-gray-600">
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, idx) => (
          <li key={item.href} className="flex items-center gap-2">
            {idx > 0 && <span className="text-gray-400">/</span>}
            <Link href={item.href} className="hover:text-red-700">
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
      <Script id="breadcrumbs-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </nav>
  );
}


