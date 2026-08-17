import type { Metadata } from "next";
import { BookingLink } from "@/components/booking-link";
import { TrackedContactLink } from "@/components/tracked-contact-link";
import { PageHero, Section } from "@/components/site-components";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";
import { phoneHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata("Contact", "Contact Revival Transportation Group for general, corporate, group and custom transportation inquiries.", "/contact");

export default function ContactPage() {
  const phone = business.phone.value ?? "";
  const email = business.email.value ?? "";
  const instagram = business.socialProfiles.value?.find((profile) => profile.platform === "instagram" && profile.verified);
  return <>
    <PageHero eyebrow="Get in touch" title="Start with the details of your trip." intro="For a standard transportation reservation, book online. Contact Revival for general, corporate, group and custom transportation questions." />
    <Section>
      <div className="container contact-layout">
        <div className="contact-details">
          <p className="eyebrow">Contact Revival</p><h2>We’ll help you plan the next move.</h2>
          <TrackedContactLink channel="phone" href={phoneHref(phone)} placement="contact">{phone}</TrackedContactLink>
          <TrackedContactLink channel="email" href={`mailto:${email}`} placement="contact">{email}</TrackedContactLink>
          <p><strong>Mailing address</strong><br />{business.mailingAddress.value}</p>
          {instagram && <TrackedContactLink channel="instagram" href={instagram.url} placement="contact" rel="noopener noreferrer" target="_blank">Revival Transportation Group on Instagram ↗</TrackedContactLink>}
        </div>
        <aside className="contact-action-card">
          <p className="eyebrow">Choose the right next step</p><h2>Book a ride or contact the team.</h2>
          <p>Need to reserve airport transportation, a chauffeur service or a point-to-point ride? Book online. For corporate accounts, groups, events and complex itineraries, contact Revival directly.</p>
          <div><BookingLink className="button button-gold" placement="contact-book">Book transportation <span aria-hidden="true">→</span></BookingLink><TrackedContactLink channel="phone" className="button button-outline" href={phoneHref(phone)} placement="contact-cta">Call Revival <span aria-hidden="true">→</span></TrackedContactLink></div>
          <small>General and corporate inquiries are available by phone or email.</small>
        </aside>
      </div>
    </Section>
  </>;
}
