import type { Metadata } from "next";
import { PageHero, Section } from "@/components/site-components";
import { pageMetadata } from "@/lib/seo";

// English route.

export const metadata: Metadata = pageMetadata("Terms of Service", "Terms of service for Revival Transportation Group.", "/terms-of-service");
export default function TermsPage() { return <><PageHero eyebrow="Terms" title="Clear details for every ride." intro="Reservations are arranged around availability and the travel details you share with Revival." /><Section><article className="container legal-content"><h2>Reservations</h2><p>Vehicle availability, pickup details, pricing and payment requirements are reviewed as part of the reservation process. A reservation is complete once Revival confirms the trip with you.</p><h2>Changes and cancellations</h2><p>If your plans change, contact Revival as soon as possible. The team will explain the options available for your reservation.</p><h2>Questions</h2><p>For help with an upcoming ride, call or email Revival Transportation Group directly.</p></article></Section></>; }
