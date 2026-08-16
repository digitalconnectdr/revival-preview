import type { Locale } from "@/i18n/config";

type CoverageRegion = "central" | "northeast";

const visualCopy: Record<Locale, Record<CoverageRegion, { label: string; locations: string[]; mapLabel: string; mapTitle: string }>> = {
  en: {
    central: { label: "Central Florida coverage", locations: ["MCO", "SFB", "Port Canaveral"], mapLabel: "Map of Central Florida coverage including Orlando, Sanford and Port Canaveral", mapTitle: "Central Florida coverage map" },
    northeast: { label: "Published Northeast markets", locations: ["New York", "New Jersey", "Connecticut", "Massachusetts", "Pennsylvania"], mapLabel: "Map of published Northeast transportation markets", mapTitle: "Northeast markets coverage map" },
  },
  es: {
    central: { label: "Cobertura de Florida Central", locations: ["MCO", "SFB", "Port Canaveral"], mapLabel: "Mapa de cobertura de Florida Central con Orlando, Sanford y Port Canaveral", mapTitle: "Mapa de cobertura de Florida Central" },
    northeast: { label: "Mercados publicados del noreste", locations: ["Nueva York", "Nueva Jersey", "Connecticut", "Massachusetts", "Pensilvania"], mapLabel: "Mapa de los mercados de transporte publicados del noreste", mapTitle: "Mapa de cobertura de mercados del noreste" },
  },
  pt: {
    central: { label: "Cobertura da Flórida Central", locations: ["MCO", "SFB", "Port Canaveral"], mapLabel: "Mapa de cobertura da Flórida Central incluindo Orlando, Sanford e Port Canaveral", mapTitle: "Mapa de cobertura da Flórida Central" },
    northeast: { label: "Mercados publicados do Nordeste", locations: ["Nova York", "Nova Jersey", "Connecticut", "Massachusetts", "Pensilvânia"], mapLabel: "Mapa dos mercados de transporte publicados do Nordeste", mapTitle: "Mapa de cobertura dos mercados do Nordeste" },
  },
};

const mapByRegion: Record<CoverageRegion, string> = {
  central: "https://www.openstreetmap.org/export/embed.html?bbox=-81.75%2C28.25%2C-80.45%2C28.95&layer=mapnik",
  northeast: "https://www.openstreetmap.org/export/embed.html?bbox=-80.9%2C39.4%2C-70.1%2C43.3&layer=mapnik",
};

export function ServiceAreaCoverageVisual({ locale = "en", region }: { locale?: Locale; region: CoverageRegion }) {
  const text = visualCopy[locale][region];

  return <figure className={"coverage-visual coverage-visual-" + region}>
    <iframe aria-label={text.mapLabel} loading="lazy" src={mapByRegion[region]} title={text.mapTitle} />
    <figcaption>
      <span>{text.label}</span>
      <ul aria-label={text.label}>{text.locations.map((location) => <li key={location}>{location}</li>)}</ul>
    </figcaption>
  </figure>;
}
