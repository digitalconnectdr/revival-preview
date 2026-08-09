export type FactStatus =
  | "site_verified"
  | "client_approved"
  | "pending"
  | "conflict"
  | "rejected";

export interface BusinessFact<T> {
  value: T | null;
  status: FactStatus;
  source?: string;
  notes?: string;
}

export const business = {
  brandName: {
    value: "Revival Transportation Group",
    status: "site_verified",
    source: "Current public website audit, 2026-08-05",
  },
  phone: {
    value: "+1 689-777-5636",
    status: "site_verified",
    source: "Current footer, booking and legal pages",
  },
  email: {
    value: "info@revivaltransportationgroup.com",
    status: "site_verified",
    source: "Current footer and legal pages",
  },
  mailingAddress: {
    value: "P.O. Box 137740, Clermont, FL 34713-7740",
    status: "site_verified",
    source: "Current footer and legal pages",
    notes: "Mailing address only; never present it as a passenger-facing office.",
  },
  canonicalUrl: {
    value: "https://revivaltransportationgroup.com",
    status: "site_verified",
  },
  bookingUrl: {
    value: "https://pwa.mylimobiz.com/revivaltransportationgroup/",
    status: "site_verified",
  },
  googlePlaceId: {
    value: "ChIJyVjN6U4KtmwRCBFtstoGtAg",
    status: "site_verified",
  },
  availability: {
    value: "24/7 availability",
    status: "site_verified",
    notes: "Confirm the precise operational scope before production.",
  },
  legalName: {
    value: "Revival Transportation Group LLC",
    status: "pending",
    notes: "TODO_CLIENT_APPROVAL: verify before legal pages or production schema.",
  },
  physicalAddress: {
    value: null,
    status: "pending",
    notes: "TODO_CLIENT_APPROVAL: no public physical address has been verified.",
  },
  socialProfiles: {
    value: [],
    status: "pending",
    notes: "TODO_CLIENT_APPROVAL: add only official, client-confirmed profiles.",
  },
} as const satisfies Record<string, BusinessFact<unknown>>;

export const verified = <T>(fact: BusinessFact<T>) => fact.value;
