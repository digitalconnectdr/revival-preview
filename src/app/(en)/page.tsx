// English root route.
import Image from "next/image";
import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { CentralFloridaMap } from "@/components/central-florida-map";
import { FleetCard } from "@/components/fleet-card";
import { GoogleReviews } from "@/components/google-reviews";
import { JsonLd } from "@/components/json-ld";
import { RotatingHeroWord } from "@/components/rotating-hero-word";
import { ServiceCard } from "@/components/service-card";
import { ArrowLink, Eyebrow, FaqList, PrimaryCta, Section, SectionHeading } from "@/components/site-components";
import { fleet, routes, services, siteFaq } from "@/content/data";
import { homeHeroCopy } from "@/i18n/hero-copy";
import { faqSchema } from "@/lib/seo";

export default function HomePage() {
  const hero = homeHeroCopy.en;
  return <>
    <JsonLd data={faqSchema(siteFaq)} />
    <section className="hero">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="hero-road" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <Eyebrow>Central Florida private transportation</Eyebrow>
          <h1><span className="sr-only">{hero.accessibleText}</span><span aria-hidden="true" className="hero-title-visual"><span className="hero-dynamic-line">{hero.lead}<RotatingHeroWord words={hero.words} /></span><br /><span data-hero-static-line>{hero.ending}</span></span></h1>
          <p>Private transportation for airport, corporate, cruise and city-to-city travel — coordinated around the details that matter.</p>
          <div className="hero-actions">
            <PrimaryCta placement="hero-primary" />
            <Link className="button button-ghost" href="/services">Explore services <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-footnote"><span>◌</span> Professional chauffeurs <span>◌</span> Private travel <span>◌</span> 24/7 availability</div>
        </div>
        <aside aria-labelledby="quote-title" className="quote-card">
          <p className="eyebrow">Plan your ride</p>
          <h2 id="quote-title">Ready when you are.</h2>
          <p className="quote-intro">Begin your request in Revival’s secure booking experience.</p>
          <ul className="quote-checklist">
            <li>Share your pickup and destination</li>
            <li>Choose the date and travel details</li>
            <li>Review the reservation with Revival</li>
          </ul>
          <BookingLink className="button button-dark button-full" placement="quick-quote">Start your reservation <span aria-hidden="true">↗</span></BookingLink>
          <p className="quote-note">You will enter your travel details once, directly in the booking experience.</p>
        </aside>
      </div>
    </section>

    <Section className="trust-section">
      <div className="container trust-grid">
        <div><span className="trust-symbol">01</span><strong>Private travel</strong><p>A scheduled experience built around your itinerary.</p></div>
        <div><span className="trust-symbol">02</span><strong>Professional chauffeurs</strong><p>Thoughtful service for confident travel.</p></div>
        <div><span className="trust-symbol">03</span><strong>Airport coordination</strong><p>Flight-change support is available on request.</p></div>
        <div><span className="trust-symbol">04</span><strong>24/7 availability</strong><p>Discuss your trip timing when you book.</p></div>
      </div>
    </Section>

    <GoogleReviews />

    <Section>
      <div className="container">
        <SectionHeading eyebrow="How we can help" text="Explore the services Revival currently offers for airport, business, cruise and local travel." title="Transportation tailored to the way you move." />
        <div className="service-grid">
          {services.slice(0, 6).map((service, index) => <ServiceCard index={index} key={service.slug} service={service} totalServices={6} />)}
        </div>
        <div className="center-action"><Link className="button button-outline" href="/services">View all services <span aria-hidden="true">→</span></Link></div>
      </div>
    </Section>

    <Section className="fleet-section">
      <div className="container fleet-layout">
        <div>
          <SectionHeading eyebrow="Travel in comfort" text="Vehicle category and trip fit are confirmed with every reservation." title="A fleet with room for your plans." />
          <Link className="text-link" href="/fleet">Explore the fleet <span aria-hidden="true">→</span></Link>
        </div>
        <div aria-label="Fleet categories" className="fleet-scroll">
          {fleet.map((vehicle) => <FleetCard key={vehicle.name} vehicle={vehicle} />)}
        </div>
      </div>
    </Section>

    <Section className="routes-section">
      <div className="container">
        <SectionHeading eyebrow="Popular routes" text="Each reservation is confirmed around the travel party, timing and destination." title="Start with the routes travelers ask for most." />
        <div className="route-grid">
          {routes.map((route) => <article className="route-card" key={route.slug}>
            <p>{route.origin}</p><div className="route-line"><span /><i>→</i><span /></div><h3>{route.destination}</h3><p>{route.intro}</p><ArrowLink href={`/routes/${route.slug}`}>Plan this route</ArrowLink>
          </article>)}
        </div>
      </div>
    </Section>

    <Section className="process-section">
      <div className="container">
        <SectionHeading eyebrow="From plan to pickup" title="A clear process from the first detail." />
        <ol className="process-list">
          <li><span>01</span><div><h3>Share your trip</h3><p>Choose booking or contact and provide your pickup, destination and timing.</p></div></li>
          <li><span>02</span><div><h3>Confirm the details</h3><p>The reservation is reviewed for availability and the right travel arrangement.</p></div></li>
          <li><span>03</span><div><h3>Travel with confidence</h3><p>Your private transportation is coordinated around the confirmed itinerary.</p></div></li>
        </ol>
      </div>
    </Section>

    <Section className="mobile-app-section">
      <div className="container mobile-app-layout">
        <div className="mobile-app-copy">
          <Eyebrow>Revival mobile web app</Eyebrow>
          <h2>Your ride, one scan away.</h2>
          <p>Keep your trip details close at hand, no matter where you are.</p>
          <div className="mobile-app-tags"><span>Mobile ready</span><span>Quick access</span><span>Travel details</span></div>
          <BookingLink className="button button-gold" placement="mobile-web-app">Open the mobile web app <span aria-hidden="true">↗</span></BookingLink>
          <p className="mobile-app-note">Designed for mobile devices.</p>
        </div>
        <aside className="mobile-app-access" aria-label="Open the Revival Transportation Group mobile web app">
          <div className="mobile-app-access-copy"><span className="mobile-app-mark">R</span><p>Revival on your phone</p><h3>Scan to open.</h3><small>Use your phone camera to continue.</small></div>
          <div className="mobile-app-phone">
            <span aria-hidden="true" className="mobile-app-phone-speaker" />
            <div className="mobile-app-qr-plate"><div className="mobile-app-qr-crop"><Image alt="QR code to open the Revival Transportation Group mobile web app" className="mobile-app-qr" height={349} src="/images/revival-mobile-app-qr.png" unoptimized width={345} /></div><span>Scan with your phone camera</span></div>
          </div>
        </aside>
      </div>
    </Section>

    <Section className="corporate-panel">
      <div className="container corporate-grid">
        <div><Eyebrow>For your business</Eyebrow><h2>Executive travel should feel effortless.</h2><p>From airport arrivals to multi-stop days, Revival gives executives, assistants and business travelers a clear private transportation option.</p><Link className="button button-light" href="/corporate">Corporate transportation <span aria-hidden="true">→</span></Link></div>
        <div className="corporate-stat"><span>Private</span><strong>Business travel, on your itinerary.</strong><p>Request corporate transportation details directly with Revival.</p></div>
      </div>
    </Section>

    <Section className="area-section">
      <div className="container area-grid">
        <div><Eyebrow>Where we travel</Eyebrow><h2>Built around Central Florida.</h2><p>From MCO and SFB to Port Canaveral, Revival helps travelers move comfortably across Central Florida.</p><Link className="text-link" href="/service-areas">Explore service areas <span aria-hidden="true">→</span></Link></div>
        <CentralFloridaMap />
      </div>
    </Section>

    <Section>
      <div className="container faq-layout"><div><SectionHeading eyebrow="Helpful answers" text="For trip-specific questions, the reservation team confirms details directly." title="A few details before you book." /></div><FaqList items={siteFaq} /></div>
    </Section>

    <Section className="final-cta">
      <div className="container"><Eyebrow>Ready when you are</Eyebrow><h2>Let’s get your travel details in motion.</h2><p>Start with a reservation, or contact Revival for a custom trip.</p><div><PrimaryCta placement="final-cta" /><Link className="button button-ghost-light" href="/contact">Contact Revival <span aria-hidden="true">→</span></Link></div></div>
    </Section>
  </>;
}
