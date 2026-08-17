import { airports, fleet, routes, services, siteFaq, type FleetVehicle, type Route, type Service } from "@/content/data";
import type { Locale } from "@/i18n/config";

type ServiceCopy = Pick<Service, "name" | "heroTitle" | "seoTitle" | "seoDescription" | "kicker" | "summary" | "description">;

const serviceCopy: Record<Exclude<Locale, "en">, Record<string, ServiceCopy>> = {
  es: {
    "airport-transfers": { name: "Traslados al aeropuerto", heroTitle: "Traslados al aeropuerto de Orlando, organizados según tu vuelo.", seoTitle: "Traslados al Aeropuerto de Orlando y Servicio de Auto Privado", seoDescription: "Traslados privados para Orlando International Airport (MCO), Sanford Airport (SFB) y viajes en Florida Central con Revival Transportation Group.", kicker: "Llegadas y salidas", summary: "Transporte privado para viajes al aeropuerto, coordinado según tu itinerario.", description: "Para llegadas y salidas, Revival Transportation Group ofrece transporte privado a viajeros de Florida Central. Los cambios de vuelo y los viajes temprano o tarde se pueden conversar al reservar." },
    "executive-transportation": { name: "Transporte ejecutivo", heroTitle: "Transporte ejecutivo para Orlando y Florida Central.", seoTitle: "Transporte Ejecutivo en Orlando y Florida Central", seoDescription: "Transporte privado profesional para viajes ejecutivos al aeropuerto, reuniones con clientes e itinerarios corporativos en Orlando y Florida Central.", kicker: "Viajes de negocios, simplificados", summary: "Una opción de transporte privado refinada para reuniones, visitas de clientes e itinerarios ejecutivos.", description: "El transporte ejecutivo se organiza a partir de un itinerario claro, choferes profesionales y detalles de llegada coordinados. Solicita un viaje punto a punto, un día con varias paradas o transporte al aeropuerto." },
    "hourly-chauffeur": { name: "Chofer por horas", heroTitle: "Servicio de chofer por horas para un día flexible en Florida Central.", seoTitle: "Servicio de Chofer por Horas en Orlando y Florida Central", seoDescription: "Reserva un chofer privado por horas en Orlando y Florida Central para reuniones, restaurantes, eventos e itinerarios flexibles.", kicker: "Tu horario, tu ritmo", summary: "Reserva transporte privado con chofer para un itinerario con varias paradas o tiempos flexibles.", description: "El servicio de chofer por horas mantiene el transporte disponible mientras cambia tu itinerario. Comparte tu horario y las paradas solicitadas; el equipo confirmará la disponibilidad y el arreglo adecuado." },
    "city-to-city": { name: "Transporte entre ciudades", heroTitle: "Transporte privado entre ciudades en Florida Central.", seoTitle: "Servicio Privado de Auto Entre Ciudades en Florida Central", seoDescription: "Transporte privado entre ciudades para aeropuertos, puertos, resorts y destinos planificados de Florida Central.", kicker: "Viajes privados entre destinos", summary: "Una opción de transporte privado entre ciudades, aeropuertos, puertos y destinos planificados.", description: "El transporte entre ciudades está disponible para quienes desean un viaje privado y programado, no compartido. Envía el origen, destino y horario para recibir una opción confirmada." },
    "port-canaveral-transfers": { name: "Traslados a Port Canaveral", heroTitle: "Traslados privados a Port Canaveral desde MCO y Florida Central.", seoTitle: "Traslados Privados de MCO a Port Canaveral", seoDescription: "Transporte privado entre Orlando International Airport (MCO), Florida Central y Port Canaveral para viajeros de crucero y su equipaje.", kicker: "Transporte para día de crucero", summary: "Transporte privado para viajeros de crucero de Port Canaveral y sus conexiones aeroportuarias.", description: "Port Canaveral es un destino de servicio confirmado. Comparte la fecha del crucero, cantidad de pasajeros y equipaje al solicitar transporte para que la reserva se ajuste al viaje." },
    "in-city-rides": { name: "Viajes locales", heroTitle: "Viajes privados locales en Orlando y Florida Central.", seoTitle: "Servicio de Auto Privado para Viajes Locales en Orlando", seoDescription: "Transporte privado local para citas, restaurantes, familias, visitantes y ocasiones especiales en Orlando y Florida Central.", kicker: "Transporte privado local", summary: "Viajes privados para citas locales, visitantes, familias y planes especiales.", description: "Los viajes locales ofrecen una opción de transporte privado para trayectos programados. Cada reserva se confirma según la recogida, destino y fecha solicitados." },
    "events-group-transportation": { name: "Transporte para eventos y grupos", heroTitle: "Transporte para eventos y grupos en Orlando y Florida Central.", seoTitle: "Transporte para Eventos y Grupos en Orlando", seoDescription: "Transporte privado coordinado para eventos, conferencias, familias y planes de grupos en Orlando y Florida Central.", kicker: "Viajes grupales coordinados", summary: "Solicitudes de transporte para eventos, conferencias, familias y planes de grupos.", description: "Para eventos, conferencias y viajes grupales, comparte el itinerario, número de personas y necesidades de equipaje con anticipación. La disponibilidad y capacidad se confirman antes de finalizar la reserva." },
  },
  pt: {
    "airport-transfers": { name: "Traslados para o aeroporto", heroTitle: "Traslados para os aeroportos de Orlando, planejados conforme o seu voo.", seoTitle: "Traslados para o Aeroporto de Orlando e Serviço Privativo", seoDescription: "Traslados privativos para Orlando International Airport (MCO), Sanford Airport (SFB) e viagens na Flórida Central com a Revival Transportation Group.", kicker: "Chegadas e partidas", summary: "Transporte privativo para viagens ao aeroporto, coordenado conforme o seu itinerário.", description: "Para chegadas e partidas, a Revival Transportation Group oferece transporte privativo aos viajantes da Flórida Central. Alterações de voo e viagens cedo ou tarde podem ser discutidas na reserva." },
    "executive-transportation": { name: "Transporte executivo", heroTitle: "Transporte executivo para Orlando e Flórida Central.", seoTitle: "Transporte Executivo em Orlando e Flórida Central", seoDescription: "Transporte privativo profissional para aeroporto, reuniões com clientes e roteiros corporativos em Orlando e Flórida Central.", kicker: "Viagens de negócios, simplificadas", summary: "Uma opção refinada de transporte privativo para reuniões, visitas a clientes e roteiros executivos.", description: "O transporte executivo é organizado a partir de um roteiro claro, motoristas profissionais e detalhes de chegada coordenados. Solicite uma viagem ponto a ponto, um dia com várias paradas ou transporte para o aeroporto." },
    "hourly-chauffeur": { name: "Motorista por hora", heroTitle: "Serviço de motorista por hora para um dia flexível na Flórida Central.", seoTitle: "Serviço de Motorista por Hora em Orlando e Flórida Central", seoDescription: "Reserve um motorista privativo por hora em Orlando e Flórida Central para reuniões, restaurantes, eventos e roteiros flexíveis.", kicker: "Seu horário, seu ritmo", summary: "Reserve transporte privativo com motorista para roteiros com várias paradas ou horários flexíveis.", description: "O serviço de motorista por hora mantém o transporte disponível enquanto o seu roteiro muda. Compartilhe sua agenda e as paradas solicitadas; a equipe confirmará a disponibilidade e a opção adequada." },
    "city-to-city": { name: "Transporte entre cidades", heroTitle: "Transporte privativo entre cidades na Flórida Central.", seoTitle: "Serviço Privativo Entre Cidades na Flórida Central", seoDescription: "Transporte privativo entre cidades para aeroportos, portos, resorts e destinos planejados na Flórida Central.", kicker: "Viagens privativas entre destinos", summary: "Uma opção de transporte privativo entre cidades, aeroportos, portos e destinos planejados.", description: "O transporte entre cidades está disponível para quem deseja uma viagem privativa e programada, em vez de compartilhada. Envie a origem, o destino e o horário para receber uma opção confirmada." },
    "port-canaveral-transfers": { name: "Traslados para Port Canaveral", heroTitle: "Traslados privativos para Port Canaveral a partir de MCO e da Flórida Central.", seoTitle: "Traslados Privativos de MCO para Port Canaveral", seoDescription: "Transporte privativo entre Orlando International Airport (MCO), Flórida Central e Port Canaveral para viajantes de cruzeiro e suas bagagens.", kicker: "Transporte para o dia do cruzeiro", summary: "Transporte privativo para viajantes de cruzeiro de Port Canaveral e suas conexões aeroportuárias.", description: "Port Canaveral é um destino de serviço confirmado. Compartilhe a data do cruzeiro, o número de passageiros e as necessidades de bagagem ao solicitar transporte para que a reserva corresponda à viagem." },
    "in-city-rides": { name: "Viagens locais", heroTitle: "Viagens privativas locais em Orlando e Flórida Central.", seoTitle: "Serviço de Auto Privativo para Viagens Locais em Orlando", seoDescription: "Transporte privativo local para compromissos, restaurantes, famílias, visitantes e ocasiões especiais em Orlando e Flórida Central.", kicker: "Transporte privativo local", summary: "Viagens privativas para compromissos locais, visitantes, famílias e planos especiais.", description: "As viagens locais oferecem uma opção de transporte privativo para deslocamentos programados. Cada reserva é confirmada conforme o local de partida, destino e data solicitados." },
    "events-group-transportation": { name: "Transporte para eventos e grupos", heroTitle: "Transporte para eventos e grupos em Orlando e Flórida Central.", seoTitle: "Transporte para Eventos e Grupos em Orlando", seoDescription: "Transporte privativo coordenado para eventos, conferências, famílias e planos de grupos em Orlando e Flórida Central.", kicker: "Viagens em grupo coordenadas", summary: "Solicitações de transporte para eventos, conferências, famílias e planos de grupos.", description: "Para eventos, conferências e viagens em grupo, compartilhe o roteiro, o número de pessoas e as necessidades de bagagem antecipadamente. A disponibilidade e a capacidade são confirmadas antes de finalizar a reserva." },
  },
};

function serviceDetails(locale: Locale, service: Service) {
  const copy = locale === "en" ? undefined : serviceCopy[locale][service.slug];
  if (!copy) return service;
  const generic = locale === "es"
    ? { highlights: ["Transporte privado programado", "Detalles revisados con la reserva", "Disponibilidad confirmada antes de viajar"], cases: ["Itinerarios planificados", "Necesidades específicas del viaje", "Coordinación directa"], detail: ["Comparte los detalles principales para que el equipo revise la solicitud.", "La recogida, el destino, los pasajeros y el equipaje ayudan a confirmar el arreglo adecuado.", "Revival revisa la disponibilidad antes de finalizar la reserva."], ask: "¿Cómo solicito este servicio?", answer: "Comparte la recogida, destino, fecha y detalles de viaje. Revival revisará la disponibilidad antes de confirmar la reserva.", fit: "¿Qué información debo incluir?", fitAnswer: "Incluye pasajeros, equipaje y cualquier detalle del itinerario que pueda afectar la planificación." }
    : { highlights: ["Transporte privativo programado", "Detalhes revisados na reserva", "Disponibilidade confirmada antes da viagem"], cases: ["Roteiros planejados", "Necessidades específicas da viagem", "Coordenação direta"], detail: ["Compartilhe os detalhes principais para que a equipe analise a solicitação.", "Local de partida, destino, passageiros e bagagens ajudam a confirmar a opção adequada.", "A Revival analisa a disponibilidade antes de finalizar a reserva."], ask: "Como solicito este serviço?", answer: "Compartilhe local de partida, destino, data e detalhes da viagem. A Revival analisará a disponibilidade antes de confirmar a reserva.", fit: "Quais informações devo incluir?", fitAnswer: "Inclua passageiros, bagagens e qualquer detalhe do roteiro que possa afetar o planejamento." };
  const airportDetails = locale === "es" ? {
    highlights: ["Transporte para MCO y SFB", "Conexiones con hoteles, resorts y Port Canaveral", "Vehículo revisado según pasajeros y equipaje"],
    cases: ["Llegadas a MCO o SFB", "Salidas desde hoteles y resorts", "Viajes de aeropuerto a crucero o negocios"],
    detail: ["Comparte el aeropuerto de llegada, los datos del vuelo y el destino final en Florida Central para revisar la recogida solicitada.", "Para un vuelo de salida, incluye el hotel o resort, horario de recogida preferido, pasajeros y equipaje al solicitar el viaje.", "Las conexiones con Port Canaveral, citas de negocios u otra parada planificada se revisan con el itinerario completo antes de reservar."],
    faq: [
      { question: "¿Puedo solicitar transporte privado para una llegada a MCO o SFB?", answer: "Sí. Incluye el aeropuerto, los datos del vuelo, destino final y número de pasajeros para que Revival revise el traslado de llegada solicitado." },
      { question: "¿Puedo solicitar una salida al aeropuerto desde un hotel o resort?", answer: "Sí. Comparte la dirección de recogida, horario del vuelo, pasajeros y equipaje para revisar la salida solicitada." },
      { question: "¿Se puede solicitar transporte para vuelos temprano o tarde?", answer: "Sí. Las solicitudes temprano o tarde se pueden conversar con el equipo de reservas; la disponibilidad se confirma con la reserva." },
      { question: "¿Cómo debo planificar el equipaje y el ajuste del vehículo?", answer: "Indica el número de pasajeros, maletas y artículos grandes. Revival revisa la categoría de vehículo adecuada antes de finalizar la reserva." },
      { question: "¿Puedo solicitar un viaje del aeropuerto a un hotel o resort?", answer: "Sí. Incluye el nombre del hotel o resort y los detalles de llegada para revisar la solicitud completa." },
      { question: "¿El transporte al aeropuerto puede conectar con Port Canaveral o una cita de negocios?", answer: "Sí. Comparte la terminal de cruceros, lugar de reunión u otra parada planificada junto con los datos del vuelo para revisar el itinerario como una sola solicitud." },
      { question: "¿Qué detalles debo incluir al reservar un traslado al aeropuerto?", answer: "Incluye el aeropuerto, aerolínea u horario de vuelo cuando estén disponibles, recogida o destino, pasajeros, equipaje y cualquier parada importante. El arreglo final se confirma durante la reserva." },
    ],
  } : {
    highlights: ["Transporte para MCO e SFB", "Conexões com hotéis, resorts e Port Canaveral", "Veículo avaliado conforme passageiros e bagagens"],
    cases: ["Chegadas a MCO ou SFB", "Partidas de hotéis e resorts", "Viagens do aeroporto para cruzeiro ou negócios"],
    detail: ["Informe o aeroporto de chegada, os dados do voo e o destino final na Flórida Central para analisar a retirada solicitada.", "Para um voo de partida, informe o hotel ou resort, horário de retirada preferido, passageiros e bagagens ao solicitar a viagem.", "Conexões com Port Canaveral, compromissos de negócios ou outra parada planejada são analisadas com o roteiro completo antes da reserva."],
    faq: [
      { question: "Posso solicitar transporte privativo para uma chegada a MCO ou SFB?", answer: "Sim. Informe o aeroporto, os dados do voo, destino final e número de passageiros para que a Revival analise o traslado de chegada solicitado." },
      { question: "Posso solicitar uma partida para o aeroporto de um hotel ou resort?", answer: "Sim. Compartilhe o endereço de partida, horário do voo, passageiros e bagagens para analisar a partida solicitada." },
      { question: "É possível solicitar transporte para voos cedo ou tarde?", answer: "Sim. Solicitações cedo ou tarde podem ser conversadas com a equipe de reservas; a disponibilidade é confirmada com a reserva." },
      { question: "Como devo planejar as bagagens e a adequação do veículo?", answer: "Informe o número de passageiros, malas e itens maiores. A Revival analisa a categoria de veículo adequada antes de finalizar a reserva." },
      { question: "Posso solicitar uma viagem do aeroporto para um hotel ou resort?", answer: "Sim. Inclua o nome do hotel ou resort e os detalhes de chegada para analisar a solicitação completa." },
      { question: "O transporte para o aeroporto pode conectar com Port Canaveral ou um compromisso de negócios?", answer: "Sim. Informe o terminal de cruzeiros, local da reunião ou outra parada planejada junto com os dados do voo para analisar o roteiro como uma única solicitação." },
      { question: "Quais detalhes devo incluir ao reservar um traslado para o aeroporto?", answer: "Inclua o aeroporto, companhia aérea ou horário do voo quando disponíveis, local de partida ou destino, passageiros, bagagens e qualquer parada importante. A opção final é confirmada durante a reserva." },
    ],
  };
  return {
    ...service,
    ...copy,
    images: service.images.map((image) => ({ ...image, alt: locale === "es" ? `Servicio de transporte privado: ${copy.name}.` : `Serviço de transporte privativo: ${copy.name}.` })),
    highlights: service.slug === "airport-transfers" ? airportDetails.highlights : generic.highlights,
    useCases: service.slug === "airport-transfers" ? airportDetails.cases : generic.cases,
    useCaseDetails: service.slug === "airport-transfers" ? airportDetails.detail : generic.detail,
    faq: service.slug === "airport-transfers" ? airportDetails.faq : [{ question: generic.ask, answer: generic.answer }, { question: generic.fit, answer: generic.fitAnswer }],
  };
}

export function getLocalizedServices(locale: Locale) {
  return services.map((service) => serviceDetails(locale, service));
}

export function getLocalizedService(locale: Locale, slug: string) {
  const service = services.find((item) => item.slug === slug);
  return service ? serviceDetails(locale, service) : undefined;
}

export function getLocalizedFleet(locale: Locale): FleetVehicle[] {
  if (locale === "en") return fleet;
  const spanish = locale === "es";
  return fleet.map((vehicle) => {
    const localizedName = vehicle.name === "Business SUV" ? (spanish ? "SUV ejecutiva" : "SUV executiva") : vehicle.name === "Premium SUV" ? "SUV Premium" : vehicle.name === "Executive Sedan" ? (spanish ? "Sedán ejecutivo" : "Sedã executivo") : (spanish ? "Transporte para grupos" : "Transporte para grupos");
    return {
    ...vehicle,
    name: localizedName,
    category: spanish ? "Categoría de vehículo privado" : "Categoria de veículo privativo",
    capacity: vehicle.capacity.replace("Up to ", spanish ? "Hasta " : "Até ").replace("passengers", spanish ? "pasajeros" : "passageiros").replace("Confirmed with reservation", spanish ? "Se confirma con la reserva" : "Confirmada com a reserva"),
    luggage: vehicle.luggage.replace("Up to ", spanish ? "Hasta " : "Até ").replace("bags", spanish ? "maletas" : "malas").replace("Planned around your needs", spanish ? "Planificado según tus necesidades" : "Planejado conforme suas necessidades"),
    description: spanish ? "Una categoría de vehículo privado que se confirma según pasajeros, equipaje e itinerario." : "Uma categoria de veículo privativo confirmada conforme passageiros, bagagens e roteiro.",
    imageAlt: spanish ? `Vehículo de transporte privado: ${localizedName}.` : `Veículo de transporte privativo: ${localizedName}.`,
  };
  });
}

export function getLocalizedAirports(locale: Locale) {
  if (locale === "en") return airports;
  const spanish = locale === "es";
  return airports.map((airport) => ({
    ...airport,
    seoTitle: `${airport.code} ${spanish ? "Transporte al Aeropuerto" : "Transporte para o Aeroporto"} | Revival Transportation Group`,
    seoDescription: spanish ? `Transporte privado para llegadas, salidas y viajes en Florida Central desde ${airport.name}.` : `Transporte privativo para chegadas, partidas e viagens na Flórida Central a partir de ${airport.name}.`,
    intro: spanish ? `Solicita transporte privado para llegadas, salidas y viajes posteriores desde ${airport.name} (${airport.code}).` : `Solicite transporte privativo para chegadas, partidas e viagens posteriores a partir de ${airport.name} (${airport.code}).`,
    details: spanish ? ["Comparte el horario de vuelo y los detalles del viaje con tu solicitud.", "La disponibilidad se confirma antes de viajar.", "La categoría de vehículo se organiza según pasajeros y equipaje."] : ["Compartilhe o horário do voo e os detalhes da viagem com a solicitação.", "A disponibilidade é confirmada antes da viagem.", "A categoria do veículo é organizada conforme passageiros e bagagens."],
  }));
}

export function getLocalizedRoutes(locale: Locale): Route[] {
  if (locale === "en") return routes;
  const spanish = locale === "es";
  return routes.map((route) => ({
    ...route,
    title: route.slug === "mco-to-port-canaveral" ? (spanish ? "MCO a Port Canaveral" : "MCO para Port Canaveral") : route.slug === "mco-to-disney-world" ? (spanish ? "MCO a Disney World" : "MCO para Disney World") : (spanish ? "The Villages a MCO" : "The Villages para MCO"),
    intro: spanish ? `Transporte privado entre ${route.origin} y ${route.destination}, organizado según tu itinerario.` : `Transporte privativo entre ${route.origin} e ${route.destination}, organizado conforme o seu roteiro.`,
    seoTitle: `${route.title} ${spanish ? "Transporte Privado" : "Transporte Privativo"}`,
    seoDescription: spanish ? `Transporte privado entre ${route.origin} y ${route.destination} para viajeros, familias y equipaje planificado.` : `Transporte privativo entre ${route.origin} e ${route.destination} para viajantes, famílias e bagagens planejadas.`,
    imageAlt: spanish ? `Vehículo privado en la ruta entre ${route.origin} y ${route.destination}.` : `Veículo privativo na rota entre ${route.origin} e ${route.destination}.`,
    considerations: spanish ? ["Comparte los horarios y los detalles del itinerario", "Considera pasajeros, equipaje y artículos grandes", "Revisa la disponibilidad antes de finalizar la reserva"] : ["Compartilhe horários e detalhes do roteiro", "Considere passageiros, bagagens e itens maiores", "Analise a disponibilidade antes de finalizar a reserva"],
    overview: spanish ? `Esta ruta privada conecta ${route.origin} y ${route.destination}. Revival revisa el horario, la recogida, el grupo y el equipaje para que la solicitud se planifique con el contexto correcto.` : `Esta rota privativa conecta ${route.origin} e ${route.destination}. A Revival analisa horário, local de partida, grupo e bagagens para que a solicitação seja planejada no contexto certo.`,
    travelerContext: spanish ? "Una opción útil para viajeros con horarios de aeropuerto, familias, visitas y equipaje que necesitan un plan privado confirmado." : "Uma opção útil para viajantes com horários de aeroporto, famílias, visitas e bagagens que precisam de um plano privativo confirmado.",
    pickupPlanning: spanish ? "Incluye la ubicación de recogida, el horario y los detalles que ayuden a aclarar el inicio del viaje. El plan final se confirma con la reserva." : "Inclua o local de partida, o horário e os detalhes que ajudem a esclarecer o início da viagem. O plano final é confirmado com a reserva.",
    luggagePlanning: spanish ? "Indica pasajeros, maletas y artículos grandes con anticipación. Esta información ayuda a revisar la categoría de vehículo adecuada." : "Informe passageiros, malas e itens maiores com antecedência. Essas informações ajudam a analisar a categoria de veículo adequada.",
    vehicleGuidance: spanish ? "Las categorías de sedán, SUV y transporte grupal se revisan según pasajeros y equipaje. La asignación final se confirma con la reserva." : "As categorias de sedã, SUV e transporte em grupo são analisadas conforme passageiros e bagagens. A designação final é confirmada com a reserva.",
    bookingGuidance: spanish ? "Solicita el viaje cuando tengas los detalles principales. Las solicitudes tempranas ayudan especialmente en fechas concurridas y para grupos grandes." : "Solicite a viagem quando tiver os detalhes principais. Solicitações antecipadas ajudam especialmente em datas concorridas e para grupos maiores.",
    scenarios: spanish ? [{ title: "Llegada planificada", detail: "Coordina el viaje privado con los detalles de llegada y destino." }, { title: "Regreso o conexión", detail: "Incluye el próximo destino y horario para revisar el itinerario completo." }, { title: "Plan familiar", detail: "Revisa el ajuste del vehículo con anticipación cuando hay equipaje o un grupo mayor." }] : [{ title: "Chegada planejada", detail: "Coordene a viagem privativa com os detalhes de chegada e destino." }, { title: "Retorno ou conexão", detail: "Inclua o próximo destino e horário para analisar o roteiro completo." }, { title: "Plano em família", detail: "Analise a adequação do veículo antecipadamente quando há bagagens ou grupo maior." }],
    faq: spanish ? [
      { question: `¿Puedo solicitar transporte privado de ${route.origin} a ${route.destination}?`, answer: "Sí. Comparte los detalles del itinerario para que Revival revise la disponibilidad." },
      { question: "¿Qué detalles de recogida debo incluir?", answer: "Incluye ubicación, horario, pasajeros y cualquier información que ayude a confirmar el plan." },
      { question: "¿Pueden considerar el equipaje?", answer: "Sí. Indica maletas y artículos grandes para revisar el ajuste del vehículo." },
      { question: "¿Puedo solicitar el viaje inverso?", answer: "Sí. Comparte el nuevo origen, destino y horario para revisar la solicitud." },
      { question: "¿Cuándo debo reservar?", answer: "Solicita el viaje cuando se conozcan los detalles principales; las fechas concurridas se benefician de una consulta anticipada." },
      { question: "¿Los tiempos de viaje están garantizados?", answer: "No. Las condiciones pueden variar, por lo que Revival revisa el itinerario sin prometer un tiempo fijo." },
    ] : [
      { question: `Posso solicitar transporte privativo de ${route.origin} para ${route.destination}?`, answer: "Sim. Compartilhe os detalhes do roteiro para que a Revival analise a disponibilidade." },
      { question: "Quais detalhes de partida devo incluir?", answer: "Inclua local, horário, passageiros e informações que ajudem a confirmar o plano." },
      { question: "As bagagens podem ser consideradas?", answer: "Sim. Informe malas e itens maiores para analisar a adequação do veículo." },
      { question: "Posso solicitar a viagem no sentido inverso?", answer: "Sim. Compartilhe nova origem, destino e horário para analisar a solicitação." },
      { question: "Quando devo reservar?", answer: "Solicite a viagem quando os detalhes principais estiverem definidos; datas concorridas se beneficiam de uma consulta antecipada." },
      { question: "Os tempos de viagem são garantidos?", answer: "Não. As condições podem variar, então a Revival analisa o roteiro sem prometer um tempo fixo." },
    ],
  }));
}

export function getLocalizedRoute(locale: Locale, slug: string) {
  return getLocalizedRoutes(locale).find((route) => route.slug === slug);
}

export function getLocalizedSiteFaq(locale: Locale) {
  if (locale === "en") return siteFaq;
  return locale === "es" ? [
    { question: "¿Cómo reservo transporte?", answer: "Usa la experiencia de reserva en línea o llama a Revival Transportation Group. Los detalles y la disponibilidad se confirman durante el proceso de reserva." },
    { question: "¿Qué áreas atienden?", answer: "Florida Central es el área principal de Revival, incluyendo MCO, SFB y Port Canaveral. Contacta al equipo para conversar sobre viajes fuera de la región." },
    { question: "¿Qué categorías de vehículos puedo solicitar?", answer: "Puedes solicitar SUV ejecutiva, SUV Premium, sedán ejecutivo y opciones de transporte grupal. El equipo ayudará a ajustar la categoría a tu plan." },
    { question: "¿Puedo solicitar un itinerario personalizado?", answer: "Sí. Comparte recogida, destino, horario y detalles del grupo al reservar o contactar a Revival." },
  ] : [
    { question: "Como reservo transporte?", answer: "Use a experiência de reserva online ou ligue para a Revival Transportation Group. Os detalhes e a disponibilidade são confirmados durante a reserva." },
    { question: "Quais áreas são atendidas?", answer: "A Flórida Central é a área principal da Revival, incluindo MCO, SFB e Port Canaveral. Fale com a equipe sobre viagens além da região." },
    { question: "Quais categorias de veículo posso solicitar?", answer: "Você pode solicitar SUV executiva, SUV Premium, sedã executivo e opções de transporte em grupo. A equipe ajudará a adequar a categoria ao seu plano." },
    { question: "Posso solicitar um roteiro personalizado?", answer: "Sim. Compartilhe local de partida, destino, horário e detalhes do grupo ao reservar ou entrar em contato com a Revival." },
  ];
}
