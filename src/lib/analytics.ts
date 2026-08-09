declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const bookingConversion = process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION?.trim();
const contactConversion = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION?.trim();

function send(eventName: string, parameters: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("event", eventName, parameters);
}

export function trackBookingStart(placement: string) {
  send("begin_checkout", { booking_placement: placement });
  if (bookingConversion) send("conversion", { send_to: bookingConversion });
}

export function trackContactLead() {
  send("generate_lead", { lead_source: "contact_form" });
  if (contactConversion) send("conversion", { send_to: contactConversion });
}
