import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/common/Preloader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://summit-luxury.vercel.app'),
  title: {
    default: "Summit | Luxury Real Estate",
    template: "%s | Summit Luxury"
  },
  description: "Curadoria exclusiva de imóveis de alto padrão. Encontre as mansões e coberturas mais sofisticadas do mercado brasileiro.",
  keywords: ["imóveis de luxo", "mansões", "coberturas", "alto padrão", "real estate brazil"],
  authors: [{ name: "Summit Team" }],
  creator: "Summit Luxury",
  publisher: "Summit Luxury",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/brand/favicon.png",
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://summit.com.br",
    siteName: "Summit Luxury Real Estate",
    title: "Summit | Luxury Real Estate",
    description: "Exclusividade e sofisticação em cada detalhe.",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Summit Luxury Real Estate",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <Preloader />
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
