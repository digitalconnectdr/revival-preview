"use client";

import { useEffect } from "react";
import { trackBookingExternalOpen, trackBookingPageView, trackBookingStarted } from "@/lib/analytics";
import { bookingUrl } from "@/lib/site";

type BookingExperienceProps = {
  eyebrow: string;
  title: string;
  intro: string;
  ctaLabel: string;
  assistanceEyebrow: string;
  assistanceTitle: string;
  support: string;
  contactLabel: string;
  contactHref: string;
};

export function BookingExperience({ eyebrow, title, intro, ctaLabel, assistanceEyebrow, assistanceTitle, support, contactLabel, contactHref }: BookingExperienceProps) {
  useEffect(() => {
    trackBookingPageView();
  }, []);

  return (
    <section className="booking-experience" aria-labelledby="booking-experience-title">
      <div className="booking-experience-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="booking-experience-title">{title}</h2>
        <p>{intro}</p>
      </div>
      <div className="booking-experience-action">
        <span aria-hidden="true" className="booking-experience-mark">R</span>
        <a className="button button-gold" href={bookingUrl} onClick={() => { trackBookingStarted("secure-booking-cta"); trackBookingExternalOpen("secure-booking-cta"); }} rel="noopener noreferrer" target="_blank">
          {ctaLabel} <span aria-hidden="true">↗</span>
        </a>
        <div className="booking-experience-support">
          <p className="eyebrow">{assistanceEyebrow}</p>
          <h3>{assistanceTitle}</h3>
          <p>{support}</p>
          <a className="text-link" href={contactHref}>{contactLabel} <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
