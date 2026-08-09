import { business } from "@/content/business";

export const deploymentStage = process.env.DEPLOYMENT_STAGE ?? "local";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? business.canonicalUrl.value ?? "http://localhost:3000").replace(/\/$/, "");
export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? business.bookingUrl.value;
export const isProduction = deploymentStage === "production";
export const isReviewEnvironment = !isProduction;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
