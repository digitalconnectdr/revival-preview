import type { Metadata } from "next";
import { BookingExperience } from "@/components/booking-experience";
import { PageHero, Section } from "@/components/site-components";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Book Private Transportation",
  "Book airport transfers, chauffeur transportation and private rides online with Revival Transportation Group.",
  "/book",
);

export default function BookPage() {
  return <>
    <PageHero
      eyebrow="Revival online reservation"
      title="Book your transportation."
      intro="Reserve airport transfers, chauffeur transportation and private rides with Revival Transportation Group."
    />
    <Section>
      <div className="container">
        <BookingExperience
          assistanceEyebrow="Need assistance?"
          assistanceTitle="Talk with Revival."
          contactHref="/contact"
          contactLabel="Contact Revival"
          ctaLabel="Start secure reservation"
          eyebrow="Revival online reservation"
          intro="Continue to Revival’s secure reservation system to enter your trip details."
          support="For corporate accounts, group travel or a complex itinerary, contact the Revival team directly."
          title="Ready to reserve your ride?"
        />
      </div>
    </Section>
  </>;
}
