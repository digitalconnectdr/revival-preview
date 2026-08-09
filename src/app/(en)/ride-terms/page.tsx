import type { Metadata } from "next";
import { PageHero, Section } from "@/components/site-components";
import { pageMetadata } from "@/lib/seo";

// English route.

export const metadata: Metadata = pageMetadata("Ride Terms", "Ride information for Revival Transportation Group.", "/ride-terms");
export default function RideTermsPage() { return <><PageHero eyebrow="Ride information" title="Travel with comfort and consideration." intro="Your reservation details are reviewed with you before travel so everyone can enjoy a smooth ride." /><Section><article className="container legal-content"><h2>During your ride</h2><p>For everyone’s comfort, smoking, eating and behavior that could damage the vehicle or affect safety are not permitted.</p><h2>Trip details</h2><p>Timing, luggage, accessibility needs, child seats, tolls and any special requests are best discussed when arranging your ride. Revival will help you plan the details that matter.</p><h2>Need assistance?</h2><p>Call or email Revival with any questions about an upcoming reservation.</p></article></Section></>; }
