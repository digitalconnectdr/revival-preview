import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedPage, localizedPageMetadata } from "@/components/localized-page";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

const fixedPaths = [
  "",
  "about",
  "accessibility",
  "book",
  "contact",
  "corporate",
  "faq",
  "fleet",
  "insights",
  "privacy-policy",
  "reviews",
  "ride-terms",
  "service-areas",
  "services",
  "terms-of-service",
] as const;

const serviceSlugs = ["airport-transfers", "executive-transportation", "hourly-chauffeur", "city-to-city", "port-canaveral-transfers", "in-city-rides", "events-group-transportation"] as const;
const routeSlugs = ["mco-to-port-canaveral", "mco-to-disney-world", "the-villages-to-mco"] as const;
const airportSlugs = ["mco", "sfb"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales
    .filter((locale) => locale !== "en")
    .flatMap((locale) => [
      ...fixedPaths.map((path) => ({ locale, segments: path ? path.split("/") : [] })),
      ...serviceSlugs.map((slug) => ({ locale, segments: ["services", slug] })),
      ...routeSlugs.map((slug) => ({ locale, segments: ["routes", slug] })),
      ...airportSlugs.map((slug) => ({ locale, segments: ["airports", slug] })),
    ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; segments?: string[] }> }): Promise<Metadata> {
  const { locale: rawLocale, segments = [] } = await params;
  if (!isLocale(rawLocale) || rawLocale === "en") return {};
  const metadata = localizedPageMetadata(rawLocale, segments);
  return metadata ? pageMetadata(metadata.title, metadata.description, metadata.path, rawLocale) : {};
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string; segments?: string[] }> }) {
  const { locale: rawLocale, segments = [] } = await params;
  if (!isLocale(rawLocale) || rawLocale === "en") notFound();
  return <LocalizedPage locale={rawLocale as Exclude<Locale, "en">} segments={segments} />;
}
