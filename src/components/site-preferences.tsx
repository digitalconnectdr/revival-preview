"use client";

import { useEffect, useRef, useState } from "react";

type Language = "en" | "es" | "pt";
type Theme = "light" | "dark";

const languages: Array<{ code: Language; label: string; short: string }> = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "pt", label: "Português", short: "PT" },
];

export function SitePreferences() {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const languageMenu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function syncPreferences() {
      const savedLanguage = window.localStorage.getItem("revival-language");
      const savedTheme = window.localStorage.getItem("revival-theme");
      const nextLanguage = languages.some(({ code }) => code === savedLanguage) ? savedLanguage as Language : "en";
      const nextTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      setLanguage(nextLanguage);
      setTheme(nextTheme);
    }

    syncPreferences();
    window.addEventListener("revival-preferences", syncPreferences);
    return () => window.removeEventListener("revival-preferences", syncPreferences);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
    document.documentElement.dataset.theme = theme;
  }, [language, theme]);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("revival-language", nextLanguage);
    window.dispatchEvent(new Event("revival-preferences"));
    if (languageMenu.current) languageMenu.current.open = false;
  }

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    window.localStorage.setItem("revival-theme", nextTheme);
    window.dispatchEvent(new Event("revival-preferences"));
  }

  const selectedLanguage = languages.find(({ code }) => code === language) ?? languages[0];

  return <div className="site-preferences" data-no-translate>
    <details className="language-menu" ref={languageMenu}>
      <summary aria-label={`Language: ${selectedLanguage.label}`}><span aria-hidden="true" className="language-icon"><i /><b /></span><span>{selectedLanguage.short}</span><span aria-hidden="true" className="language-caret">⌄</span></summary>
      <div aria-label="Choose language" className="language-options">
        {languages.map((option) => <button aria-pressed={language === option.code} key={option.code} onClick={() => changeLanguage(option.code)} type="button"><span>{option.label}</span><small>{option.short}</small></button>)}
      </div>
    </details>
    <button aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} className="theme-toggle" onClick={toggleTheme} type="button"><span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span><span className="sr-only">{theme === "light" ? "Switch to dark mode" : "Switch to light mode"}</span></button>
  </div>;
}
