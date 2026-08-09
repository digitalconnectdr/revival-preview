import type { Locale } from "@/i18n/config";

const mapCopy: Record<Locale, { label: string; title: string; sanford: string; orlando: string; resorts: string; port: string; cruise: string; attribution: string }> = {
  en: { label: "Map of Central Florida including Orlando, Sanford, Disney area and Port Canaveral", title: "Central Florida service area map", sanford: "Sanford Airport", orlando: "Orlando International", resorts: "Disney & area hotels", port: "Port Canaveral", cruise: "Cruise terminal", attribution: "OpenStreetMap contributors" },
  es: { label: "Mapa de Florida Central con Orlando, Sanford, área Disney y Port Canaveral", title: "Mapa del área de servicio de Florida Central", sanford: "Aeropuerto Sanford", orlando: "Orlando International", resorts: "Disney y hoteles de la zona", port: "Port Canaveral", cruise: "Terminal de cruceros", attribution: "Colaboradores de OpenStreetMap" },
  pt: { label: "Mapa da Flórida Central com Orlando, Sanford, área Disney e Port Canaveral", title: "Mapa da área de serviço da Flórida Central", sanford: "Aeroporto de Sanford", orlando: "Orlando International", resorts: "Disney e hotéis da região", port: "Port Canaveral", cruise: "Terminal de cruzeiros", attribution: "Colaboradores do OpenStreetMap" },
};

export function CentralFloridaMap({ locale = "en" }: { locale?: Locale }) {
  const text = mapCopy[locale];
  return <div className="area-map"><iframe aria-label={text.label} loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-81.75%2C28.25%2C-80.45%2C28.95&amp;layer=mapnik" title={text.title} /><div aria-hidden="true" className="map-overlay" /><span aria-hidden="true" className="map-marker marker-sfb"><i /><span><strong>SFB</strong><small>{text.sanford}</small></span></span><span aria-hidden="true" className="map-marker marker-mco"><i /><span><strong>MCO</strong><small>{text.orlando}</small></span></span><span aria-hidden="true" className="map-marker marker-disney"><i /><span><strong>{locale === "es" ? "Resorts" : "Resorts"}</strong><small>{text.resorts}</small></span></span><span aria-hidden="true" className="map-marker marker-port"><i /><span><strong>{text.port}</strong><small>{text.cruise}</small></span></span><a className="map-attribution" href="https://www.openstreetmap.org/copyright" rel="noreferrer" target="_blank">© {text.attribution}</a></div>;
}
