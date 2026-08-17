"use client";

import { useEffect, useRef } from "react";
import { trackBookingExternalOpen, trackBookingPageView, trackBookingStarted } from "@/lib/analytics";
import { bookingUrl } from "@/lib/site";

type BookingExperienceProps = {
  eyebrow: string;
  title: string;
  intro: string;
  frameTitle: string;
  openLabel: string;
  support: string;
};

export function BookingExperience({ eyebrow, title, intro, frameTitle, openLabel, support }: BookingExperienceProps) {
  const hasTrackedLoad = useRef(false);

  useEffect(() => {
    trackBookingPageView();
  }, []);

  return (
    <section className="booking-experience" aria-labelledby="booking-engine-title">
      <div className="booking-experience-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="booking-engine-title">{title}</h2>
        <p>{intro}</p>
        <a className="text-link" href={bookingUrl} onClick={() => trackBookingExternalOpen("booking-page-fallback")} rel="noopener noreferrer" target="_blank">
          {openLabel} <span aria-hidden="true">↗</span>
        </a>
        <p className="booking-support">{support}</p>
      </div>
      <iframe
        className="booking-engine-frame"
        onLoad={() => {
          if (hasTrackedLoad.current) return;
          hasTrackedLoad.current = true;
          trackBookingStarted("embedded-booking-engine");
        }}
        src={bookingUrl}
        title={frameTitle}
      />
    </section>
  );
}
