import { expect, test } from "@playwright/test";

test("homepage has the primary booking call to action", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /arrive with purpose/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /book your ride/i }).first()).toBeVisible();
});

test("service page has unique content and a booking CTA", async ({ page }) => {
  await page.goto("/services/airport-transfers");
  await expect(page.getByRole("heading", { name: "Airport Transfers" })).toBeVisible();
  await expect(page.getByRole("link", { name: /book your ride/i })).toBeVisible();
});
