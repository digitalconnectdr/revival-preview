import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, FaqList, PageHero, PrimaryCta, Section, SectionHeading } from "@/components/site-components";
import { findRoute, routes } from "@/content/data";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return routes.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const route = findRoute(slug);
    return route ? pageMetadata(route.title, route.intro, `/routes/${route.slug}`) : {};
  });
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const route = findRoute((await params).slug);
  if (!route) notFound();
  const faq = [
    { question: `Can I request ${route.title} transportation?`, answer: "Yes. Start with the reservation form or call Revival with the date, pickup, destination and traveler details to confirm availability." },
    { question: "What should I include in my request?", answer: "Please include timing, passenger count and luggage considerations. Vehicle assignment and the final travel arrangement are confirmed before booking." },
  ];

  const path = `/routes/${route.slug}`;
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Service areas", href: "/service-areas" }, { label: route.title }];
  const routeSchema = { "@context": "https://schema.org", "@type": "Service", name: `${route.title} private transportation`, description: route.intro, url: absoluteUrl(path), image: absoluteUrl(route.image), provider: { "@id": absoluteUrl("/#transportation-service") }, areaServed: [route.origin, route.destination] };

  return <>
    <JsonLd data={[routeSchema, faqSchema(faq), breadcrumbSchema(breadcrumbs, path)]} />
    <div className="container crumb-wrap"><Breadcrumbs items={breadcrumbs} /></div>
    <PageHero eyebrow="Private route transportation" title={`${route.origin} to ${route.destination}.`} intro={route.intro}><PrimaryCta placement={`route-${route.slug}`} /></PageHero>
    <Section><div className="container route-detail"><div className="route-visual"><Image alt={route.imageAlt} fill priority sizes="(max-width: 780px) 100vw, 48vw" src={route.image} /></div><div><SectionHeading eyebrow="Before you travel" title="Details that help confirm your request." /><ul className="check-list">{route.considerations.map((consideration) => <li key={consideration}><span>✓</span>{consideration}</li>)}</ul></div></div></Section>
    <Section className="soft-section"><div className="container faq-layout"><SectionHeading eyebrow="Route questions" title="A clear way to start." /><FaqList items={faq} /></div></Section>
  </>;
}
