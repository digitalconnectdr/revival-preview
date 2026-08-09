import type { Metadata } from "next";
import { PageHero, Section } from "@/components/site-components";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

// English route.

export const metadata: Metadata = pageMetadata("Reviews", "Read the latest public reviews for Revival Transportation Group on Google.", "/reviews");
export default function ReviewsPage() { return <><PageHero eyebrow="Public feedback" title="Read current reviews at the source." intro="Review totals and ratings can change, so Revival’s website directs travelers to the current public Google profile rather than displaying a frozen rating." /><Section><div className="container review-source"><p className="eyebrow">Google reviews</p><h2>View the latest public feedback.</h2><p>For accuracy, this page does not repeat anonymous or outdated testimonials. Use the link below to view the most current information available on Google.</p><a className="button button-dark" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query_place_id=${business.googlePlaceId.value}&query=Revival%20Transportation%20Group`}>Open Google reviews <span aria-hidden="true">↗</span></a></div></Section></>; }
