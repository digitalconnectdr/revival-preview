import type { Metadata } from "next";
import { FaqList, PageHero, Section } from "@/components/site-components";
import { JsonLd } from "@/components/json-ld";
import { siteFaq } from "@/content/data";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Frequently Asked Questions", "Answers to common questions about booking private transportation with Revival Transportation Group.", "/faq");
export default function FaqPage() { return <><JsonLd data={faqSchema(siteFaq)} /><PageHero eyebrow="Helpful answers" title="Questions before you travel." intro="Start here for straightforward answers about booking, service coverage and vehicle categories." /><Section><div className="container narrow-content"><FaqList items={siteFaq} /></div></Section></>; }
