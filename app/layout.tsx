import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, DM_Serif_Display, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/content/site";
import "./globals.css";
import "./explorer.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["italic", "normal"], variable: "--font-dm-serif", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"], variable: "--font-grotesk", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "numarket — Your data, cleaned up and working for you",
    template: "%s · numarket",
  },
  description:
    "numarket gets your business ready for AI. We gather your data from everywhere it lives, clean it, store it securely, and turn it into live apps, dashboards, and clear next steps — and you own all of it.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "numarket",
    title: "numarket — Trust the Data.",
    description: "Your data, cleaned up and working for you. Get ready for AI — without the headache.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} ${grotesk.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
