import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, DM_Serif_Display, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import ScrollProgress from "@/components/ScrollProgress";
import { site } from "@/content/site";
import "./globals.css";
import "./explorer.css";
import "./motion.css";
import "./week4.css";
import "./review.css";
import "./round6.css";
import "./v22.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["italic", "normal"], variable: "--font-dm-serif", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"], variable: "--font-grotesk", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "numarket — The data team you don't have to hire",
    template: "%s · numarket",
  },
  description:
    "numarket is the data team you don't have to hire. We pull your numbers into one private database, keep them clean, and give your team dashboards that update automatically and an analyst who tells you what to do next. One predictable monthly fee. You own your data.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "numarket",
    title: "numarket — Trust the Data.",
    description: "The data team you don't have to hire. Clean numbers, dashboards that update automatically, and clear next steps — for one predictable monthly fee.",
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
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
