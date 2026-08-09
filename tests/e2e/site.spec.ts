import { expect, test } from "@playwright/test";

test("homepage has the primary booking call to action", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /arrive with purpose/i })).toBeVisible();
  await expect(page.locator(".hero .button").first()).toBeVisible();
});

test("service page has unique content and a booking CTA", async ({ page }) => {
  await page.goto("/services/airport-transfers");
  await expect(page.getByRole("heading", { name: /orlando airport transfers/i })).toBeVisible();
  await expect(page.locator(".page-hero .button")).toBeVisible();
});

test("keeps preview language controls limited to the verified English experience", async ({ page }) => {
  const paths = ["/", "/services/airport-transfers", "/contact"];

  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByLabel("Site language: English")).toHaveCount(2);
    await expect(page.getByRole("button", { name: /español|português/i })).toHaveCount(0);
  }
});

test("sends travelers to the verified reservation experience without duplicate quick-form fields", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".quote-card input, .quote-card select")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /start your reservation/i }).first()).toHaveAttribute("href", "https://pwa.mylimobiz.com/revivaltransportationgroup/");
});

test("uses direct verified contact channels until an inquiry delivery service is connected", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("link", { name: "Call Revival", exact: true })).toHaveAttribute("href", "tel:+16897775636");
  await expect(page.getByRole("link", { name: /email revival/i })).toHaveAttribute("href", "mailto:info@revivaltransportationgroup.com");
  await expect(page.getByRole("button", { name: /send inquiry/i })).toHaveCount(0);
});

test("publishes local-intent metadata and substantive route content", async ({ page }) => {
  await page.goto("/routes/mco-to-port-canaveral");
  await expect(page).toHaveTitle(/MCO to Port Canaveral Private Transportation/i);
  await expect(page.getByText("Route questions", { exact: true })).toBeVisible();
  await expect(page.getByText("Can the vehicle be planned around cruise luggage?")).toBeVisible();
  await expect(page.getByText("Related services and routes.")).toBeVisible();
});

test("avoids horizontal overflow on the principal page types", async ({ page }) => {
  for (const path of ["/", "/services", "/routes/mco-to-port-canaveral", "/contact", "/service-areas"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const overflowing = [...document.querySelectorAll<HTMLElement>("body *")]
        .filter((element) => element.getBoundingClientRect().right > viewportWidth + 1)
        .map((element) => ({
          className: element.className,
          right: Math.round(element.getBoundingClientRect().right),
          tagName: element.tagName,
        }));

      return { hasOverflow: document.documentElement.scrollWidth > viewportWidth, overflowing };
    });
    expect(overflow.hasOverflow, `horizontal overflow at ${path}: ${JSON.stringify(overflow.overflowing.slice(0, 6))}`).toBe(false);
  }
});
