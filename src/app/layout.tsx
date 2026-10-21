import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/header";
import { JsonLd } from "@/components/ui";
import { site } from "@/config/site";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Engine House Import Export — Maintenance et composants pour engins lourds",
    template: "%s | Engine House",
  },
  description:
    "Diagnostic, réparation et reconditionnement d’engins de chantier, moteurs diesel, pompes hydrauliques, transmissions et pièces de rechange pour le BTP, les mines et les carrières.",
  applicationName: site.legalName,
  openGraph: { siteName: site.legalName, locale: site.locale, type: "website" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <a
          href="#contenu"
          className="sr-only z-[100] bg-signal px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        <JsonLd data={organizationJsonLd()} />
        <SiteHeader />
        <main id="contenu" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
