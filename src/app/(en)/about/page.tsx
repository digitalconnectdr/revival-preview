import type { Metadata } from "next";
import { TrackedContactLink } from "@/components/tracked-contact-link";
import { PageHero, Section, SectionHeading } from "@/components/site-components";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";
import { phoneHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata("About", "Learn about Revival Transportation Group and its private transportation services.", "/about");

export default function AboutPage() {
  const phone = business.phone.value ?? "";
  const email = business.email.value ?? "";
  const instagram = business.socialProfiles.value?.find((profile) => profile.platform === "instagram" && profile.verified);
  return <>
    <PageHero eyebrow="About Revival" title="Private transportation, with a more considered standard." intro="Revival Transportation Group offers airport, corporate, cruise, city-to-city and local private transportation." />
    <Section><div className="container split-copy"><div><SectionHeading eyebrow="The Revival approach" title="Transportation that simply makes sense." /><p>At Revival Transportation Group, our mission is simple: to provide safe, reliable and professional transportation for individuals, families and businesses across Central Florida and key Northeast markets.</p><p>From reservation to arrival, our focus is punctuality, comfort and peace of mind. Every trip is planned with care, every vehicle is professionally maintained, and every chauffeur is prepared to deliver a courteous experience.</p><p>Whether you are traveling for business, heading to the airport, visiting Orlando or arranging a special occasion, we tailor each ride around the details that matter—with consistency you can count on.</p></div><aside className="facts-card" aria-label="Revival Transportation Group contact information"><div className="facts-card-heading"><span>Contact details</span><p>Revival Transportation Group</p></div><dl className="facts-list"><div><dt>Phone</dt><dd><TrackedContactLink channel="phone" href={phoneHref(phone)} placement="about">{phone}</TrackedContactLink></dd></div><div><dt>Email</dt><dd><TrackedContactLink channel="email" href={`mailto:${email}`} placement="about">{email}</TrackedContactLink></dd></div><div><dt>Mailing address</dt><dd>{business.mailingAddress.value}</dd></div></dl>{instagram && <TrackedContactLink channel="instagram" className="text-link" href={instagram.url} placement="about" rel="noopener noreferrer" target="_blank">Revival Transportation Group on Instagram <span aria-hidden="true">↗</span></TrackedContactLink>}<p className="facts-card-note"><i aria-hidden="true" />{business.availability.value}</p></aside></div></Section>
    <Section className="soft-section"><div className="container three-note-grid"><div><span>01</span><h2>Personal attention</h2><p>Clear communication helps every ride begin on the right note.</p></div><div><span>02</span><h2>Private travel</h2><p>Airport, corporate, cruise, local and city-to-city travel can be planned around your day.</p></div><div><span>03</span><h2>Details first</h2><p>Your itinerary, party and timing shape the experience from pickup to arrival.</p></div></div></Section>
  </>;
}
