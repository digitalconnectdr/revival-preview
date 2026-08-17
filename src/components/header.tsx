"use client";

import Link from "next/link";
import { useState } from "react";
import { BookingLink } from "@/components/booking-link";
import { SitePreferences } from "@/components/site-preferences";
import { TrackedContactLink } from "@/components/tracked-contact-link";
import { business } from "@/content/business";
import { localizedPath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";
import { phoneHref } from "@/lib/site";

const navigation = [{ href: "/services", key: "services" }, { href: "/fleet", key: "fleet" }, { href: "/service-areas", key: "serviceAreas" }, { href: "/corporate", key: "corporate" }, { href: "/about", key: "about" }] as const;

export function Header({ locale = "en" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const phone = business.phone.value ?? "";
  const copy = getUi(locale);
  const localized = (path: string) => localizedPath(locale, path);
  const bookingHref = localized("/book");
  const utilityText = locale === "es" ? "Transporte privado • Florida Central y el noreste" : locale === "pt" ? "Transporte privativo • Flórida Central e Nordeste" : "Private transportation • Central Florida & Northeast";

  return <header className="site-header">
    <div className="utility-bar"><div className="container utility-inner"><span>{utilityText}</span><TrackedContactLink channel="phone" href={phoneHref(phone)} placement="utility">{copy.call} {phone}</TrackedContactLink></div></div>
    <div className="container nav-shell">
      <Link aria-label="Revival Transportation Group" className="brand notranslate" data-no-translate href={localized("/")} onClick={() => setOpen(false)} translate="no"><span aria-hidden="true" className="brand-mark" /><span aria-hidden="true"><strong>Revival</strong><small>Transportation Group</small></span></Link>
      <nav aria-label={copy.primaryNavigation} className="desktop-nav">{navigation.map((item) => <Link href={localized(item.href)} key={item.href}>{copy[item.key]}</Link>)}</nav>
      <div className="desktop-actions"><SitePreferences locale={locale} /><TrackedContactLink aria-label={`${copy.call} Revival Transportation Group at ${phone}`} channel="phone" className="phone-link" href={phoneHref(phone)} placement="header">{copy.call}</TrackedContactLink><BookingLink className="button button-gold button-small" href={bookingHref} placement="header">{copy.bookRide} <span aria-hidden="true">↗</span></BookingLink></div>
      <button aria-controls="mobile-menu" aria-expanded={open} className="menu-toggle" onClick={() => setOpen(!open)} type="button"><span className="sr-only">{open ? copy.closeMenu : copy.openMenu}</span><span /><span /><span /></button>
    </div>
    <div className={`mobile-menu ${open ? "is-open" : ""}`} hidden={!open} id="mobile-menu"><nav aria-label={copy.mobileNavigation}>{navigation.map((item) => <Link href={localized(item.href)} key={item.href} onClick={() => setOpen(false)}>{copy[item.key]}</Link>)}<Link href={localized("/contact")} onClick={() => setOpen(false)}>{copy.contact}</Link><div className="mobile-preferences"><SitePreferences locale={locale} /></div><BookingLink className="button button-gold" href={bookingHref} placement="mobile-menu">{copy.bookRide} <span aria-hidden="true">↗</span></BookingLink></nav></div>
  </header>;
}
