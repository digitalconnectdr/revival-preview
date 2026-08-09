import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, FaqList, PageHero, PrimaryCta, Section, SectionHeading } from "@/components/site-components";
import { findService, findRoute, routes } from "@/content/data";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

// English route pages.

export function generateStaticParams() {
  return routes.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const route = findRoute(slug);
    return route ? pageMetadata(route.seoTitle, route.seoDescription, `/routes/${route.slug}`) : {};
  });
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const route = findRoute((await params).slug);
  if (!route) notFound();

  const path = `/routes/${route.slug}`;
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Service areas", href: "/service-areas" }, { label: route.title }];
  const relatedServices = route.relatedServices.map(findService).filter((service): service is NonNullable<typeof service> => Boolean(service));
  const relatedRoutes = routes.filter((item) => item.slug !== route.slug).slice(0, 2);
  const routeSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: route.seoTitle,
    description: route.seoDescription,
    url: absoluteUrl(path),
    image: absoluteUrl(route.image),
    provider: { "@id": absoluteUrl("/#transportation-service") },
    areaServed: [route.origin, route.destination],
  };

  return <>
    <JsonLd data={[routeSchema, faqSchema(route.faq), breadcrumbSchema(breadcrumbs, path)]} />
    <div className="container crumb-wrap"><Breadcrumbs items={breadcrumbs} /></div>
    <PageHero eyebrow="Private route transportation" title={`Private transportation from ${route.origin} to ${route.destination}.`} intro={route.intro}><PrimaryCta placement={`route-${route.slug}`} /></PageHero>
    <Section>
      <div className="container route-detail">
        <div className="route-visual"><Image alt={route.imageAlt} fill priority sizes="(max-width: 780px) 100vw, 48vw" src={route.image} /></div>
        <div><SectionHeading eyebrow="Route overview" title="A private trip, planned around the details." /><p>{route.overview}</p><ul className="check-list">{route.considerations.map((consideration) => <li key={consideration}><span>✓</span>{consideration}</li>)}</ul></div>
      </div>
    </Section>
    <Section className="soft-section">
      <div className="container">
        <SectionHeading eyebrow="Common itinerary scenarios" text={route.travelerContext} title="A route with the right context." />
        <div className="three-note-grid">{route.scenarios.map((scenario, index) => <div key={scenario.title}><span>0{index + 1}</span><h2>{scenario.title}</h2><p>{scenario.detail}</p></div>)}</div>
      </div>
    </Section>
    <Section>
      <div className="container split-copy">
        <div><SectionHeading eyebrow="Pickup and arrival planning" title="Details that help confirm your request." /><p>{route.pickupPlanning}</p><p>{route.luggagePlanning}</p></div>
        <ol className="number-list"><li><span>01</span><div><strong>Vehicle recommendations</strong><p>{route.vehicleGuidance}</p></div></li><li><span>02</span><div><strong>When to book</strong><p>{route.bookingGuidance}</p></div></li><li><span>03</span><div><strong>Travel considerations</strong><p>Traffic, airport activity, terminal access and other conditions can affect a trip. Revival confirms the requested arrangement without promising fixed travel times.</p></div></li></ol>
      </div>
    </Section>
    <Section className="soft-section">
      <div className="container">
        <SectionHeading eyebrow="Continue planning" title="Related services and routes." />
        <div className="route-grid">{relatedServices.map((service) => <Link className="route-card route-link" href={`/services/${service.slug}`} key={service.slug}><p>Service</p><h3>{service.name}</h3><span>Explore service →</span></Link>)}{relatedRoutes.map((item) => <Link className="route-card route-link" href={`/routes/${item.slug}`} key={item.slug}><p>Related route</p><h3>{item.title}</h3><span>Explore route →</span></Link>)}</div>
      </div>
    </Section>
    <Section><div className="container faq-layout"><SectionHeading eyebrow="Route questions" title="Know what to plan for." /><FaqList items={route.faq} /></div></Section>
    <Section className="final-cta compact"><div className="container"><h2>Ready to plan {route.title}?</h2><p>Start with the itinerary details and Revival will review availability for your private trip.</p><PrimaryCta placement={`route-final-${route.slug}`} /></div></Section>
  </>;
}
