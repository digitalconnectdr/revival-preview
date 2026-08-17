import { BookingExperience } from "@/components/booking-experience";
import { PageHero, Section } from "@/components/site-components";
import type { Locale } from "@/i18n/config";

export function LocalizedBookingPage({ locale }: { locale: Locale }) {
  const text = locale === "es"
    ? {
      eyebrow: "Reserva con Revival",
      hero: "Reserva tu transporte.",
      heroIntro: "Reserva traslados al aeropuerto, transporte con chófer y viajes privados con Revival Transportation Group.",
      bookingEyebrow: "Reserva segura",
      title: "¿Listo para reservar tu viaje?",
      intro: "Continúa al sistema de reservas seguro de Revival para ingresar los detalles de tu viaje.",
      cta: "Inicia una reserva segura",
      assistanceEyebrow: "¿Necesitas ayuda?",
      assistanceTitle: "Habla con Revival.",
      contact: "Contacta a Revival",
      support: "Para cuentas corporativas, viajes de grupo o un itinerario complejo, contacta directamente al equipo de Revival.",
    }
    : {
      eyebrow: "Reserve com a Revival",
      hero: "Reserve seu transporte.",
      heroIntro: "Reserve traslados para o aeroporto, transporte com motorista e viagens privativas com a Revival Transportation Group.",
      bookingEyebrow: "Reserva segura",
      title: "Pronto para reservar sua viagem?",
      intro: "Continue para o sistema de reservas seguro da Revival e informe os detalhes da sua viagem.",
      cta: "Inicie uma reserva segura",
      assistanceEyebrow: "Precisa de ajuda?",
      assistanceTitle: "Fale com a Revival.",
      contact: "Fale com a Revival",
      support: "Para contas corporativas, viagens em grupo ou um roteiro complexo, fale diretamente com a equipe da Revival.",
    };

  return <>
    <PageHero eyebrow={text.eyebrow} intro={text.heroIntro} title={text.hero} />
    <Section>
      <div className="container">
        <BookingExperience assistanceEyebrow={text.assistanceEyebrow} assistanceTitle={text.assistanceTitle} contactHref={`/${locale}/contact`} contactLabel={text.contact} ctaLabel={text.cta} eyebrow={text.bookingEyebrow} intro={text.intro} support={text.support} title={text.title} />
      </div>
    </Section>
  </>;
}
