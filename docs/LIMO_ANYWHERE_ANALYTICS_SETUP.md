# Limo Anywhere / MyLimoBiz analytics setup

## Current state

The website uses one centralized external booking URL: `https://pwa.mylimobiz.com/revivaltransportationgroup/`. A website click records `booking_start`, not `purchase`.

`purchase` is **ready for configuration / pending external access**. It must never be emitted by the Revival website before a reservation is actually completed in MyLimoBiz or Limo Anywhere.

## Required access and setup

After Revival grants administrative access, review the booking configuration in:

`My Office -> Company Settings -> Online Reservations -> ORES & Mobile -> Analytics`

Use the same measurement architecture as the main website:

1. Add or connect the approved GTM container and GA4 measurement configuration according to the provider's supported fields.
2. Preserve the visitor session and advertising parameters from the Revival website to the booking domain, including `utm_*`, `gclid`, `gbraid` and `wbraid` where supported.
3. Confirm the booking domain configured for GA4 cross-domain measurement exactly matches the provider's live booking domain.
4. On the real completed-reservation confirmation page only, push a GA4/GTM `purchase` event when the provider can supply a real transaction ID, value and currency.
5. Configure the Google Ads primary purchase conversion from that confirmed external event.
6. Configure Meta Pixel and, if a server-side endpoint is approved, Meta CAPI using the same `event_id` for deduplication.

## Real test procedure

Do not mark this flow verified until all of these steps are completed with a legitimate test booking:

1. Open the Revival website with a test UTM or Google Ads click identifier.
2. Select any Book a ride CTA and confirm one `booking_start` in GTM Preview/GA4 DebugView.
3. Confirm the browser lands on the configured MyLimoBiz booking experience and that permitted campaign parameters are retained.
4. Complete an authorized test reservation in MyLimoBiz/Limo Anywhere.
5. Confirm exactly one external `purchase` event with a real transaction ID, value and currency in GA4 DebugView.
6. Confirm the Google Ads purchase conversion receives the event as the primary conversion.
7. If Meta CAPI is enabled, confirm Pixel/CAPI deduplication with matching `event_id` in Meta Test Events.

Until this is complete, report external purchase attribution as **PENDING EXTERNAL BOOKING SIGNAL**.
