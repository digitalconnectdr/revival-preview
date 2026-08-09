"use client";

import { useEffect } from "react";

type Language = "en" | "es" | "pt";
type AttributeName = "alt" | "aria-label" | "placeholder" | "title";

const translatableAttributes: AttributeName[] = ["alt", "aria-label", "placeholder", "title"];
const textOriginals = new WeakMap<Text, string>();
const attributeOriginals = new WeakMap<Element, Map<AttributeName, string>>();
const translationCache = new Map<string, string>();
const routeWarmups = new Map<string, Promise<void>>();
const protectedBrandTokens = [
  { token: "__RTG_BRAND_COMPANY__", expression: /\bRevival Transportation Group(?: LLC)?\b/gi, value: "Revival Transportation Group" },
  { token: "__RTG_BRAND_GROUP__", expression: /\bTransportation Group\b/gi, value: "Transportation Group" },
  { token: "__RTG_BRAND_REVIVAL__", expression: /\bRevival\b/gi, value: "Revival" },
];

function selectedLanguage(): Language {
  const language = window.localStorage.getItem("revival-language");
  return language === "es" || language === "pt" ? language : "en";
}

function isTranslatable(value: string) {
  return /\p{L}/u.test(value.trim());
}

function isExcluded(node: Node) {
  const element = node.parentElement;
  if (!element) return true;
  return Boolean(element.closest("[data-no-translate], script, style, noscript, code, pre"));
}

function withOriginalSpacing(original: string, translation: string) {
  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translation.trim()}${trailing}`;
}

function protectBrandTerms(value: string) {
  return protectedBrandTokens.reduce((protectedValue, brand) => protectedValue.replace(brand.expression, brand.token), value);
}

function restoreBrandTerms(value: string) {
  return protectedBrandTokens.reduce((restoredValue, brand) => restoredValue.replaceAll(brand.token, brand.value), value);
}

async function translateBatch(texts: string[], language: Exclude<Language, "en">) {
  const separator = `[[REVIVAL_BREAK_${crypto.randomUUID()}]]`;
  const source = texts.join(` ${separator} `);
  const parameters = new URLSearchParams({ client: "gtx", sl: "en", tl: language, dt: "t", q: source });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${parameters.toString()}`);
  if (!response.ok) throw new Error("Translation request failed");
  const data = await response.json() as Array<Array<[string]>>;
  const translated = data[0].map(([segment]) => segment).join("");
  return translated.split(separator).map((item) => item.trim());
}

async function cacheTranslations(texts: string[], language: Exclude<Language, "en">) {
  const pendingTexts = [...new Set(texts.filter(isTranslatable))]
    .filter((text) => !translationCache.has(`${language}:${text}`));

  for (let start = 0; start < pendingTexts.length;) {
    const batch: string[] = [];
    let length = 0;
    while (start < pendingTexts.length && (batch.length === 0 || length + pendingTexts[start].length < 3600)) {
      batch.push(pendingTexts[start]);
      length += pendingTexts[start].length;
      start += 1;
    }
    const translations = await translateBatch(batch.map(protectBrandTerms), language);
    batch.forEach((text, index) => translationCache.set(`${language}:${text}`, restoreBrandTerms(translations[index] ?? text)));
  }
}

function collectSourceTexts(root: Document | HTMLElement) {
  const texts: string[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;

  while ((node = walker.nextNode())) {
    if (isExcluded(node)) continue;
    const value = node.nodeValue ?? "";
    if (isTranslatable(value)) texts.push(value);
  }

  root.querySelectorAll<HTMLElement>("*").forEach((element) => {
    if (isExcluded(element)) return;
    translatableAttributes.forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value && isTranslatable(value)) texts.push(value);
    });
  });

  return texts;
}

function isInternalRoute(link: HTMLAnchorElement) {
  if (link.hasAttribute("download") || link.target && link.target !== "_self") return false;
  const url = new URL(link.href, window.location.origin);
  return url.origin === window.location.origin && url.protocol === window.location.protocol;
}

async function warmRouteTranslations(href: string, language: Exclude<Language, "en">) {
  const url = new URL(href, window.location.origin);
  const key = `${language}:${url.pathname}${url.search}`;
  const existing = routeWarmups.get(key);
  if (existing) return existing;

  const warmup = (async () => {
    const response = await fetch(`${url.pathname}${url.search}`, { credentials: "same-origin" });
    if (!response.ok) return;
    const markup = await response.text();
    const page = new DOMParser().parseFromString(markup, "text/html");
    await cacheTranslations(collectSourceTexts(page), language);
  })().catch(() => undefined);

  routeWarmups.set(key, warmup);
  await warmup;
}

export function PageTranslator() {
  useEffect(() => {
    let isUpdating = false;
    let updateQueued = false;
    let releasedNavigation: HTMLAnchorElement | null = null;
    let navigationPreparing = false;

    function warmPrimaryRoutes(language: Exclude<Language, "en">) {
      document.querySelectorAll<HTMLAnchorElement>(".site-header a[href]").forEach((link) => {
        if (isInternalRoute(link)) void warmRouteTranslations(link.href, language);
      });
    }

    function scheduleUpdate() {
      if (updateQueued) return;
      updateQueued = true;
      queueMicrotask(() => {
        updateQueued = false;
        if (!isUpdating) void updatePage();
      });
    }

    async function updatePage() {
      const language = selectedLanguage();
      const textNodes: Text[] = [];
      const attributeEntries: Array<{ element: Element; attribute: AttributeName; original: string }> = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;

      while ((node = walker.nextNode())) {
        if (isExcluded(node)) continue;
        const textNode = node as Text;
        const original = textOriginals.get(textNode) ?? textNode.nodeValue ?? "";
        if (!textOriginals.has(textNode)) textOriginals.set(textNode, original);
        if (isTranslatable(original)) textNodes.push(textNode);
      }

      document.querySelectorAll<HTMLElement>("body *").forEach((element) => {
        if (isExcluded(element)) return;
        const originals = attributeOriginals.get(element) ?? new Map<AttributeName, string>();
        translatableAttributes.forEach((attribute) => {
          const original = originals.get(attribute) ?? element.getAttribute(attribute);
          if (!original || !isTranslatable(original)) return;
          originals.set(attribute, original);
          attributeEntries.push({ element, attribute, original });
        });
        if (originals.size) attributeOriginals.set(element, originals);
      });

      isUpdating = true;
      let languageChanged = false;

      try {
        if (language === "en") {
          textNodes.forEach((textNode) => { textNode.nodeValue = textOriginals.get(textNode) ?? textNode.nodeValue; });
          attributeEntries.forEach(({ element, attribute, original }) => element.setAttribute(attribute, original));
          return;
        }

        const texts = [
          ...textNodes.map((textNode) => textOriginals.get(textNode) ?? ""),
          ...attributeEntries.map(({ original }) => original),
        ];
        await cacheTranslations(texts, language);
        languageChanged = selectedLanguage() !== language;
        if (languageChanged) return;

        textNodes.forEach((textNode) => {
          const original = textOriginals.get(textNode) ?? "";
          textNode.nodeValue = withOriginalSpacing(original, translationCache.get(`${language}:${original}`) ?? original);
        });
        attributeEntries.forEach(({ element, attribute, original }) => element.setAttribute(attribute, translationCache.get(`${language}:${original}`) ?? original));
        warmPrimaryRoutes(language);
      } catch {
        // Keep the source language readable if a translation request is unavailable.
      } finally {
        isUpdating = false;
        if (languageChanged) scheduleUpdate();
      }
    }

    function linkFromTarget(target: EventTarget | null) {
      return target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
    }

    function warmLink(event: Event) {
      const language = selectedLanguage();
      const link = linkFromTarget(event.target);
      if (language !== "en" && link && isInternalRoute(link)) void warmRouteTranslations(link.href, language);
    }

    function prepareNavigation(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const language = selectedLanguage();
      const link = linkFromTarget(event.target);
      if (language === "en" || !link || !isInternalRoute(link)) return;
      const url = new URL(link.href, window.location.origin);
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      if (releasedNavigation === link) {
        releasedNavigation = null;
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      if (navigationPreparing) return;
      navigationPreparing = true;

      void warmRouteTranslations(link.href, language).finally(() => {
        navigationPreparing = false;
        if (selectedLanguage() !== language) return;
        releasedNavigation = link;
        link.click();
      });
    }

    const observer = new MutationObserver(() => { if (!isUpdating) scheduleUpdate(); });
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("revival-preferences", scheduleUpdate);
    document.addEventListener("pointerover", warmLink, true);
    document.addEventListener("focusin", warmLink, true);
    document.addEventListener("click", prepareNavigation, true);
    window.addEventListener("popstate", scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("revival-preferences", scheduleUpdate);
      document.removeEventListener("pointerover", warmLink, true);
      document.removeEventListener("focusin", warmLink, true);
      document.removeEventListener("click", prepareNavigation, true);
      window.removeEventListener("popstate", scheduleUpdate);
    };
  }, []);

  return null;
}
