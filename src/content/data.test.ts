import { describe, expect, it } from "vitest";
import { airports, fleet, routes, services } from "@/content/data";
import { business } from "@/content/business";

describe("published content", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = [...services, ...airports, ...routes].map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9-]+$/.test(slug))).toBe(true);
  });

  it("does not leak the legacy placeholder contact details", () => {
    const serialized = JSON.stringify({ business, services, fleet, routes, airports });
    expect(serialized).not.toContain("123-123-1234");
    expect(serialized).not.toContain("info@domain.com");
  });

  it("does not publish a disputed group capacity as a number", () => {
    const groupVehicle = fleet.find((vehicle) => vehicle.name === "Group Transportation");
    expect(groupVehicle?.capacity).toBe("Confirmed with reservation");
  });
});
