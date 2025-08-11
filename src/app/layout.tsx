import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import WebsiteJsonLd from "@/components/WebsiteJsonLd";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ErrorBoundary from "@/components/ErrorBoundary";
import DeferredStyles from "@/components/DeferredStyles";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hasbahçe Amasya",
  description: "Amasya’da Irmak Kenarında Yemek Keyfi. Aile dostu ortamda kahvaltı, pide, kebap ve geleneksel Türk yemekleri.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://hasbahceamasya.com",
    siteName: "Hasbahçe",
    title: "Hasbahçe | Amasya’da Irmak Kenarında Yemek Keyfi",
    description: "Amasya’da Irmak Kenarında Yemek Keyfi. Aile dostu ortamda kahvaltı, pide, kebap ve geleneksel Türk yemekleri.",
    images: [
      {
        url: "https://hasbahceamasya.com/hasbahce-logo.png",
        width: 1200,
        height: 630,
        alt: "Hasbahçe Restoran Amasya",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@hasbahceamasya",
    creator: "@hasbahceamasya",
    title: "Hasbahçe | Amasya’da Irmak Kenarında Yemek Keyfi",
    description: "Amasya’da Irmak Kenarında Yemek Keyfi. Aile dostu ortamda kahvaltı, pide, kebap ve geleneksel Türk yemekleri.",
    images: ["https://hasbahceamasya.com/hasbahce-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* Favicon otomatik olarak src/app/favicon.ico'dan yüklenir */}
        <meta name="author" content="Hasbahçe Restoran" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="apple-mobile-web-app-title" content="Hasbahçe" />
        {/* Video preload kaldırıldı: LCP ağ yarışını azaltmak için */}
      </head>
      <body className={`${playfairDisplay.variable} ${inter.variable} font-sans antialiased`}>
        <DeferredStyles />
        <GoogleAnalytics />
        <WebsiteJsonLd />
        <JsonLd />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}

// Core Web Vitals raporlama
export function reportWebVitals(metric: {
  id: string;
  name: string;
  label: 'web-vital' | string;
  value: number;
}) {
  // GA varsa Web Vitals'ı event olarak gönder
  const w = typeof window !== 'undefined' ? (window as unknown as { gtag?: (...args: unknown[]) => void }) : undefined;
  if (w && typeof w.gtag === 'function') {
    w.gtag('event', metric.name, {
      value: metric.value,
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  } else {
    // Geliştirme sırasında konsola yaz
    if (process.env.NODE_ENV !== 'production') {
      console.log('[WebVitals]', metric.name, Math.round(metric.value), metric.id);
    }
  }
}
