import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "@/app/globals.css";
import { CookieConsent, GoogleTag } from "@/components/google-tag";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { TrackedContactLink } from "@/components/tracked-contact-link";
import { business } from "@/content/business";
import { getLocalizedServices } from "@/i18n/content";
import { isLocale, localeMetadata, locales, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";
import { absoluteUrl, isReviewEnvironment, siteUrl } from "@/lib/site";
import { businessSchema } from "@/lib/seo";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const preferenceBootstrap = `(()=>{try{const root=document.documentElement;const theme=localStorage.getItem("revival-theme");if(theme==="light"||theme==="dark")root.dataset.theme=theme;}catch{}})();`;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.filter((locale) => locale !== "en").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const meta = localeMetadata[locale];
  const descriptions = {
    es: "Transporte privado para aeropuerto, viajes corporativos, cruceros y traslados entre ciudades en Florida Central.",
    pt: "Transporte privativo para aeroporto, viagens corporativas, cruzeiros e deslocamentos entre cidades na Flórida Central.",
    en: "Private transportation for airport, corporate, cruise and city-to-city travel across Central Florida.",
  };
  return {
    metadataBase: new URL(siteUrl),
    title: { default: "Revival Transportation Group", template: "%s | Revival Transportation Group" },
    description: descriptions[locale],
    robots: isReviewEnvironment ? { index: false, follow: false } : { index: true, follow: true },
    applicationName: "Revival Transportation Group",
    openGraph: { type: "website", url: absoluteUrl(`/${locale}`), siteName: "Revival Transportation Group", locale: meta.ogLocale, title: "Revival Transportation Group", description: descriptions[locale] },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale) || rawLocale === "en") notFound();
  const locale = rawLocale;
  const copy = getUi(locale);
  const phone = business.phone.value?.replace(/[^+\d]/g, "") ?? "";

  return <html className={`${sans.variable} ${serif.variable}`} lang={localeMetadata[locale].htmlLang} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: preferenceBootstrap }} /></head><body><GoogleTag /><JsonLd data={businessSchema(getLocalizedServices(locale), locale)} /><a className="skip-link" href="#main-content">{locale === "es" ? "Ir al contenido" : "Ir para o conteúdo"}</a><Header locale={locale} /><main id="main-content">{children}</main><Footer locale={locale} /><CookieConsent locale={locale} /><TrackedContactLink channel="phone" className="floating-call" href={`tel:${phone}`} placement="floating-call"><span aria-hidden="true">✦</span> {copy.call}</TrackedContactLink></body></html>;
}
