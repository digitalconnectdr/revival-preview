"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localeMetadata, localizedPath, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";
import { trackLanguageSwitch } from "@/lib/analytics";

type Theme = "light" | "dark";

export function SitePreferences({ locale = "en" }: { locale?: Locale }) {
  const [theme, setTheme] = useState<Theme>("light");
  const pathname = usePathname();
  const copy = getUi(locale);
  useEffect(() => { function syncPreferences() { const savedTheme = window.localStorage.getItem("revival-theme"); const nextTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; setTheme(nextTheme); } syncPreferences(); window.addEventListener("revival-preferences", syncPreferences); return () => window.removeEventListener("revival-preferences", syncPreferences); }, []);
  useEffect(() => { document.documentElement.dataset.language = locale; document.documentElement.dataset.theme = theme; }, [locale, theme]);
  function toggleTheme() { const nextTheme: Theme = theme === "light" ? "dark" : "light"; setTheme(nextTheme); window.localStorage.setItem("revival-theme", nextTheme); window.dispatchEvent(new Event("revival-preferences")); }
  const themeLabel = theme === "light" ? copy.switchToDark : copy.switchToLight;
  return <div className="site-preferences" data-no-translate><details className="language-menu"><summary aria-label={copy.currentLanguage(localeMetadata[locale].label)}><span aria-hidden="true" className="language-icon"><i /><b /></span><span>{localeMetadata[locale].shortLabel}</span><span aria-hidden="true" className="language-caret">⌄</span></summary><div aria-label={copy.languageSelection} className="language-options">{(["en", "es", "pt"] as const).map((targetLocale) => <Link aria-current={targetLocale === locale ? "true" : undefined} href={localizedPath(targetLocale, pathname)} key={targetLocale} lang={localeMetadata[targetLocale].htmlLang} onClick={() => trackLanguageSwitch(locale, targetLocale, pathname)}>{localeMetadata[targetLocale].label}<small>{localeMetadata[targetLocale].shortLabel}</small></Link>)}</div></details><button aria-label={themeLabel} className="theme-toggle" onClick={toggleTheme} type="button"><span aria-hidden="true">{theme === "light" ? "◐" : "☀"}</span><span className="sr-only">{themeLabel}</span></button></div>;
}
