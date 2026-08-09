# SEO, AEO, GEO and Ads intent map

| Intent | Primary route | Supporting routes | User need | Structured support |
| --- | --- | --- | --- | --- |
| Orlando airport private transportation | `/services/airport-transfers` | `/airports/mco`, `/airports/sfb` | Arrange a private airport arrival or departure | Service, FAQ, Breadcrumb and Organization schema |
| MCO ground transportation | `/airports/mco` | `/services/airport-transfers`, `/routes/mco-to-port-canaveral` | Travel from MCO with flight and luggage context | Service and Breadcrumb schema |
| Port Canaveral transfer | `/services/port-canaveral-transfers` | `/routes/mco-to-port-canaveral` | Connect airport, hotel or cruise terminal | Service, FAQ and route Service schema |
| Executive transportation | `/services/executive-transportation` | `/corporate`, `/services/hourly-chauffeur` | Plan business, meetings or executive travel | Service schema and qualified corporate copy |
| Hourly chauffeur | `/services/hourly-chauffeur` | `/corporate` | Coordinate flexible or multi-stop transportation | Service and FAQ schema |
| City-to-city transportation | `/services/city-to-city` | `/routes/*` | Arrange a planned private route | Service and route schema |
| Orlando local private ride | `/services/in-city-rides` | `/service-areas` | Schedule local transportation | Service schema |
| Event and group transportation | `/services/events-group-transportation` | `/corporate` | Discuss capacity and itinerary needs | Service schema with explicit confirmation language |

## Quality controls

- Each indexable production page gets a unique title, description, canonical and language alternates.
- Business identity, service type, Central Florida coverage, verified contact channels and verified Instagram are represented consistently.
- Answer-oriented pages use clear headings, short direct summaries, relevant FAQs and visible source-qualified statements.
- Preview uses `noindex,nofollow`, `robots.txt` disallow and an empty sitemap. Do not submit the preview domain to Search Console.
- Paid media event names are documented in `ANALYTICS_IMPLEMENTATION.md`; conversion IDs are intentionally unset until supplied by the client.
