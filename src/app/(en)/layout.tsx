import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "@/app/globals.css";
import { CookieConsent, GoogleTag } from "@/components/google-tag";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { TrackedContactLink } from "@/components/tracked-contact-link";
import { business } from "@/content/business";
import { services } from "@/content/data";
import { localizedAlternates } from "@/i18n/config";
import { businessSchema } from "@/lib/seo";
import { absoluteUrl, isReviewEnvironment, siteUrl } from "@/lib/site";

// Root layout for the canonical English routes.

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const preferenceBootstrap = `(()=>{try{const root=document.documentElement;root.dataset.language="en";const theme=localStorage.getItem("revival-theme");if(theme==="light"||theme==="dark")root.dataset.theme=theme;}catch{}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Private Car Service in Central Florida", template: "%s | Revival Transportation Group" },
  description: "Private transportation for airport, corporate, cruise and city-to-city travel across Central Florida, including MCO, SFB and Port Canaveral.",
  alternates: { canonical: "/", ...localizedAlternates("/") },
  robots: isReviewEnvironment ? { index: false, follow: false } : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  applicationName: "Revival Transportation Group",
  category: "Private transportation",
  openGraph: { type: "website", url: absoluteUrl("/"), siteName: "Revival Transportation Group", locale: "en_US", title: "Private Car Service in Central Florida | Revival Transportation Group", description: "Private transportation for airport, corporate, cruise and city-to-city travel across Central Florida." },
  twitter: { card: "summary", title: "Private Car Service in Central Florida | Revival Transportation Group", description: "Private transportation for airport, corporate, cruise and city-to-city travel across Central Florida." },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html className={`${sans.variable} ${serif.variable}`} lang="en-US" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: preferenceBootstrap }} /></head><body><GoogleTag /><JsonLd data={businessSchema(services)} /><a className="skip-link" href="#main-content">Skip to content</a><Header locale="en" /><main id="main-content">{children}</main><Footer locale="en" /><CookieConsent locale="en" /><TrackedContactLink channel="phone" className="floating-call" href={`tel:${business.phone.value?.replace(/[^+\d]/g, "")}`} placement="floating-call"><span aria-hidden="true">✦</span> Call</TrackedContactLink></body></html>;
}
