export const locales = ["en", "es", "pt"] as const;

export type Locale = (typeof locales)[number];

export const localeMetadata: Record<Locale, { htmlLang: string; label: string; shortLabel: string; ogLocale: string }> = {
  en: { htmlLang: "en-US", label: "English", shortLabel: "EN", ogLocale: "en_US" },
  es: { htmlLang: "es-US", label: "Español", shortLabel: "ES", ogLocale: "es_US" },
  pt: { htmlLang: "pt-BR", label: "Português", shortLabel: "PT", ogLocale: "pt_BR" },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function stripLocale(pathname: string) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const [, possibleLocale, ...rest] = normalized.split("/");
  return isLocale(possibleLocale) ? `/${rest.join("/")}`.replace(/\/$/, "") || "/" : normalized;
}

export function localizedPath(locale: Locale, pathname = "/") {
  const path = stripLocale(pathname);
  return locale === "en" ? path : path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function localizedAlternates(pathname = "/") {
  const normalizedPath = stripLocale(pathname);
  return {
    languages: {
      "en-US": localizedPath("en", normalizedPath),
      "es-US": localizedPath("es", normalizedPath),
      "pt-BR": localizedPath("pt", normalizedPath),
      "x-default": localizedPath("en", normalizedPath),
    },
  };
}
