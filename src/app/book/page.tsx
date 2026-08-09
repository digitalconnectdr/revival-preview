import type { Metadata } from "next";
import { BookingLink } from "@/components/booking-link";
import { PageHero, Section, SectionHeading } from "@/components/site-components";
import { business } from "@/content/business";
import { phoneHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Book a Ride", "Start a private transportation reservation with Revival Transportation Group.", "/book");
export default function BookPage() { const phone = business.phone.value ?? ""; return <><PageHero eyebrow="Start your reservation" title="A few details are all it takes to begin." intro="Continue to Revival’s booking experience to share your trip. You can also call if you need help with a custom itinerary." /><Section><div className="container booking-layout"><div><SectionHeading eyebrow="Before you begin" title="Have these details nearby." /><ul className="check-list"><li><span>✓</span>Pickup and destination</li><li><span>✓</span>Date and preferred travel time</li><li><span>✓</span>Passenger and luggage details</li><li><span>✓</span>Any flight, cruise or multi-stop information</li></ul></div><div className="booking-box"><p className="eyebrow">Secure booking</p><h2>Continue to Revival’s reservation experience.</h2><p>The booking link opens in a new tab. Campaign parameters are preserved where the external platform supports them; personal details are not added to the URL.</p><BookingLink className="button button-gold button-full" placement="book-page">Continue to booking <span aria-hidden="true">↗</span></BookingLink><a className="text-link" href={phoneHref(phone)}>Prefer to call? {phone} <span aria-hidden="true">→</span></a></div></div></Section></>; }
