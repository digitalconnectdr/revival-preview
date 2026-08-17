import type { Metadata } from "next";
import Link from "next/link";
import { ServiceAreaCoverageVisual } from "@/components/service-area-coverage-visual";
import { PageHero, Section, SectionHeading } from "@/components/site-components";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Central Florida & Northeast Service Areas",
  "Professional chauffeur and private transportation services across Central Florida and active Northeast markets, including New York, New Jersey, Connecticut, Massachusetts and Pennsylvania.",
  "/service-areas",
);

export default function ServiceAreasPage() {
  return <>
    <PageHero
      eyebrow="Where we travel"
      title="Private transportation across Central Florida and the Northeast."
      intro="Revival Transportation Group provides professional chauffeur and private transportation services throughout Central Florida and key Northeast markets."
    />
    <Section>
      <div className="container area-page-grid">
        <article className="area-primary">
          <div className="area-page-copy">
            <p className="eyebrow">Active service region</p>
            <h2>Central Florida</h2>
            <p>Revival provides professional private transportation in Orlando, Kissimmee, Lake Nona, Winter Park, Sanford, Tampa, Daytona Beach, Cocoa Beach, Port Canaveral and major Central Florida destinations.</p>
            <div className="area-links">
              <Link href="/airports/mco"><strong>MCO · Orlando International Airport</strong><span>Private airport transportation</span></Link>
              <Link href="/airports/sfb"><strong>SFB · Orlando Sanford International Airport</strong><span>Private airport transportation</span></Link>
              <Link href="/services/port-canaveral-transfers"><strong>Port Canaveral</strong><span>Cruise terminal connections</span></Link>
            </div>
          </div>
          <ServiceAreaCoverageVisual region="central" />
        </article>
        <article className="area-secondary">
          <div className="area-page-copy">
            <p className="eyebrow">Active service region</p>
            <h2>New York, New Jersey, Connecticut, Massachusetts and Pennsylvania</h2>
            <p>Revival provides professional private transportation and chauffeur service across key Northeast markets, including New York, New Jersey, Connecticut, Massachusetts and Pennsylvania.</p>
            <small>The locations shown represent major service areas. For transportation needs beyond the cities listed, contact our team to coordinate your trip.</small>
          </div>
          <ServiceAreaCoverageVisual region="northeast" />
        </article>
      </div>
    </Section>
    <Section className="soft-section">
      <div className="container">
        <SectionHeading eyebrow="Start planning" title="Explore popular travel points." />
        <div className="route-grid">
          <Link className="route-card route-link" href="/airports/mco"><p>Airport</p><h3>Orlando International Airport (MCO)</h3><span>Explore MCO travel →</span></Link>
          <Link className="route-card route-link" href="/airports/sfb"><p>Airport</p><h3>Orlando Sanford International Airport (SFB)</h3><span>Explore SFB travel →</span></Link>
          <Link className="route-card route-link" href="/routes/mco-to-port-canaveral"><p>Popular route</p><h3>MCO to Port Canaveral</h3><span>Plan your route →</span></Link>
        </div>
      </div>
    </Section>
  </>;
}
