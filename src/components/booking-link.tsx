"use client";

import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { trackBookingCtaClick } from "@/lib/analytics";

type BookingLinkProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & { placement?: string };

const allowedCampaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];

export function BookingLink({ children, placement, href, onClick, ...props }: BookingLinkProps) {
  const bookingHref = href ?? "/book";
  return (
    <a
      href={bookingHref}
      onClick={(event) => {
        trackBookingCtaClick(placement ?? "booking-link");
        try {
          const locale = window.location.pathname.match(/^\/(es|pt)(?:\/|$)/)?.[1];
          const localBookingPath = bookingHref === "/book" && locale ? `/${locale}/book` : bookingHref;
          const destination = new URL(localBookingPath, window.location.origin);
          const source = new URLSearchParams(window.location.search);
          allowedCampaignKeys.forEach((key) => {
            const value = source.get(key);
            if (value) destination.searchParams.set(key, value);
          });
          if (placement) destination.searchParams.set("utm_content", placement);
          event.currentTarget.href = `${destination.pathname}${destination.search}`;
        } catch {
          // Keep the internal booking route as a safe non-JavaScript fallback.
        }
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
