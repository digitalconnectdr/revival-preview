import type { Metadata } from "next";
import { ServiceCard } from "@/components/service-card";
import { PageHero, Section } from "@/components/site-components";
import { services } from "@/content/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Services", "Explore Revival Transportation Group services for airport, corporate, cruise, city-to-city and local travel.", "/services");

export default function ServicesPage() {
  return <>
    <PageHero eyebrow="Private transportation" title="Services shaped around your itinerary." intro="Choose a service to see how Revival can support airport, corporate, cruise, local and planned travel." />
    <Section>
      <div className="container service-grid service-grid-full">
        {services.map((service, index) => <ServiceCard actionLabel="Explore service" headingLevel="h2" index={index} key={service.slug} service={service} totalServices={services.length} />)}
      </div>
    </Section>
  </>;
}
