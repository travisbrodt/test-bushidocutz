import type { Metadata, Viewport } from "next";
import { Inter, Shippori_Mincho } from "next/font/google";
import type { CSSProperties } from "react";
import "./globals.css";
import { site } from "@/config/site";
import { asset } from "@/lib/asset";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/ui/StickyMobileBar";
import { AppProvider } from "@/components/providers/AppProvider";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

const body = Inter({ variable: "--font-body", subsets: ["latin"] });

const heading = Shippori_Mincho({
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  fallback: ["Hiragino Mincho ProN", "Yu Mincho", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.seo.url),
  title: { default: site.seo.title, template: `%s | ${site.brand.shortName}` },
  description: site.seo.description,
  openGraph: {
    type: "website",
    siteName: site.brand.name,
    title: site.seo.title,
    description: site.seo.description,
    images: [{ url: asset(site.seo.ogImage), width: 1200, height: 630, alt: site.brand.name }],
  },
  icons: { icon: asset(site.brand.mark.src) },
};

export const viewport: Viewport = {
  themeColor: site.brand.theme.ink,
};

const themeVars = {
  "--ink": site.brand.theme.ink,
  "--paper": site.brand.theme.paper,
  "--accent": site.brand.theme.accent,
  "--stone": site.brand.theme.stone,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" style={themeVars} className={`${body.variable} ${heading.variable} antialiased`}>
      <body className="min-h-svh flex flex-col">
        <AppProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <StickyMobileBar />
        </AppProvider>
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
