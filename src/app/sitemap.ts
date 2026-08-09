import type { MetadataRoute } from "next";
import { airports, fleet, routes, services } from "@/content/data";
import { locales, localizedPath } from "@/i18n/config";
import { absoluteUrl, isProduction } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProduction) return [];
  const now = new Date();
  const pages = ["", "/services", "/fleet", "/corporate", "/service-areas", "/about", "/reviews", "/faq", "/contact", "/book", "/insights", "/privacy-policy", "/terms-of-service", "/ride-terms", "/accessibility"];
  return locales.flatMap((locale) => [
    ...pages.map((path) => ({ url: absoluteUrl(localizedPath(locale, path || "/")), lastModified: now, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...services.map((service) => ({ url: absoluteUrl(localizedPath(locale, `/services/${service.slug}`)), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9, images: service.images.map((image) => absoluteUrl(image.src)) })),
    ...airports.map((airport) => ({ url: absoluteUrl(localizedPath(locale, `/airports/${airport.slug}`)), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...routes.map((route) => ({ url: absoluteUrl(localizedPath(locale, `/routes/${route.slug}`)), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8, images: [absoluteUrl(route.image)] })),
    { url: absoluteUrl(localizedPath(locale, "/fleet")), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8, images: fleet.map((vehicle) => absoluteUrl(vehicle.image)) },
  ]);
}
