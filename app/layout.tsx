import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { siteConfig } from "@/lib/constants/site";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "passport photo maker",
    "2x2 photo",
    "passport photo requirements",
    "passport photo online",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${fraunces.variable} bg-background text-foreground antialiased`}
      >
        <AnalyticsScripts />
        <div className="relative min-h-screen overflow-hidden">
          <div className="site-aura" aria-hidden="true" />
          <div className="site-grid" aria-hidden="true" />
          <div className="relative min-h-screen">{children}</div>
        </div>
      </body>
    </html>
  );
}
