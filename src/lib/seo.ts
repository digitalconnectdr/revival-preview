import type { Metadata } from "next";
import type { Service } from "@/content/data";
import { business } from "@/content/business";
import { localeMetadata, localizedAlternates, localizedPath, type Locale } from "@/i18n/config";
import { absoluteUrl } from "@/lib/site";

const brandName = business.brandName.value ?? "Revival Transportation Group";
const organizationId = absoluteUrl("/#organization");
const businessId = absoluteUrl("/#transportation-service");

type BreadcrumbItem = { label: string; href?: string };
type FaqItem = { question: string; answer: string };

export function pageMetadata(title: string, description: string, path: string, locale: Locale = "en"): Metadata {
  const localizedUrlPath = localizedPath(locale, path);
  const url = absoluteUrl(localizedUrlPath);
  const fullTitle = `${title} | ${brandName}`;

  return {
    title,
    description,
    alternates: { canonical: localizedUrlPath, ...localizedAlternates(path) },
    openGraph: { type: "website", url, siteName: brandName, title: fullTitle, description, locale: localeMetadata[locale].ogLocale },
    twitter: { card: "summary", title: fullTitle, description },
  };
}

export function businessSchema(services: Service[], locale: Locale = "en") {
  const language = localeMetadata[locale].label;
  const socialProfiles = (business.socialProfiles.value ?? []).filter((profile) => profile.verified).map((profile) => profile.url);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: brandName,
        url: absoluteUrl(localizedPath(locale, "/")),
        telephone: business.phone.value,
        email: business.email.value,
        sameAs: socialProfiles,
        contactPoint: [{ "@type": "ContactPoint", telephone: business.phone.value, contactType: "customer service", availableLanguage: [language] }],
        areaServed: [
          { "@type": "AdministrativeArea", name: "Central Florida" },
          { "@type": "Airport", name: "Orlando International Airport", iataCode: "MCO" },
          { "@type": "Airport", name: "Orlando Sanford International Airport", iataCode: "SFB" },
          { "@type": "Place", name: "Port Canaveral" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Private transportation services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.name, description: service.summary, url: absoluteUrl(localizedPath(locale, `/services/${service.slug}`)) },
          })),
        },
      },
      {
        "@type": "Service",
        "@id": businessId,
        name: "Private transportation in Central Florida",
        serviceType: "Private transportation",
        description: "Private transportation for airport, corporate, cruise and city-to-city travel across Central Florida.",
        provider: { "@id": organizationId },
        areaServed: "Central Florida",
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: brandName,
        url: absoluteUrl("/"),
        inLanguage: localeMetadata[locale].htmlLang,
      },
    ],
  };
}

export function serviceSchema(service: Service, path: string, locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.kicker,
    url: absoluteUrl(localizedPath(locale, path)),
    image: service.images.map((image) => absoluteUrl(image.src)),
    provider: { "@id": businessId },
    areaServed: "Central Florida",
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[], currentPath: string, locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(localizedPath(locale, item.href ?? currentPath)),
    })),
  };
}
