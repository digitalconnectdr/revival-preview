import { expect, test } from "@playwright/test";

test("homepage has the primary booking call to action", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /arrive with purpose/i })).toBeVisible();
  await expect(page.locator(".hero .button").first()).toBeVisible();
});

test("rotates the premium hero word without moving the fixed second line", async ({ page }) => {
  const locales = [
    { path: "/", accessible: "Arrive with purpose. Travel with ease.", first: "purpose", second: "style", ending: "Travel with ease." },
    { path: "/es", accessible: "Llega con propósito. Viaja con tranquilidad.", first: "propósito", second: "estilo", ending: "Viaja con tranquilidad." },
    { path: "/pt", accessible: "Chegue com propósito. Viaje com tranquilidade.", first: "propósito", second: "estilo", ending: "Viaje com tranquilidade." },
  ];

  for (const locale of locales) {
    await page.goto(locale.path);
    await expect(page.getByRole("heading", { name: locale.accessible })).toBeVisible();
    const word = page.locator("[data-rotating-hero-word]");
    const staticLine = page.locator("[data-hero-static-line]");
    await expect(word).toHaveAttribute("data-active-word", locale.first);
    await expect(staticLine).toHaveText(locale.ending);
    const initialTop = (await staticLine.boundingBox())?.y;
    await page.waitForTimeout(3_700);
    await expect(word).toHaveAttribute("data-active-word", locale.second);
    expect((await staticLine.boundingBox())?.y).toBe(initialTop);
  }
});

test("keeps the first hero word static when reduced motion is preferred", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/es");
  const word = page.locator("[data-rotating-hero-word]");
  await expect(word).toHaveAttribute("data-active-word", "propósito");
  await page.waitForTimeout(3_700);
  await expect(word).toHaveAttribute("data-active-word", "propósito");
});

test("service page has unique content and a booking CTA", async ({ page }) => {
  await page.goto("/services/airport-transfers");
  await expect(page.getByRole("heading", { name: /orlando airport transfers/i })).toBeVisible();
  await expect(page.locator(".page-hero .button")).toBeVisible();
});

test("renders the English experience with native language controls", async ({ page }) => {
  const paths = ["/", "/services/airport-transfers", "/contact"];

  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", "en-US");
    await expect(page.getByLabel("Current language: English")).toHaveCount(2);
    await expect(page.locator(".language-options a")).toHaveCount(6);
    await expect(page.getByRole("button", { name: /español|português/i })).toHaveCount(0);
  }
});

test("serves Spanish and Portuguese routes with their own document language and metadata", async ({ page }) => {
  for (const [path, lang] of [["/es/services/city-to-city", "es-US"], ["/pt/services/city-to-city", "pt-BR"]] as const) {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
    await expect(page.locator('link[hreflang="en-US"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="es-US"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1);
    await expect(page.getByRole("link", { name: /Revival Transportation Group/i }).first()).toBeVisible();
  }
});

test("provides the equivalent deep route for a language change", async ({ page }) => {
  await page.goto("/pt/services/city-to-city");
  const spanishVersion = page.locator('.language-options a[href="/es/services/city-to-city"]').first();
  await expect(spanishVersion).toHaveAttribute("href", "/es/services/city-to-city");
  await page.goto("/es/services/city-to-city");
  await expect(page).toHaveURL(/\/es\/services\/city-to-city$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es-US");
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
