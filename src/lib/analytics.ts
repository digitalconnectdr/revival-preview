declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const bookingConversion = process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION?.trim() || process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL?.trim();
const contactConversion = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION?.trim();

export function trackEvent(eventName: string, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("event", eventName, parameters);
}

export function trackBookingStart(placement: string) {
  trackEvent("book_ride_click", { placement });
  trackEvent("external_booking_click", { placement });
  if (placement.includes("route")) trackEvent("route_booking_click", { placement });
  if (placement.includes("airport")) trackEvent("airport_booking_click", { placement });
  if (placement === "mobile-web-app") trackEvent("qr_booking_click", { placement });
  if (bookingConversion) trackEvent("conversion", { send_to: bookingConversion, placement });
}

export function trackContactClick(channel: "phone" | "email" | "corporate" | "instagram", placement: string) {
  const eventName = channel === "phone" ? "phone_click" : channel === "email" ? "email_click" : channel === "corporate" ? "corporate_contact_click" : "instagram_click";
  trackEvent(eventName, { placement });
  if (contactConversion) trackEvent("conversion", { send_to: contactConversion, placement, channel });
}

export function trackLanguageSwitch(fromLocale: string, toLocale: string, path: string) {
  if (fromLocale !== toLocale) trackEvent("language_switch", { from_locale: fromLocale, to_locale: toLocale, path });
}

/**
 * Retained as a safe no-op-compatible analytics event for the disabled contact
 * form component. A real form provider can call this after server-side delivery
 * is verified; no lead is claimed or sent while CONTACT_FORM_MODE=disabled.
 */
export function trackContactLead(placement: string) {
  trackEvent("contact_form_submit", { placement, contact_form_mode: process.env.NEXT_PUBLIC_CONTACT_FORM_MODE ?? "disabled" });
}
