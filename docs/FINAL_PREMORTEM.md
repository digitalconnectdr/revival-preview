# Final pre-mortem

| Failure mode | Early warning | Mitigation |
| --- | --- | --- |
| Preview is indexed by search engines | Preview appears in a search result or Search Console property | Keep Vercel preview environment on `preview`, verify `noindex`, disallow robots and empty sitemap before every share |
| Production receives incorrect canonical URLs | Page source references preview/local URL | Set production site URL before build and validate canonical, `hreflang`, sitemap and Open Graph before DNS changes |
| Form appears to work but loses leads | No verified delivery receipt or dashboard record | Keep `CONTACT_FORM_MODE=disabled` and direct users to phone/email until an end-to-end test succeeds |
| Advertising data is incomplete or noncompliant | Tags fire without approved IDs/consent policy | Configure IDs only after written approval, test consent and conversions in debug tools, document results |
| Unverified service claims create operational risk | Sales team cannot honor displayed detail | Keep conditional language, confirm scope/capacity/markets with the client before production |
| Translation drift returns | Page briefly shows another language or selector lands on wrong page | Keep locale content server-rendered, test direct links and deep-link selector changes in every release |
