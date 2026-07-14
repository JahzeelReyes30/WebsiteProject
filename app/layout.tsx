import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BookingModalProvider } from "@/components/BookingModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://website-project-theta-eight.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MajinCleaningSolutions | Healthcare-Inspired Cleaning in Long Island, NY",
  description:
    "MajinCleaningSolutions offers healthcare-inspired home and office cleaning across Long Island, NY, backed by real hospital environmental services experience. Flat-rate $200 service. Get a free quote today.",
  openGraph: {
    title: "MajinCleaningSolutions | Healthcare-Inspired Cleaning in Long Island, NY",
    description:
      "Healthcare-inspired home and office cleaning across Long Island, NY. Flat-rate $200 service.",
    url: siteUrl,
    siteName: "MajinCleaningSolutions",
    images: [{ url: "/images/logo.png" }],
    locale: "en_US",
    type: "website",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MajinCleaningSolutions",
  description:
    "Healthcare-inspired home and office cleaning across Long Island, NY. Flat-rate $200 service.",
  url: siteUrl,
  image: `${siteUrl}/images/logo.png`,
  priceRange: "$200",
  areaServed: {
    "@type": "Place",
    name: "Long Island, NY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <BookingModalProvider>{children}</BookingModalProvider>
      </body>
    </html>
  );
}
