import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero, Section } from "@/components/site-components";
import { business } from "@/content/business";
import { phoneHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Contact", "Contact Revival Transportation Group for private transportation and custom trip requests.", "/contact");
export default function ContactPage() { const phone = business.phone.value ?? ""; const email = business.email.value ?? ""; return <><PageHero eyebrow="Get in touch" title="Start with the details of your trip." intro="Call, email or use the inquiry form for airport, corporate, group and custom transportation questions." /><Section><div className="container contact-layout"><div className="contact-details"><p className="eyebrow">Contact Revival</p><h2>We’ll help you plan the next move.</h2><a href={phoneHref(phone)}>{phone}</a><a href={`mailto:${email}`}>{email}</a><p><strong>Mailing address</strong><br />{business.mailingAddress.value}</p></div><div><ContactForm /></div></div></Section></>; }
