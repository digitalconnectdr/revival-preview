import type { Metadata } from "next";
import { PageHero, Section } from "@/components/site-components";
import { pageMetadata } from "@/lib/seo";

// English route.

export const metadata: Metadata = pageMetadata("Privacy Policy", "Privacy information for Revival Transportation Group.", "/privacy-policy");
export default function PrivacyPage() { return <><PageHero eyebrow="Privacy" title="A clear approach to your information." intro="Your trip details are handled with care when you contact Revival." /><Section><article className="container legal-content"><h2>Information you share</h2><p>When you contact Revival, you may share your name, phone number, email address and trip details. This information helps the team respond to your inquiry and arrange transportation.</p><h2>How information is used</h2><p>Information is used to communicate about reservations, coordinate travel and provide support. Revival does not sell personal information.</p><h2>Cookies and measurement</h2><p>If optional measurement is enabled, Revival may use Google measurement technologies to understand website visits and advertising performance. You can accept or decline optional measurement cookies when they are offered. Your choice does not affect your ability to contact Revival or request transportation.</p><h2>Questions</h2><p>For a privacy question about Revival Transportation Group, use the contact details shown on the Contact page.</p></article></Section></>; }
