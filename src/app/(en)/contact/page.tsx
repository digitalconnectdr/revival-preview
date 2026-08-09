import type { Metadata } from "next";
import { TrackedContactLink } from "@/components/tracked-contact-link";
import { PageHero, Section } from "@/components/site-components";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";
import { phoneHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata("Contact", "Contact Revival Transportation Group for private transportation and custom trip requests.", "/contact");

export default function ContactPage() {
  const phone = business.phone.value ?? "";
  const email = business.email.value ?? "";
  const instagram = business.socialProfiles.value?.find((profile) => profile.platform === "instagram" && profile.verified);
  return <><PageHero eyebrow="Get in touch" title="Start with the details of your trip." intro="Call or email Revival for airport, corporate, group and custom transportation questions." /><Section><div className="container contact-layout"><div className="contact-details"><p className="eyebrow">Contact Revival</p><h2>We’ll help you plan the next move.</h2><TrackedContactLink channel="phone" href={phoneHref(phone)} placement="contact">{phone}</TrackedContactLink><TrackedContactLink channel="email" href={`mailto:${email}`} placement="contact">{email}</TrackedContactLink><p><strong>Mailing address</strong><br />{business.mailingAddress.value}</p>{instagram && <TrackedContactLink channel="instagram" href={instagram.url} placement="contact" rel="noopener noreferrer" target="_blank">Revival Transportation Group on Instagram ↗</TrackedContactLink>}</div><aside className="contact-action-card"><p className="eyebrow">Direct assistance</p><h2>Talk with the Revival team.</h2><p>For a faster response, contact Revival directly with your pickup, destination, date and passenger details.</p><div><TrackedContactLink channel="phone" className="button button-gold" href={phoneHref(phone)} placement="contact-cta">Call Revival <span aria-hidden="true">→</span></TrackedContactLink><TrackedContactLink channel="email" className="button button-outline" href={`mailto:${email}`} placement="contact-cta">Email Revival <span aria-hidden="true">→</span></TrackedContactLink></div><small>Online inquiries will return when a verified delivery service is connected.</small></aside></div></Section></>;
}
