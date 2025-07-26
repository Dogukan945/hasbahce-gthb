import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

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
  title: "Hasbahçe",
  description: "Hasbahçe, aile dostu bir lokanta olarak özenle hazırladığımız pide ve kebap çeşitlerimizle misafirlerimize samimi bir ortamda kaliteli lezzetler sunuyoruz.",
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
      </head>
      <body className={`${playfairDisplay.variable} ${inter.variable} font-sans antialiased`}>
        <JsonLd />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
