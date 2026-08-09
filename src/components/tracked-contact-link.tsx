"use client";

import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { trackContactClick } from "@/lib/analytics";

type ContactChannel = "phone" | "email" | "corporate" | "instagram";
type TrackedContactLinkProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & { channel: ContactChannel; placement: string };

export function TrackedContactLink({ channel, children, onClick, placement, ...props }: TrackedContactLinkProps) {
  return <a {...props} onClick={(event) => { trackContactClick(channel, placement); onClick?.(event); }}>{children}</a>;
}
