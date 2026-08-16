import Image from "next/image";
import type { Locale } from "@/i18n/config";

type CoverageRegion = "central" | "northeast";

const visualCopy: Record<Locale, Record<CoverageRegion, string>> = {
  en: {
    central: "A private SUV traveling near an airport in Central Florida at sunset.",
    northeast: "An executive SUV traveling through a Northeast city at blue hour.",
  },
  es: {
    central: "Un SUV privado circulando cerca de un aeropuerto en Florida Central al atardecer.",
    northeast: "Un SUV ejecutivo circulando por una ciudad del noreste al anochecer.",
  },
  pt: {
    central: "Um SUV particular viajando perto de um aeroporto na Flórida Central ao entardecer.",
    northeast: "Um SUV executivo viajando por uma cidade do Nordeste ao entardecer.",
  },
};

const imageByRegion: Record<CoverageRegion, string> = {
  central: "/images/service-areas/central-florida-coverage-v1.png",
  northeast: "/images/service-areas/northeast-coverage-v1.png",
};

export function ServiceAreaCoverageVisual({ locale = "en", region }: { locale?: Locale; region: CoverageRegion }) {
  return <figure className={"coverage-visual coverage-visual-" + region}>
    <Image alt={visualCopy[locale][region]} fill sizes="(max-width: 780px) 100vw, 50vw" src={imageByRegion[region]} />
  </figure>;
}
