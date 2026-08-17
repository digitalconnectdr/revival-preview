import { BookingLink } from "@/components/booking-link";
import { PageHero, Section } from "@/components/site-components";
import { TrackedContactLink } from "@/components/tracked-contact-link";
import { business } from "@/content/business";
import type { Locale } from "@/i18n/config";
import { phoneHref } from "@/lib/site";

export function LocalizedContactPage({ locale }: { locale: Locale }) {
  const phone = business.phone.value ?? "";
  const email = business.email.value ?? "";
  const text = locale === "es"
    ? { eyebrow: "Ponte en contacto", hero: "Comienza con los detalles de tu viaje.", heroIntro: "Para una reserva de transporte estándar, reserva en línea. Contacta a Revival para consultas generales, corporativas, de grupos y viajes personalizados.", contact: "Contacta a Revival", title: "Te ayudaremos a planificar el siguiente paso.", address: "Dirección postal", step: "Elige el siguiente paso", actionTitle: "Reserva un viaje o contacta al equipo.", actionText: "¿Necesitas reservar transporte al aeropuerto, servicio de chófer o un viaje entre puntos? Reserva en línea. Para cuentas corporativas, grupos, eventos e itinerarios complejos, contacta directamente a Revival.", book: "Reserva transporte", call: "Llama a Revival", note: "Las consultas generales y corporativas están disponibles por teléfono o correo electrónico.", instagram: "Instagram oficial" }
    : { eyebrow: "Entre em contato", hero: "Comece pelos detalhes da sua viagem.", heroIntro: "Para uma reserva de transporte padrão, reserve online. Fale com a Revival sobre dúvidas gerais, corporativas, de grupos e viagens personalizadas.", contact: "Fale com a Revival", title: "Ajudaremos você a planejar o próximo passo.", address: "Endereço postal", step: "Escolha o próximo passo", actionTitle: "Reserve uma viagem ou fale com a equipe.", actionText: "Precisa reservar transporte para o aeroporto, serviço de motorista ou uma viagem ponto a ponto? Reserve online. Para contas corporativas, grupos, eventos e roteiros complexos, fale diretamente com a Revival.", book: "Reserve transporte", call: "Ligue para a Revival", note: "Dúvidas gerais e corporativas estão disponíveis por telefone ou e-mail.", instagram: "Instagram oficial" };
  const instagram = business.socialProfiles.value?.find((profile) => profile.platform === "instagram" && profile.verified);
  return <>
    <PageHero eyebrow={text.eyebrow} intro={text.heroIntro} title={text.hero} />
    <Section><div className="container contact-layout">
      <div className="contact-details"><p className="eyebrow">{text.contact}</p><h2>{text.title}</h2><TrackedContactLink channel="phone" href={phoneHref(phone)} placement="contact">{phone}</TrackedContactLink><TrackedContactLink channel="email" href={`mailto:${email}`} placement="contact">{email}</TrackedContactLink><p><strong>{text.address}</strong><br />{business.mailingAddress.value}</p>{instagram && <TrackedContactLink channel="instagram" href={instagram.url} placement="contact" rel="noopener noreferrer" target="_blank">{text.instagram} ↗</TrackedContactLink>}</div>
      <aside className="contact-action-card"><p className="eyebrow">{text.step}</p><h2>{text.actionTitle}</h2><p>{text.actionText}</p><div><BookingLink className="button button-gold" placement="contact-book">{text.book} <span aria-hidden="true">→</span></BookingLink><TrackedContactLink channel="phone" className="button button-outline" href={phoneHref(phone)} placement="contact-cta">{text.call} <span aria-hidden="true">→</span></TrackedContactLink></div><small>{text.note}</small></aside>
    </div></Section>
  </>;
}
