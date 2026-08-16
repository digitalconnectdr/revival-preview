import Image from "next/image";
import type { Locale } from "@/i18n/config";

type CoverageRegion = "central" | "northeast";

const visualCopy: Record<Locale, Record<CoverageRegion, { alt: string; label: string; locations: string[] }>> = {
  en: {
    central: { alt: "A private SUV traveling near an airport in Central Florida at sunset.", label: "Central Florida coverage", locations: ["MCO", "SFB", "Port Canaveral"] },
    northeast: { alt: "An executive SUV traveling through a Northeast city at blue hour.", label: "Published Northeast markets", locations: ["New York", "New Jersey", "Connecticut", "Massachusetts", "Pennsylvania"] },
  },
  es: {
    central: { alt: "Un SUV privado circulando cerca de un aeropuerto en Florida Central al atardecer.", label: "Cobertura de Florida Central", locations: ["MCO", "SFB", "Port Canaveral"] },
    northeast: { alt: "Un SUV ejecutivo circulando por una ciudad del noreste al anochecer.", label: "Mercados publicados del noreste", locations: ["Nueva York", "Nueva Jersey", "Connecticut", "Massachusetts", "Pensilvania"] },
  },
  pt: {
    central: { alt: "Um SUV particular viajando perto de um aeroporto na Flórida Central ao entardecer.", label: "Cobertura da Flórida Central", locations: ["MCO", "SFB", "Port Canaveral"] },
    northeast: { alt: "Um SUV executivo viajando por uma cidade do Nordeste ao entardecer.", label: "Mercados publicados do Nordeste", locations: ["Nova York", "Nova Jersey", "Connecticut", "Massachusetts", "Pensilvânia"] },
  },
};

const imageByRegion: Record<CoverageRegion, string> = {
  central: "/images/service-areas/central-florida-coverage-v1.png",
  northeast: "/images/service-areas/northeast-coverage-v1.png",
};

export function ServiceAreaCoverageVisual({ locale = "en", region }: { locale?: Locale; region: CoverageRegion }) {
  const text = visualCopy[locale][region];

  return <figure className={"coverage-visual coverage-visual-" + region}>
    <Image alt={text.alt} fill sizes="(max-width: 780px) 100vw, 50vw" src={imageByRegion[region]} />
    <figcaption>
      <span>{text.label}</span>
      <ul aria-label={text.label}>{text.locations.map((location) => <li key={location}>{location}</li>)}</ul>
    </figcaption>
  </figure>;
}
