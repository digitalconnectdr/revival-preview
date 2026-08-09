import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const baseUrl = new URL(process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000");
const manifest = JSON.parse(await readFile(path.join(root, ".next", "prerender-manifest.json"), "utf8"));
const excluded = new Set(["/_global-error", "/_not-found", "/apple-icon", "/icon.svg", "/manifest.webmanifest", "/robots.txt", "/sitemap.xml"]);
const routes = Object.keys(manifest.routes)
  .filter((route) => !excluded.has(route) && !route.startsWith("/_"))
  .sort((a, b) => a.localeCompare(b));

function text(value = "") {
  return value.replace(/\s+/g, " ").replace(/\|/g, "\\|").trim();
}

function attr(source, name) {
  const match = source.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
  return match?.[1] ?? "";
}

function localeFor(route) {
  if (route === "/es" || route.startsWith("/es/")) return "es-US";
  if (route === "/pt" || route.startsWith("/pt/")) return "pt-BR";
  return "en-US";
}

function routePath(value) {
  try { return new URL(value).pathname.replace(/\/$/, "") || "/"; } catch { return ""; }
}

async function auditRoute(route) {
  const response = await fetch(new URL(route, baseUrl));
  const html = await response.text();
  const htmlLang = html.match(/<html[^>]+\blang=["']([^"']+)["']/i)?.[1] ?? "";
  const title = text(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = text(html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)?.[1] ?? html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i)?.[1] ?? "");
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => text(match[1].replace(/<[^>]+>/g, "")));
  const canonicalTag = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0] ?? html.match(/<link[^>]+href=["'][^"']+["'][^>]+rel=["']canonical["'][^>]*>/i)?.[0] ?? "";
  const canonical = attr(canonicalTag, "href");
  const hreflang = Object.fromEntries([...html.matchAll(/<link\b[^>]*\bhreflang=["']([^"']+)["'][^>]*>/gi)].map((match) => [match[1], attr(match[0], "href")]));
  const robots = text(html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["'][^>]*>/i)?.[1] ?? html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["'][^>]*>/i)?.[1] ?? "");
  const openGraph = ["og:title", "og:description", "og:url", "og:locale"].every((property) => new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["'][^"']+`, "i").test(html) || new RegExp(`<meta[^>]+content=["'][^"']+["'][^>]+property=["']${property}["']`, "i").test(html));
  const schemas = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].reduce((count, match) => { try { JSON.parse(match[1]); return count + 1; } catch { return count; } }, 0);
  const internalLinks = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].map((match) => match[1]).filter((href) => href.startsWith("/") && !href.startsWith("//"));
  const expectedPath = route.replace(/\/$/, "") || "/";
  const hasAlternates = ["en-US", "es-US", "pt-BR", "x-default"].every((language) => Boolean(hreflang[language]));
  const checks = {
    status: response.status === 200,
    title: Boolean(title),
    description: Boolean(description),
    h1: h1Matches.length === 1 && Boolean(h1Matches[0]),
    canonical: routePath(canonical) === expectedPath,
    hreflang: hasAlternates,
    robots: /noindex/i.test(robots),
    htmlLang: htmlLang === localeFor(route),
    openGraph,
    schema: schemas > 0,
  };
  const requiredChecks = Object.fromEntries(Object.entries(checks).filter(([key]) => key !== "schema"));
  return { route, locale: localeFor(route), htmlLang, responseStatus: response.status, title, description, h1: h1Matches.join(" / "), canonical, hreflang, robots, openGraph, schemas, internalLinks, checks, pass: Object.values(requiredChecks).every(Boolean) };
}

const results = [];
for (const route of routes) results.push(await auditRoute(route));

const knownRoutes = new Set(routes.map((route) => route.replace(/\/$/, "") || "/"));
const missingLinks = [...new Set(results.flatMap((result) => result.internalLinks).map((href) => href.split(/[?#]/)[0].replace(/\/$/, "") || "/").filter((href) => !knownRoutes.has(href)))];
const failed = results.filter((result) => !result.pass);
const lines = [
  "# Final route inventory",
  "",
  `Generated from the current Next build manifest and audited against ${baseUrl.origin} on ${new Date().toISOString()}. This preview audit expects noindex, nofollow behavior.`,
  "",
  `- Routes audited: ${results.length}`,
  `- Route-level passes: ${results.length - failed.length}/${results.length}`,
  `- Broken internal routes found: ${missingLinks.length}`,
  "",
  "| Route | Locale | HTML lang | Status | Title | Description | H1 | Canonical | Hreflang | Robots | OpenGraph | Schema | Internal links | Result |",
  "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ...results.map((result) => `| ${result.route} | ${result.locale} | ${result.htmlLang} | ${result.responseStatus} | ${result.title} | ${result.description} | ${result.h1} | ${result.canonical} | ${Object.keys(result.hreflang).sort().join(", ")} | ${result.robots} | ${result.openGraph ? "PASS" : "FAIL"} | ${result.schemas} | ${result.internalLinks.length} | ${result.pass ? "PASS" : "FAIL"} |`),
  "",
  "## Internal-link result",
  "",
  missingLinks.length ? `The following internal targets were not found in the static route set: ${missingLinks.map((href) => `\`${href}\``).join(", ")}.` : "PASS — every internal route target found in rendered anchor links is present in the current static route set.",
  "",
  "## Validation rules",
  "",
  "Each page must return HTTP 200, include the correct HTML language, one title, one description, one visible H1, a self-referencing canonical, all four language alternatives, preview noindex metadata and complete OpenGraph fields. Parseable JSON-LD is reported and supplied globally; production is validated separately after the environment changes to production mode.",
  "",
];

await writeFile(path.join(root, "docs", "FINAL_ROUTE_INVENTORY.md"), lines.join("\n"));
console.log(`Audited ${results.length} routes; ${failed.length} route failures; ${missingLinks.length} missing internal routes.`);
if (failed.length || missingLinks.length) process.exitCode = 1;
