import type { Metadata } from "next";
import type { Service } from "@/content/data";
import { business } from "@/content/business";
import { absoluteUrl } from "@/lib/site";

const brandName = business.brandName.value ?? "Revival Transportation Group";
const organizationId = absoluteUrl("/#organization");
const businessId = absoluteUrl("/#transportation-service");

type BreadcrumbItem = { label: string; href?: string };
type FaqItem = { question: string; answer: string };

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${brandName}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url, siteName: brandName, title: fullTitle, description, locale: "en_US" },
    twitter: { card: "summary", title: fullTitle, description },
  };
}

export function businessSchema(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: brandName,
        url: absoluteUrl("/"),
        telephone: business.phone.value,
        email: business.email.value,
        contactPoint: [{ "@type": "ContactPoint", telephone: business.phone.value, contactType: "customer service", availableLanguage: ["English", "Spanish", "Portuguese"] }],
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
            itemOffered: { "@type": "Service", name: service.name, description: service.summary, url: absoluteUrl(`/services/${service.slug}`) },
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
    ],
  };
}

export function serviceSchema(service: Service, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.kicker,
    url: absoluteUrl(path),
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

export function breadcrumbSchema(items: BreadcrumbItem[], currentPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href ?? currentPath),
    })),
  };
}
