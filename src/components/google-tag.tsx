"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";
import { consentChangeEvent, consentFor, consentPreferencesEvent, consentStorageKey, isMeasurementEnabled, readConsent, saveConsent, trackPageView, type MeasurementConsent, updateGoogleConsent } from "@/lib/analytics";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener(consentChangeEvent, onStoreChange);
  return () => window.removeEventListener(consentChangeEvent, onStoreChange);
}

export function GoogleTag() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeToConsent, readConsent, () => null);
  const canLoadTagManager = Boolean(gtmId && isMeasurementEnabled() && consent && (consent.analytics || consent.advertising));

  useEffect(() => {
    trackPageView();
  }, [pathname]);

  useEffect(() => {
    if (consent) updateGoogleConsent(consent);
  }, [consent]);

  if (!canLoadTagManager || !gtmId || !consent) return null;

  const consentValues = consentFor(consent);
  const bootstrap = `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});window.gtag('consent','update',${JSON.stringify(consentValues)});window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});(function(w,d,s,l,i){var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`;

  return <Script id="revival-gtm" strategy="afterInteractive">{bootstrap}</Script>;
}

export function CookieConsent({ locale = "en" }: { locale?: Locale }) {
  const consent = useSyncExternalStore(subscribeToConsent, readConsent, () => null);
  const [managing, setManaging] = useState(false);
  const [preferences, setPreferences] = useState<MeasurementConsent>({ analytics: false, advertising: false });
  const copy = getUi(locale);

  useEffect(() => {
    const openPreferences = () => {
      setPreferences(readConsent() ?? { analytics: false, advertising: false });
      setManaging(true);
    };
    window.addEventListener(consentPreferencesEvent, openPreferences);
    return () => window.removeEventListener(consentPreferencesEvent, openPreferences);
  }, []);

  if (consent && !managing) return null;

  function choose(nextConsent: MeasurementConsent) {
    saveConsent(nextConsent);
    setManaging(false);
  }

  return <aside aria-label={copy.cookieLabel} className="cookie-consent" role="dialog">
    <p>{copy.cookieText}</p>
    {managing && <div className="cookie-options">
      <label><input checked disabled type="checkbox" /> <span><strong>{copy.cookieNecessary}</strong><small>{copy.cookieNecessaryDetail}</small></span></label>
      <label><input checked={preferences.analytics} onChange={(event) => setPreferences((current) => ({ ...current, analytics: event.target.checked }))} type="checkbox" /> <span><strong>{copy.cookieAnalytics}</strong><small>{copy.cookieAnalyticsDetail}</small></span></label>
      <label><input checked={preferences.advertising} onChange={(event) => setPreferences((current) => ({ ...current, advertising: event.target.checked }))} type="checkbox" /> <span><strong>{copy.cookieAdvertising}</strong><small>{copy.cookieAdvertisingDetail}</small></span></label>
    </div>}
    <div className="cookie-actions">
      {!managing && <button className="button button-gold button-small" onClick={() => choose({ analytics: true, advertising: true })} type="button">{copy.acceptAll}</button>}
      {!managing && <button className="cookie-decline" onClick={() => choose({ analytics: false, advertising: false })} type="button">{copy.rejectNonEssential}</button>}
      <button className="cookie-manage" onClick={() => { setPreferences(readConsent() ?? { analytics: false, advertising: false }); setManaging(true); }} type="button">{copy.cookieManage}</button>
      {managing && <button className="button button-gold button-small" onClick={() => choose(preferences)} type="button">{copy.cookieSave}</button>}
    </div>
  </aside>;
}

export function CookiePreferencesLink({ children }: { children: string }) {
  return <button className="footer-cookie-link" onClick={() => window.dispatchEvent(new Event(consentPreferencesEvent))} type="button">{children}</button>;
}

export { consentStorageKey };
