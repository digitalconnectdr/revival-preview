import Link from "next/link";
import type { ReactNode } from "react";
import { BookingLink } from "@/components/booking-link";

export function Eyebrow({ children }: { children: ReactNode }) { return <p className="eyebrow">{children}</p>; }
export function Section({ children, className = "" }: { children: ReactNode; className?: string }) { return <section className={`section ${className}`}>{children}</section>; }
export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: ReactNode }) { return <section className="page-hero"><div className="container"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{intro}</p>{children}</div></section>; }
export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) { return <div className="section-heading"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div>; }
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) { return <Link className="text-link" href={href}>{children} <span aria-hidden="true">→</span></Link>; }
export function PrimaryCta({ placement = "cta", label = "Book your ride" }: { placement?: string; label?: string }) { return <BookingLink className="button button-gold" placement={placement}>{label} <span aria-hidden="true">↗</span></BookingLink>; }
export function FaqList({ items }: { items: { question: string; answer: string }[] }) { return <div className="faq-list">{items.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>; }
export function Breadcrumbs({ items, label = "Breadcrumb" }: { items: { label: string; href?: string }[]; label?: string }) { return <nav className="breadcrumbs" aria-label={label}>{items.map((item, index) => <span key={item.label}>{index > 0 && <span aria-hidden="true">/</span>}{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>; }
