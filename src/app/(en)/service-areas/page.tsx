import type { Metadata } from "next";
import Link from "next/link";
import { ServiceAreaCoverageVisual } from "@/components/service-area-coverage-visual";
import { PageHero, Section, SectionHeading } from "@/components/site-components";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Central Florida & Northeast Transportation Markets",
  "Explore Revival Transportation Group’s Central Florida service area and select Northeast markets, with availability confirmed individually by itinerary.",
  "/service-areas",
);

export default function ServiceAreasPage() {
  return <>
    <PageHero
      eyebrow="Where we travel"
      title="A clear starting point for your trip."
      intro="Central Florida is Revival’s core service area. Revival also accepts inquiries for select Northeast markets previously included in the company’s service coverage."
    />
    <Section>
      <div className="container area-page-grid">
        <article className="area-primary">
          <div className="area-page-copy">
            <p className="eyebrow">Core service area</p>
            <h2>Central Florida</h2>
            <p>From airport and port transfers to corporate and local travel, Revival helps you move comfortably throughout Central Florida.</p>
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
            <p className="eyebrow">Select Northeast markets</p>
            <h2>New York, New Jersey, Connecticut, Massachusetts and Pennsylvania</h2>
            <p>Revival also accepts inquiries for select Northeast markets previously included in the company’s service coverage. Availability and service arrangements are confirmed individually based on the itinerary.</p>
            <small>Revival does not represent direct operation or a dedicated fleet in these markets.</small>
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
