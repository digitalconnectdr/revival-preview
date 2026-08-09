"use client";

import Link from "next/link";
import { useState } from "react";
import { BookingLink } from "@/components/booking-link";
import { SitePreferences } from "@/components/site-preferences";
import { navItems } from "@/content/data";
import { business } from "@/content/business";
import { phoneHref } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const phone = business.phone.value ?? "";

  return (
    <header className="site-header">
      <div className="utility-bar"><div className="container utility-inner"><span>Private transportation • Central Florida</span><a href={phoneHref(phone)}>Call {phone}</a></div></div>
      <div className="container nav-shell">
        <Link className="brand notranslate" data-no-translate href="/" translate="no" aria-label="Revival Transportation Group home" onClick={() => setOpen(false)}><span className="brand-mark">R</span><span><strong>Revival</strong><small>Transportation Group</small></span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
        <div className="desktop-actions"><SitePreferences /><a className="phone-link" href={phoneHref(phone)} aria-label={`Call Revival Transportation Group at ${phone}`}>Call</a><BookingLink className="button button-gold button-small" placement="header">Book a ride <span aria-hidden="true">↗</span></BookingLink></div>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><span className="sr-only">{open ? "Close" : "Open"} menu</span><span /><span /><span /></button>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} hidden={!open}>
        <nav aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)}>Contact</Link><div className="mobile-preferences"><SitePreferences /></div><BookingLink className="button button-gold" placement="mobile-menu">Book a ride <span aria-hidden="true">↗</span></BookingLink></nav>
      </div>
    </header>
  );
}
