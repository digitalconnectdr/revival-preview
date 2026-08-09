import type { MetadataRoute } from "next";
import { airports, fleet, routes, services } from "@/content/data";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/services", "/fleet", "/corporate", "/service-areas", "/about", "/reviews", "/faq", "/contact", "/book", "/insights", "/privacy-policy", "/terms-of-service", "/ride-terms", "/accessibility"];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path), lastModified: now, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...services.map((service) => ({ url: absoluteUrl(`/services/${service.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9, images: service.images.map((image) => absoluteUrl(image.src)) })),
    ...airports.map((airport) => ({ url: absoluteUrl(`/airports/${airport.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...routes.map((route) => ({ url: absoluteUrl(`/routes/${route.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8, images: [absoluteUrl(route.image)] })),
    { url: absoluteUrl("/fleet"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8, images: fleet.map((vehicle) => absoluteUrl(vehicle.image)) },
  ];
}
