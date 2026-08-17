"use client";

import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { trackBookingStart } from "@/lib/analytics";
import { bookingUrl } from "@/lib/site";

type BookingLinkProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & { placement?: string };

const allowedCampaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];

export function BookingLink({ children, placement, href, onClick, ...props }: BookingLinkProps) {
  return (
    <a
      href={href ?? bookingUrl}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => {
        trackBookingStart(placement ?? "booking-link");
        const base = href ?? bookingUrl;
        try {
          const destination = new URL(base);
          const source = new URLSearchParams(window.location.search);
          allowedCampaignKeys.forEach((key) => {
            const value = source.get(key);
            if (value) destination.searchParams.set(key, value);
          });
          if (placement) destination.searchParams.set("utm_content", placement);
          event.currentTarget.href = destination.toString();
        } catch {
          // Keep the verified booking URL as a safe non-JavaScript fallback.
        }
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
