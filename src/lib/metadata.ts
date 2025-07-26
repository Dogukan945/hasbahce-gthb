import type { Metadata } from 'next';

const BASE_URL = "https://hasbahceamasya.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  openGraph: {
    siteName: "Hasbahçe",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/hasbahce-logo.png",
        width: 1200,
        height: 630,
        alt: "Hasbahçe Restoran Amasya - Geleneksel Türk Mutfağı"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/hasbahce-logo.png"]
  }
};

export function createPageMetadata({ 
  title, 
  description, 
  path 
}: { 
  title: string; 
  description: string; 
  path: string 
}): Metadata {
  return {
    ...defaultMetadata,
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `${BASE_URL}${path}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
  };
} 