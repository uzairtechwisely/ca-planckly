import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { CookieBanner } from "@/components/CookieBanner";

const headingFont = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Planckly California",
  description: "Join Planckly in California. Free to start.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientProviders>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          {children}
          <CookieBanner />
        </ClientProviders>
      </body>
    </html>
  );
}
