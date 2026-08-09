import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { business } from "@/content/business";
import { routes, services } from "@/content/data";
import { phoneHref } from "@/lib/site";

export function Footer() {
  const phone = business.phone.value ?? "";
  const email = business.email.value ?? "";
  return <footer className="site-footer"><div className="container footer-grid"><div><Link className="brand brand-footer notranslate" data-no-translate href="/" translate="no"><span className="brand-mark">R</span><span><strong>Revival</strong><small>Transportation Group</small></span></Link><p>Private transportation for airport, corporate, cruise and city-to-city travel.</p><BookingLink className="text-link" placement="footer">Start your reservation <span aria-hidden="true">↗</span></BookingLink></div><div><h2>Services</h2><ul>{services.slice(0, 5).map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.name}</Link></li>)}</ul></div><div><h2>Popular routes</h2><ul>{routes.map((route) => <li key={route.slug}><Link href={`/routes/${route.slug}`}>{route.title}</Link></li>)}</ul></div><div><h2>Contact</h2><ul><li><a href={phoneHref(phone)}>{phone}</a></li><li><a href={`mailto:${email}`}>{email}</a></li><li>Mailing address: {business.mailingAddress.value}</li></ul></div></div><div className="container footer-bottom"><span className="footer-credit notranslate" data-no-translate translate="no">© {new Date().getFullYear()} Revival Transportation Group <b aria-hidden="true">|</b> Powered by <a href="https://digitalconnectdr.com/" target="_blank" rel="noreferrer">JPRS Digital Connect</a></span><span><Link href="/privacy-policy">Privacy</Link><Link href="/terms-of-service">Terms</Link><Link href="/accessibility">Accessibility</Link></span></div></footer>;
}
