import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site-components";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Travel Insights", "Helpful planning guides for private airport, cruise and business transportation.", "/insights");
const guides = [
  { title: "What to include in an airport transfer request", text: "The flight, terminal information, final destination, party size and luggage details help the reservation team confirm a suitable trip." },
  { title: "Planning a MCO to Port Canaveral transfer", text: "Coordinate your arrival and cruise details early, then confirm the party and luggage requirements with the reservation team." },
  { title: "Preparing an executive transportation itinerary", text: "List each meeting location, preferred timing and any coordination contact before you request business transportation." },
];
export default function InsightsPage() { return <><PageHero eyebrow="Travel insights" title="Useful details for a smoother trip." intro="Simple planning guidance for travelers considering private airport, cruise and executive transportation." /><Section><div className="container insight-grid">{guides.map((guide, index) => <article className="insight-card" key={guide.title}><span>0{index + 1}</span><h2>{guide.title}</h2><p>{guide.text}</p><Link className="text-link" href="/contact">Ask about your trip <i aria-hidden="true">→</i></Link></article>)}</div></Section></>; }
