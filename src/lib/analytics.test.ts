import { describe, expect, it } from "vitest";
import { consentFor, getTrackingContext } from "@/lib/analytics";

describe("measurement context", () => {
  it("adds locale, route information and permitted ad attribution values", () => {
    expect(getTrackingContext("/es/routes/mco-to-port-canaveral", "?utm_source=google&utm_campaign=cruise&gclid=abc123")).toMatchObject({
      locale: "es",
      page_path: "/es/routes/mco-to-port-canaveral",
      page_type: "route",
      route: "mco-to-port-canaveral",
      utm_source: "google",
      utm_campaign: "cruise",
      gclid: "abc123",
    });
  });

  it("uses the right Consent Mode v2 values for category choices", () => {
    expect(consentFor({ analytics: true, advertising: false })).toEqual({
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });
});
