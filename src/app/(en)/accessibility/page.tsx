import type { Metadata } from "next";
import { PageHero, Section } from "@/components/site-components";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

// English route.

export const metadata: Metadata = pageMetadata("Accessibility", "Accessibility commitment for Revival Transportation Group.", "/accessibility");
export default function AccessibilityPage() { return <><PageHero eyebrow="Accessibility" title="Designed for clear, usable travel planning." intro="We want every visitor to be able to explore services and plan transportation with ease." /><Section><article className="container legal-content"><h2>Our approach</h2><p>This website includes clear headings, labeled form controls, keyboard-friendly navigation, visible focus states and layouts that adapt across screen sizes.</p><h2>Need assistance?</h2><p>If you have difficulty using the website or need help with a transportation request, call {business.phone.value} or email {business.email.value}.</p><h2>Ongoing improvements</h2><p>Accessibility is part of how Revival continues to improve the travel-planning experience.</p></article></Section></>; }
