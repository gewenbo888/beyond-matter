import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Inter, JetBrains_Mono, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

const zh = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-zh",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07070a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://beyond-matter.psyverse.fun"),
  title: "Beyond Matter — Reality is becoming structure | 超越物质",
  description:
    "A cinematic essay on the abstraction of reality — from earth and fire to fields, information, and pure structure. Bilingual EN · 中文.",
  keywords: [
    "philosophy of physics",
    "mathematical universe",
    "structural realism",
    "consciousness",
    "emergence",
    "information theory",
    "category theory",
    "ontology",
    "metaphysics",
    "超越物质",
    "数学宇宙",
    "结构实在论",
    "意识",
    "涌现",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/", "x-default": "/" },
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Beyond Matter · 超越物质" }],
    title: "Beyond Matter — Reality is becoming structure",
    description:
      "A cinematic essay on how human understanding has moved from objects to relations, fields, information, and pure structure.",
    url: "https://beyond-matter.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    images: ["/twitter-image.png"],
    card: "summary_large_image",
    title: "Beyond Matter — Reality is becoming structure",
    description: "Six models of reality, each less material than the last.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#07070a" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} ${zh.variable}`}>
      <body className="font-sans bg-ink text-ivory antialiased grain vignette">
        <Script
          src="https://analytics-dashboard-two-blue.vercel.app/tracker.js"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Beyond Matter — Reality is becoming structure",
              author: { "@type": "Person", name: "Gewenbo", url: "https://psyverse.fun" },
              publisher: { "@type": "Organization", name: "Psyverse", url: "https://psyverse.fun" },
              inLanguage: ["en", "zh-CN"],
              url: "https://beyond-matter.psyverse.fun/",
              about: [
                "structural realism",
                "philosophy of physics",
                "mathematical universe hypothesis",
                "consciousness",
                "emergence",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
