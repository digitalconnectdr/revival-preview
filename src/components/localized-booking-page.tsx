import { BookingExperience } from "@/components/booking-experience";
import { PageHero, Section } from "@/components/site-components";
import type { Locale } from "@/i18n/config";

export function LocalizedBookingPage({ locale }: { locale: Locale }) {
  const text = locale === "es"
    ? {
      eyebrow: "Reserva en línea segura",
      hero: "Reserva tu transporte.",
      heroIntro: "Reserva traslados al aeropuerto, transporte con chófer y viajes privados a través de la experiencia oficial de Revival.",
      bookingEyebrow: "Reserva online de Revival",
      title: "Planifica tu viaje con MyLimoBiz.",
      intro: "Ingresa los detalles de tu viaje para iniciar una reserva segura con Revival Transportation Group.",
      frameTitle: "Reserva online segura de Revival Transportation Group",
      open: "Abrir la reserva en una ventana nueva",
      support: "Para cuentas corporativas, viajes de grupo o un itinerario complejo, contacta directamente al equipo de Revival.",
    }
    : {
      eyebrow: "Reserva online segura",
      hero: "Reserve seu transporte.",
      heroIntro: "Reserve traslados para o aeroporto, transporte com motorista e viagens privativas pela experiência oficial da Revival.",
      bookingEyebrow: "Reserva online da Revival",
      title: "Planeje sua viagem com a MyLimoBiz.",
      intro: "Informe os detalhes da sua viagem para iniciar uma reserva segura com a Revival Transportation Group.",
      frameTitle: "Reserva online segura da Revival Transportation Group",
      open: "Abrir a reserva em uma nova janela",
      support: "Para contas corporativas, viagens em grupo ou um roteiro complexo, fale diretamente com a equipe da Revival.",
    };

  return <>
    <PageHero eyebrow={text.eyebrow} intro={text.heroIntro} title={text.hero} />
    <Section>
      <div className="container">
        <BookingExperience eyebrow={text.bookingEyebrow} frameTitle={text.frameTitle} intro={text.intro} openLabel={text.open} support={text.support} title={text.title} />
      </div>
    </Section>
  </>;
}
