import Script from 'next/script';

export default function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hasbahçe",
    "url": "https://hasbahceamasya.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://hasbahceamasya.com/menu?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


