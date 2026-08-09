"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";

const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID?.trim();
const analyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
const tagId = googleTagId || analyticsId || adsId;
const destinations = Array.from(new Set([googleTagId, analyticsId, adsId].filter((value): value is string => Boolean(value))));
const consentStorageKey = "revival-measurement-consent";
const consentChangeEvent = "revival-measurement-consent-change";
type ConsentStatus = "pending" | "granted" | "denied";

export function GoogleTag() {
  const pathname = usePathname();

  useEffect(() => {
    if (!tagId) return;
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
    window.gtag("event", "page_view", { page_location: window.location.href, page_path: `${pathname}${window.location.search}` });
  }, [pathname]);

  if (!tagId) return null;

  const bootstrap = [
    "window.dataLayer=window.dataLayer||[];",
    "window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};",
    "window.gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});",
    "window.gtag('js',new Date());",
    ...destinations.map((destination) => `window.gtag('config',${JSON.stringify(destination)},{send_page_view:false});`),
  ].join("");

  return <><Script id="google-tag-bootstrap" strategy="afterInteractive">{bootstrap}</Script><Script async id="google-tag" src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`} strategy="afterInteractive" /></>;
}

export function CookieConsent({ locale = "en" }: { locale?: Locale }) {
  const consent = useSyncExternalStore<ConsentStatus>(subscribeToConsent, readConsent, () => "pending");
  const copy = getUi(locale);

  useEffect(() => {
    if (consent !== "pending") window.gtag?.("consent", "update", consentFor(consent));
  }, [consent]);

  if (!tagId || consent !== "pending") return null;

  function choose(status: "granted" | "denied") {
    window.gtag?.("consent", "update", consentFor(status));
    window.localStorage.setItem(consentStorageKey, status);
    window.dispatchEvent(new Event(consentChangeEvent));
  }

  return <aside aria-label={copy.cookieLabel} className="cookie-consent"><p>{copy.cookieText}</p><div><button className="button button-gold button-small" onClick={() => choose("granted")} type="button">{copy.accept}</button><button className="cookie-decline" onClick={() => choose("denied")} type="button">{copy.decline}</button><Link href={locale === "en" ? "/privacy-policy" : `/${locale}/privacy-policy`}>{copy.privacy}</Link></div></aside>;
}

function consentFor(status: "granted" | "denied") {
  return { ad_storage: status, analytics_storage: status, ad_user_data: status, ad_personalization: status };
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener(consentChangeEvent, onStoreChange);
  return () => window.removeEventListener(consentChangeEvent, onStoreChange);
}

function readConsent(): ConsentStatus {
  const saved = window.localStorage.getItem(consentStorageKey);
  return saved === "granted" || saved === "denied" ? saved : "pending";
}
