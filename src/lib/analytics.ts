export type MeasurementEventName =
  | "page_view"
  | "book_cta_click"
  | "booking_page_view"
  | "booking_started"
  | "booking_external_open"
  | "booking_start"
  | "phone_click"
  | "email_click"
  | "corporate_contact_click"
  | "airport_booking_click"
  | "route_booking_click"
  | "service_booking_click"
  | "qr_booking_click"
  | "instagram_click"
  | "language_switch";

export type MeasurementConsent = { analytics: boolean; advertising: boolean };

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
  }
}

export const consentStorageKey = "revival-measurement-consent";
export const consentChangeEvent = "revival-measurement-consent-change";
export const consentPreferencesEvent = "revival-measurement-open-preferences";

const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"] as const;
const measurementEnabled = process.env.NEXT_PUBLIC_SITE_ENV === "production" && process.env.NEXT_PUBLIC_TRACKING_ENABLED === "true";
const measurementDebug = process.env.NEXT_PUBLIC_MEASUREMENT_DEBUG === "true";
let cachedConsentRaw: string | null | undefined;
let cachedConsent: MeasurementConsent | null = null;

type TrackingContext = {
  locale: "en" | "es" | "pt";
  page_path: string;
  page_type: string;
  service?: string;
  airport?: string;
  route?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
};

function isLocale(value: string | undefined): value is TrackingContext["locale"] {
  return value === "en" || value === "es" || value === "pt";
}

function pageDetails(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const locale = isLocale(segments[0]) ? segments[0] : "en";
  if (isLocale(segments[0])) segments.shift();
  const [section, slug] = segments;

  if (section === "services" && slug) return { locale, page_type: "service", service: slug };
  if (section === "airports" && slug) return { locale, page_type: "airport", airport: slug };
  if (section === "routes" && slug) return { locale, page_type: "route", route: slug };
  if (section === "corporate") return { locale, page_type: "corporate" };
  if (section === "contact") return { locale, page_type: "contact" };
  if (section === "book") return { locale, page_type: "booking" };
  if (section === "service-areas") return { locale, page_type: "service_areas" };
  if (section === "services") return { locale, page_type: "services" };
  return { locale, page_type: section || "home" };
}

export function getTrackingContext(pathname = "/", search = ""): TrackingContext {
  const params = new URLSearchParams(search);
  const context: TrackingContext = { page_path: pathname || "/", ...pageDetails(pathname || "/") };
  campaignKeys.forEach((key) => {
    const value = params.get(key);
    if (value) context[key] = value;
  });
  return context;
}

function currentContext() {
  if (typeof window === "undefined") return getTrackingContext();
  return getTrackingContext(window.location.pathname, window.location.search);
}

function createEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `revival-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function canRecordMeasurement() {
  if (measurementDebug) return true;
  const consent = readConsent();
  return measurementEnabled && Boolean(consent?.analytics || consent?.advertising);
}

export function isMeasurementEnabled() {
  return measurementEnabled;
}

export function isMeasurementDebugEnabled() {
  return measurementDebug;
}

export function trackEvent(event: MeasurementEventName, parameters: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined" || !canRecordMeasurement()) return;
  const payload = { event, event_id: createEventId(), ...currentContext(), ...parameters };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
  if (measurementDebug) window.dispatchEvent(new CustomEvent("revival-measurement-debug", { detail: payload }));
}

export function trackPageView() {
  trackEvent("page_view");
}

export function trackBookingStart(placement: string) {
  const context = currentContext();
  trackEvent("booking_start", { cta_location: placement });
  if (context.page_type === "airport") trackEvent("airport_booking_click", { cta_location: placement, airport: context.airport });
  if (context.page_type === "route") trackEvent("route_booking_click", { cta_location: placement, route: context.route });
  if (context.page_type === "service") trackEvent("service_booking_click", { cta_location: placement, service: context.service });
  if (placement === "mobile-web-app") trackEvent("qr_booking_click", { cta_location: placement });
}

export function trackBookingCtaClick(placement: string) {
  trackEvent("book_cta_click", { cta_location: placement });
  trackBookingStart(placement);
}

export function trackBookingPageView() {
  trackEvent("booking_page_view", { cta_location: "booking-page" });
}

export function trackBookingStarted(placement: string) {
  trackEvent("booking_started", { cta_location: placement });
}

export function trackBookingExternalOpen(placement: string) {
  trackEvent("booking_external_open", { cta_location: placement });
}

export function trackContactClick(channel: "phone" | "email" | "corporate" | "instagram", placement: string) {
  const event = channel === "phone" ? "phone_click" : channel === "email" ? "email_click" : channel === "corporate" ? "corporate_contact_click" : "instagram_click";
  trackEvent(event, { cta_location: placement });
}

export function trackLanguageSwitch(fromLocale: string, toLocale: string, path: string) {
  if (fromLocale !== toLocale) trackEvent("language_switch", { from_locale: fromLocale, to_locale: toLocale, page_path: path, cta_location: "language_selector" });
}

export function readConsent(): MeasurementConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const rawConsent = window.localStorage.getItem(consentStorageKey);
    if (rawConsent === cachedConsentRaw) return cachedConsent;
    cachedConsentRaw = rawConsent;
    const parsed = JSON.parse(rawConsent ?? "null") as Partial<MeasurementConsent> | null;
    cachedConsent = parsed && typeof parsed.analytics === "boolean" && typeof parsed.advertising === "boolean"
      ? { analytics: parsed.analytics, advertising: parsed.advertising }
      : null;
    return cachedConsent;
  } catch {
    cachedConsentRaw = undefined;
    cachedConsent = null;
    return null;
  }
}

export function consentFor(consent: MeasurementConsent) {
  const analytics = consent.analytics ? "granted" : "denied";
  const advertising = consent.advertising ? "granted" : "denied";
  return { analytics_storage: analytics, ad_storage: advertising, ad_user_data: advertising, ad_personalization: advertising };
}

export function updateGoogleConsent(consent: MeasurementConsent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("consent", "update", consentFor(consent));
}

export function saveConsent(consent: MeasurementConsent) {
  if (typeof window === "undefined") return;
  const previousConsent = readConsent();
  window.localStorage.setItem(consentStorageKey, JSON.stringify(consent));
  updateGoogleConsent(consent);
  window.dispatchEvent(new Event(consentChangeEvent));
  if (!previousConsent || (!previousConsent.analytics && !previousConsent.advertising)) {
    if (consent.analytics || consent.advertising) trackPageView();
  }
}
