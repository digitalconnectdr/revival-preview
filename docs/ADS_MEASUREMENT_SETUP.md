# Ads measurement setup

## Architecture

Google Tag Manager (GTM) is the only browser tag loader used by the website. Configure GA4, Google Ads and Meta Pixel as GTM tags; do not add direct GA4, Google Ads or Meta Pixel snippets alongside GTM. This prevents duplicate page views and duplicate conversions.

The website sends a structured event object to `dataLayer` only when measurement is enabled for the production environment. Each event includes `event_id`, `locale`, `page_path`, `page_type`, UTM values when present, and the applicable CTA location. `event_id` is the browser-side deduplication key to pass to both Meta Pixel and a future server-side Meta CAPI implementation.

Preview and local environments are safe by default: `NEXT_PUBLIC_SITE_ENV` is not `production`, tracking is disabled, and no GTM, GA4, Google Ads or Meta Pixel request is loaded. Preview remains noindex/nofollow with a blocked robots file and an empty sitemap.

## Environment values

Set real values only in the production deployment settings. Public values are build-time values and must be correct when the deployment is built.

| Variable | Use |
| --- | --- |
| `NEXT_PUBLIC_SITE_ENV` | `production` only on the future live website; use `preview` or `local` elsewhere. |
| `NEXT_PUBLIC_TRACKING_ENABLED` | Set to `true` only after GTM and consent are approved in production. |
| `NEXT_PUBLIC_MEASUREMENT_DEBUG` | Optional local/preview diagnostic data-layer mode. Keep `false` for normal preview. |
| `NEXT_PUBLIC_GTM_ID` | GTM container ID. This is the sole browser loader. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID to configure inside GTM. |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads account destination to configure inside GTM. |
| `NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION` | Google Ads secondary conversion destination for `booking_start`, configured in GTM. |
| `NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION` | Google Ads secondary conversion destination for phone/email, configured in GTM. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID to configure inside GTM. |
| `META_CAPI_ACCESS_TOKEN` | Server-only Meta CAPI secret. Never use a `NEXT_PUBLIC_` prefix. |
| `META_CAPI_TEST_EVENT_CODE` | Optional server-side test code; keep server-only. |

## Event map

| Website event | Trigger | Recommended destination mapping |
| --- | --- | --- |
| `page_view` | Route view | GA4 `page_view`; Meta `PageView`. |
| `booking_start` | Every MyLimoBiz handoff | GA4 event; Google Ads secondary conversion; Meta custom `BookingStart`. |
| `phone_click` | Phone CTA | GA4 event; Google Ads secondary conversion; Meta `Contact`. |
| `email_click` | Email CTA | GA4 event; Google Ads secondary conversion; Meta `Contact`. |
| `corporate_contact_click` | Corporate contact CTA | GA4 event and optional secondary lead conversion. |
| `airport_booking_click` | Booking CTA on an airport page | GA4 reporting event. |
| `route_booking_click` | Booking CTA on a route page | GA4 reporting event. |
| `service_booking_click` | Booking CTA on a service page | GA4 reporting event. |
| `qr_booking_click` | Mobile web app/QR CTA | GA4 reporting event. |
| `instagram_click` | Instagram CTA | GA4 reporting event. |
| `language_switch` | Visitor selects another locale | GA4 reporting event. |

`booking_start` is not a purchase. The website intentionally never sends `purchase` because the actual reservation completes in MyLimoBiz/Limo Anywhere.

## Google Ads and GA4

1. In GTM, create one GA4 configuration tag and enable it only after Analytics consent.
2. Create Google Ads conversion tags triggered from the named data-layer events. Mark `booking_start`, `phone_click`, and `email_click` as secondary until a real completed booking can be verified.
3. Enable Google Ads auto-tagging. The website preserves `utm_*`, `gclid`, `gbraid`, and `wbraid` when it opens the single centralized MyLimoBiz booking URL.
4. In GTM GA4 settings, configure cross-domain measurement for `pwa.mylimobiz.com` and the exact booking domain confirmed by Revival. Verify that the external provider accepts the parameters before relying on the handoff.
5. When Limo Anywhere access is available, install the same GTM/GA4 architecture there and implement a real `purchase` with transaction ID, value and currency only if the provider exposes those values.

## Meta Ads

Configure Meta Pixel through GTM, with the GTM tag requiring Advertising consent. Map `page_view` to `PageView`, `booking_start` to a custom `BookingStart`, and phone/email events to `Contact`.

The website supplies a unique `event_id` in every data-layer event. A future server-side CAPI endpoint must forward the same event name and `event_id` to Meta so Pixel and CAPI deduplicate. Do not add a Meta `Purchase` tag until Limo Anywhere provides a verified completed-booking signal.

Meta CAPI needs a server-side endpoint. It can run on Vercel or Hostinger Node.js. A Hostinger Static deployment must use an external server-side endpoint or a server-side GTM container; no CAPI token can be placed in static browser files.

## Consent

The localized consent panel offers Necessary, Analytics and Advertising categories, plus Accept all, Reject non-essential and Manage preferences. Necessary is always enabled. Analytics controls `analytics_storage`; Advertising controls `ad_storage`, `ad_user_data` and `ad_personalization`. GTM is not loaded until the visitor has granted at least one optional category in the production environment.

The footer contains a Cookie preferences control so a visitor can change a prior choice.

## Production launch checklist

1. Configure production-only variables in Vercel or the selected Hostinger deployment.
2. Publish the GTM container with consent-aware GA4, Google Ads and Meta Pixel tags.
3. Verify one page view and each website CTA in GTM Preview, GA4 DebugView and Meta Test Events without PII.
4. Confirm Google Ads auto-tagging and a click through the MyLimoBiz booking handoff.
5. Do not declare `purchase` verified until the external completed-booking test in the Limo Anywhere guide is complete.
