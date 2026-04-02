import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "1 Dilek Tırnak | Güzellik & Bakım Stüdyosu · İstanbul",
  description:
    "İstanbul'da profesyonel tırnak bakımı, makyaj ve cilt bakımı hizmetleri. Protez tırnak, jel tırnak, kalıcı makyaj, cilt bakımı ve daha fazlası. Online randevu alın.",
  keywords: [
    "tırnak bakımı",
    "protez tırnak",
    "jel tırnak",
    "nail art",
    "kalıcı makyaj",
    "cilt bakımı",
    "İstanbul güzellik salonu",
    "manikür",
    "pedikür",
    "gelin makyajı",
  ],
  openGraph: {
    title: "1 Dilek Tırnak | Güzellik & Bakım Stüdyosu",
    description:
      "İstanbul'da profesyonel tırnak bakımı, makyaj ve cilt bakımı hizmetleri.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              name: "1 Dilek Tırnak",
              description:
                "İstanbul'da profesyonel tırnak bakımı, makyaj ve cilt bakımı hizmetleri.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "İstanbul",
                addressCountry: "TR",
              },
              openingHours: ["Mo-Sa 09:00-20:00"],
              priceRange: "₺₺",
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
