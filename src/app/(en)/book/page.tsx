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
      eyebrow="Secure online reservation"
      title="Book your transportation."
      intro="Reserve airport transfers, chauffeur transportation and private rides through Revival’s official booking experience."
    />
    <Section>
      <div className="container">
        <BookingExperience
          eyebrow="Revival online booking"
          frameTitle="Revival Transportation Group secure online booking"
          intro="Enter your trip details below to begin a secure reservation with Revival Transportation Group."
          openLabel="Open booking in a new window"
          support="For corporate accounts, group travel or a complex itinerary, contact the Revival team directly."
          title="Plan your ride with MyLimoBiz."
        />
      </div>
    </Section>
  </>;
}
