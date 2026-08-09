import type { Metadata } from "next";
import { FleetCard } from "@/components/fleet-card";
import { PageHero, PrimaryCta, Section, SectionHeading } from "@/components/site-components";
import { fleet } from "@/content/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Fleet", "Explore Revival Transportation Group’s vehicle categories for private travel.", "/fleet");
export default function FleetPage() {
  return <>
    <PageHero eyebrow="Travel options" title="A vehicle category for the way you travel." intro="Choose the category that best suits your party, luggage and itinerary. Your ride is arranged around the details you share." />
    <Section><div className="container"><SectionHeading eyebrow="Our fleet" title="Room for your itinerary." /><div className="fleet-page-grid">{fleet.map((vehicle) => <FleetCard headingLevel="h2" key={vehicle.name} vehicle={vehicle} />)}</div></div></Section>
    <Section className="final-cta compact"><div className="container"><h2>Let’s match your trip to the right vehicle.</h2><p>Share your party and luggage details when you book.</p><PrimaryCta placement="fleet-final" /></div></Section>
  </>;
}
