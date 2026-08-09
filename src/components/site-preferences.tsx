"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function SitePreferences() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    function syncPreferences() {
      const savedTheme = window.localStorage.getItem("revival-theme");
      const nextTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      setTheme(nextTheme);
    }

    syncPreferences();
    window.addEventListener("revival-preferences", syncPreferences);
    return () => window.removeEventListener("revival-preferences", syncPreferences);
  }, []);

  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dataset.language = "en";
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    window.localStorage.setItem("revival-theme", nextTheme);
    window.dispatchEvent(new Event("revival-preferences"));
  }

  return <div className="site-preferences" data-no-translate>
    <span aria-label="Site language: English" className="language-indicator"><span aria-hidden="true" className="language-icon"><i /><b /></span><span>EN</span></span>
    <button aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} className="theme-toggle" onClick={toggleTheme} type="button"><span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span><span className="sr-only">{theme === "light" ? "Switch to dark mode" : "Switch to light mode"}</span></button>
  </div>;
}
