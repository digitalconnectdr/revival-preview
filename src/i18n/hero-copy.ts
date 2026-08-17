import type { Locale } from "@/i18n/config";

type HomeHeroCopy = {
  lead: string;
  words: string[];
  ending: string;
  accessibleText: string;
};

export const homeHeroCopy: Record<Locale, HomeHeroCopy> = {
  en: {
    lead: "Arrive with ",
    words: ["purpose", "style", "confidence", "elegance", "presence"],
    ending: "Travel with ease.",
    accessibleText: "Arrive with purpose. Travel with ease.",
  },
  es: {
    lead: "Llega con ",
    words: ["propósito", "estilo", "confianza", "elegancia", "presencia"],
    ending: "Viaja con tranquilidad.",
    accessibleText: "Llega con propósito. Viaja con tranquilidad.",
  },
  pt: {
    lead: "Chegue com ",
    words: ["propósito", "estilo", "confiança", "elegância", "presença"],
    ending: "Viaje com tranquilidade.",
    accessibleText: "Chegue com propósito. Viaje com tranquilidade.",
  },
};
