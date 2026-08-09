# Analytics implementation

## Configuration

Do not commit IDs or secrets. Configure environment values in Vercel/Hostinger only after client approval.

| Variable | Purpose | Current state |
| --- | --- | --- |
| `NEXT_PUBLIC_GOOGLE_TAG_ID` | Shared Google tag | Unset |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement destination | Unset |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads destination | Unset |
| `NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION` | Booking conversion `send_to` value | Unset |
| `NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION` | Contact conversion `send_to` value | Unset |
| `CONTACT_FORM_MODE` | `disabled`, `api` or `external` delivery mode | `disabled` until delivery is verified |

## Implemented event vocabulary

| Event | Trigger |
| --- | --- |
| `page_view` | Route view when a configured Google destination is present |
| `book_ride_click` | Any verified external booking handoff |
| `external_booking_click` | Same handoff, separated for reporting |
| `phone_click` | Tracked phone controls in global navigation/footer |
| `email_click` | Tracked footer email control |
| `corporate_contact_click` | Corporate request CTA |
| `route_booking_click` | Booking CTA from a route page |
| `airport_booking_click` | Booking CTA from an airport page |
| `language_switch` | A visitor selects a different server-rendered locale |
| `qr_booking_click` | The clickable mobile-web-app CTA beside the QR experience |
| `instagram_click` | A verified Instagram link in the footer, About or Contact section |
| `contact_form_submit` | Reserved for a verified future form delivery only |

## Consent behavior

The Google tag initializes with Google Consent Mode defaults denied for ads and analytics storage. The localized cookie control can update the choice to granted or denied. No Google script loads unless a real tag/GA/Ads ID is configured.

## Before enabling conversions

1. Receive written approval for the event definitions and conversion destinations.
2. Configure IDs in the selected environment only.
3. Use Tag Assistant/GA4 DebugView and a test Ads conversion to verify a real booking or verified contact action.
4. Record the result in the final audit report; do not mark a conversion as validated solely because an event name exists in code.
