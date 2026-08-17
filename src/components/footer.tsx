import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { CookiePreferencesLink } from "@/components/google-tag";
import { TrackedContactLink } from "@/components/tracked-contact-link";
import { business } from "@/content/business";
import { getLocalizedRoutes, getLocalizedServices } from "@/i18n/content";
import { localizedPath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";
import { phoneHref } from "@/lib/site";

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const phone = business.phone.value ?? "";
  const email = business.email.value ?? "";
  const copy = getUi(locale);
  const localized = (route: string) => localizedPath(locale, route);
  const instagram = business.socialProfiles.value?.find((profile) => profile.platform === "instagram" && profile.verified);
  const services = getLocalizedServices(locale);
  const routes = getLocalizedRoutes(locale);

  return <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <Link aria-label="Revival Transportation Group" className="brand brand-footer notranslate" data-no-translate href={localized("/")} translate="no">
          <span aria-hidden="true" className="brand-mark">R</span>
          <span aria-hidden="true"><strong>Revival</strong><small>Transportation Group</small></span>
        </Link>
        <p>{copy.footerIntro}</p>
        <BookingLink className="text-link" placement="footer">{copy.startReservation} <span aria-hidden="true">↗</span></BookingLink>
        {instagram && <TrackedContactLink aria-label={copy.instagramLabel} channel="instagram" className="instagram-link" href={instagram.url} placement="footer" rel="noopener noreferrer" target="_blank"><span aria-hidden="true">◎</span> @{instagram.username}</TrackedContactLink>}
      </div>
      <div><h2>{copy.services}</h2><ul>{services.slice(0, 5).map((service) => <li key={service.slug}><Link href={localized(`/services/${service.slug}`)}>{service.name}</Link></li>)}</ul></div>
      <div><h2>{copy.popularRoutes}</h2><ul>{routes.map((route) => <li key={route.slug}><Link href={localized(`/routes/${route.slug}`)}>{route.title}</Link></li>)}</ul></div>
      <div><h2>{copy.contact}</h2><ul><li><TrackedContactLink channel="phone" href={phoneHref(phone)} placement="footer">{phone}</TrackedContactLink></li><li><TrackedContactLink channel="email" href={`mailto:${email}`} placement="footer">{email}</TrackedContactLink></li><li>{copy.mailingAddress}: {business.mailingAddress.value}</li></ul></div>
    </div>
    <div className="container footer-bottom">
      <span className="footer-credit notranslate" data-no-translate translate="no">© {new Date().getFullYear()} Revival Transportation Group <b aria-hidden="true">|</b> Powered by <a href="https://digitalconnectdr.com/" rel="noopener noreferrer" target="_blank">JPRS Digital Connect</a></span>
      <span><Link href={localized("/privacy-policy")}>{copy.privacy}</Link><Link href={localized("/terms-of-service")}>{copy.terms}</Link><Link href={localized("/accessibility")}>{copy.accessibility}</Link><CookiePreferencesLink>{copy.cookiePreferences}</CookiePreferencesLink></span>
    </div>
  </footer>;
}
