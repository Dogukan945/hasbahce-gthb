import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import RestaurantJsonLd from "@/components/RestaurantJsonLd";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  description: "Hasbahçe, aile dostu bir lokanta olarak özenle hazırladığımız pide ve kebap çeşitlerimizle misafirlerimize samimi bir ortamda kaliteli lezzetler sunuyoruz.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://hasbahceamasya.com",
    siteName: "Hasbahçe",
    title: "Hasbahçe | Amasya'nın En İyi Restoranı",
    description: "Amasya'da Yeşilırmak kenarında aile dostu ortamda kahvaltı, pide, kebap ve geleneksel Türk yemekleri.",
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
    title: "Hasbahçe | Amasya'nın En İyi Restoranı",
    description: "Amasya'da Yeşilırmak kenarında aile dostu ortamda kahvaltı, pide, kebap ve geleneksel Türk yemekleri.",
    images: ["https://hasbahceamasya.com/hasbahce-logo.png"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* Favicon otomatik olarak app/favicon.ico'dan yüklenir */}
        <link rel="canonical" href="https://hasbahceamasya.com" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Hasbahçe Restoran" />
        <meta name="theme-color" content="#16a34a" />
      </head>
      <body className={`${playfairDisplay.variable} ${inter.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <JsonLd />
        <RestaurantJsonLd />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
