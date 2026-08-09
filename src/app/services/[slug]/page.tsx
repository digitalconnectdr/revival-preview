import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceImageGallery } from "@/components/service-image-gallery";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, FaqList, PageHero, PrimaryCta, Section, SectionHeading } from "@/components/site-components";
import { findService, services } from "@/content/data";
import { breadcrumbSchema, faqSchema, pageMetadata, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = findService(slug);
    return service ? pageMetadata(service.name, service.summary, `/services/${service.slug}`) : {};
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const service = findService((await params).slug);
  if (!service) notFound();

  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.name }];
  const path = `/services/${service.slug}`;

  return <>
    <JsonLd data={[serviceSchema(service, path), faqSchema(service.faq), breadcrumbSchema(breadcrumbs, path)]} />
    <div className="container crumb-wrap"><Breadcrumbs items={breadcrumbs} /></div>
    <PageHero eyebrow={service.kicker} title={service.name} intro={service.description}><PrimaryCta placement={`service-${service.slug}`} /></PageHero>
    <Section className="service-visual-section"><div className="container"><ServiceImageGallery service={service} /></div></Section>
    <Section>
      <div className="container split-copy">
        <div><SectionHeading eyebrow="What this service supports" title="Travel details, clearly coordinated." /><p>{service.description}</p></div>
        <ul className="check-list">{service.highlights.map((highlight) => <li key={highlight}><span>✓</span>{highlight}</li>)}</ul>
      </div>
    </Section>
    <Section className="soft-section"><div className="container"><SectionHeading eyebrow="A good fit for" title="When this service makes sense." /><div className="use-case-grid">{service.useCases.map((useCase, index) => <div key={useCase}><span>0{index + 1}</span><h3>{useCase}</h3><p>Share your itinerary details to confirm availability for this travel need.</p></div>)}</div></div></Section>
    <Section><div className="container faq-layout"><SectionHeading eyebrow="Common questions" title="Know what to expect." /><FaqList items={service.faq} /></div></Section>
    <Section className="final-cta compact"><div className="container"><h2>Ready to plan {service.name.toLowerCase()}?</h2><p>Start with your trip details and Revival will confirm availability.</p><PrimaryCta placement={`service-final-${service.slug}`} /></div></Section>
  </>;
}
