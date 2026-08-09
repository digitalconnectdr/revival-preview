export type Service = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  description: string;
  images: { src: string; alt: string }[];
  highlights: string[];
  useCases: string[];
  faq: { question: string; answer: string }[];
};

export type FleetVehicle = {
  name: string;
  category: string;
  capacity: string;
  luggage: string;
  description: string;
  image: string;
  imageAlt: string;
  status: "site_verified" | "conflict";
};

export const services: Service[] = [
  {
    slug: "airport-transfers",
    name: "Airport Transfers",
    kicker: "Arrivals and departures",
    summary: "Private transportation for airport travel, coordinated around your itinerary.",
    description:
      "For airport arrivals and departures, Revival Transportation Group provides private transportation for Central Florida travelers. Flight changes and early or late travel can be discussed when you book.",
    images: [
      { src: "/images/services/airport-transfers-v4.webp", alt: "Private airport transfer with a chauffeur beside a dark SUV at an airport curbside." },
      { src: "/images/services/airport-transfers-02.webp", alt: "Airport arrival service with a chauffeur assisting a traveler and luggage beside a dark SUV." },
      { src: "/images/services/airport-transfers-03.webp", alt: "Airport departure service with a chauffeur loading a carry-on into a dark SUV." },
    ],
    highlights: ["Private airport transportation", "Flight-change coordination", "MCO, SFB and private aviation requests"],
    useCases: ["Airport arrivals", "Outbound flights", "Private aviation terminals"],
    faq: [
      { question: "Can I request airport transportation for an early or late flight?", answer: "Yes. Availability is discussed with the reservation team when you submit your trip details." },
      { question: "Which airports can I request?", answer: "The website currently identifies Orlando International Airport (MCO), Sanford Airport (SFB), and private aviation requests." },
    ],
  },
  {
    slug: "executive-transportation",
    name: "Executive Transportation",
    kicker: "Business travel, kept simple",
    summary: "A polished private transportation option for meetings, client visits and executive itineraries.",
    description:
      "Executive transportation is built around a clear itinerary, professional chauffeurs and coordinated arrival details. Request a reservation for a point-to-point trip, a multi-stop day or airport travel.",
    images: [
      { src: "/images/services/executive-transportation-v4.webp", alt: "Executive transportation with a dark sedan at a contemporary office entrance." },
      { src: "/images/services/executive-transportation-02.webp", alt: "Executive pickup with a chauffeur welcoming a business traveler beside a dark sedan." },
      { src: "/images/services/executive-transportation-03.webp", alt: "Executive client arrival in a dark SUV at a refined business entrance." },
    ],
    highlights: ["Professional chauffeurs", "Point-to-point or multi-stop requests", "Corporate and business travel"],
    useCases: ["Client meetings", "Executive airport travel", "Business events"],
    faq: [
      { question: "Can an executive itinerary include multiple stops?", answer: "Include the requested stops when you inquire so availability and routing can be confirmed before the reservation is finalized." },
      { question: "Do you offer corporate accounts?", answer: "Corporate transportation is a listed service. Billing programs and account terms are confirmed directly with Revival before activation." },
    ],
  },
  {
    slug: "hourly-chauffeur",
    name: "Hourly Chauffeur",
    kicker: "Your schedule, your pace",
    summary: "Reserve private chauffeured transportation for an itinerary with multiple stops or flexible timing.",
    description:
      "Hourly chauffeur service is a practical way to keep transportation available while your itinerary changes. Share your schedule and requested stops; the team will confirm availability and the appropriate arrangement.",
    images: [
      { src: "/images/services/hourly-chauffeur-v4.webp", alt: "Hourly chauffeur service with a dark SUV waiting at an upscale city street." },
      { src: "/images/services/hourly-chauffeur-02.webp", alt: "Hourly chauffeur service outside an upscale restaurant district in the evening." },
      { src: "/images/services/hourly-chauffeur-03.webp", alt: "Private chauffeur waiting between stops in a refined city district." },
    ],
    highlights: ["Flexible multi-stop planning", "Private chauffeur service", "Availability confirmed before reservation"],
    useCases: ["Meetings across town", "Special occasions", "Open itineraries"],
    faq: [
      { question: "How is hourly chauffeur service arranged?", answer: "Tell Revival about your schedule, stops and passenger needs. Exact minimums and charges are confirmed before booking." },
      { question: "Can my itinerary change during the day?", answer: "Let the chauffeur or reservation team know as soon as possible. Changes remain subject to availability and the agreed reservation terms." },
    ],
  },
  {
    slug: "city-to-city",
    name: "City-to-City Transportation",
    kicker: "Private travel between destinations",
    summary: "A private transportation option for travel between cities, airports, ports and planned destinations.",
    description:
      "City-to-city transportation is available for travelers who want a private, scheduled trip rather than a shared ride. Send the origin, destination and timing to receive a confirmed option.",
    images: [
      { src: "/images/services/city-to-city-v4.webp", alt: "City-to-city private transportation on a coastal highway at sunset." },
      { src: "/images/services/city-to-city-02.webp", alt: "Private SUV traveling on an open Central Florida highway." },
      { src: "/images/services/city-to-city-03.webp", alt: "Long-distance private travel along a palm-lined coastal causeway." },
    ],
    highlights: ["Scheduled private travel", "Door-to-door trip details", "Central Florida and select requested markets"],
    useCases: ["Intercity trips", "Airport connections", "Planned family travel"],
    faq: [
      { question: "Which city-to-city routes are available?", answer: "The availability of each route is confirmed at booking. Popular Central Florida routes are shown on this website for planning." },
      { question: "Can I request a custom destination?", answer: "Yes. Use the booking or contact option with your full travel details so the team can review the request." },
    ],
  },
  {
    slug: "port-canaveral-transfers",
    name: "Port Canaveral Transfers",
    kicker: "Cruise-day transportation",
    summary: "Private transportation for Port Canaveral cruise travelers and their airport connections.",
    description:
      "Port Canaveral is a confirmed service destination. Share the cruise date, passenger count and luggage considerations when requesting transportation so the reservation can be matched to the trip.",
    images: [
      { src: "/images/services/port-canaveral-transfers-v4.webp", alt: "Port Canaveral transfer with a dark SUV and luggage near a cruise terminal." },
      { src: "/images/services/port-canaveral-transfers-02.webp", alt: "Cruise-port transfer with a chauffeur assisting travelers near a terminal." },
      { src: "/images/services/port-canaveral-transfers-03.webp", alt: "Vacation transfer with luggage and a dark passenger vehicle near a coastal terminal." },
    ],
    highlights: ["Port Canaveral transportation", "Airport-to-port planning", "Private travel for cruise parties"],
    useCases: ["Embarkation day", "Return transfers", "MCO-to-port requests"],
    faq: [
      { question: "Can I request a transfer between MCO and Port Canaveral?", answer: "Yes. This is a featured route; share flight and cruise details so availability can be confirmed." },
      { question: "How do I plan for luggage?", answer: "Include the number of travelers and the luggage you expect when you inquire. Vehicle selection is confirmed with the reservation." },
    ],
  },
  {
    slug: "in-city-rides",
    name: "In-City Rides",
    kicker: "Private local transportation",
    summary: "Private rides for local appointments, visitors, families and special plans.",
    description:
      "In-city rides give travelers a private transportation option for scheduled local trips. Each reservation is confirmed around the requested pickup, destination and travel date.",
    images: [
      { src: "/images/services/in-city-rides-v4.webp", alt: "Private in-city ride with a dark sedan outside a downtown hotel entrance." },
      { src: "/images/services/in-city-rides-02.webp", alt: "Private hotel pickup with a chauffeur holding the rear door of a dark sedan." },
      { src: "/images/services/in-city-rides-03.webp", alt: "Dark luxury SUV providing private transportation through a palm-lined city street." },
    ],
    highlights: ["Private scheduled rides", "Visitors and families", "Special occasion transportation"],
    useCases: ["Dinner and events", "Family visits", "Local appointments"],
    faq: [
      { question: "Can I reserve a local private ride for visitors?", answer: "Yes. Provide the pickup, destination, date and passenger details when you request your trip." },
      { question: "Are event rides available?", answer: "Private events and special occasions are listed services. Availability is confirmed for each request." },
    ],
  },
  {
    slug: "events-group-transportation",
    name: "Events & Group Transportation",
    kicker: "Coordinated group travel",
    summary: "Transportation requests for events, conferences, families and larger travel plans.",
    description:
      "For events, conferences and group travel, share the itinerary, headcount and luggage needs early. Group vehicle availability and capacity are confirmed directly before a reservation is finalized.",
    images: [
      { src: "/images/services/events-group-transportation-v4.webp", alt: "Event transportation with a dark passenger van at an evening venue entrance." },
      { src: "/images/services/events-group-transportation-02.webp", alt: "Group arrival with a dark passenger van outside an elegant evening venue." },
      { src: "/images/services/events-group-transportation-03.webp", alt: "Group transfer for a daytime celebration with a chauffeur and passenger van." },
    ],
    highlights: ["Events and conferences", "Group itinerary planning", "Vehicle details confirmed with booking"],
    useCases: ["Conferences", "Family celebrations", "Private events"],
    faq: [
      { question: "What group vehicle capacity is available?", answer: "Group transportation is planned around your party size, luggage and itinerary. The Revival team will help select the right vehicle for your day." },
      { question: "How early should I inquire about an event?", answer: "Early inquiries give the team time to review the itinerary and availability. Submit the date and travel details as soon as plans are known." },
    ],
  },
];

export const fleet: FleetVehicle[] = [
  { name: "Business SUV", category: "Chevrolet Suburban / business-level SUV", capacity: "Up to 6 passengers", luggage: "Up to 5 bags", description: "A business-level SUV for private airport, corporate and local travel.", image: "/images/fleet/business-suv.webp", imageAlt: "Black business SUV parked at a refined hotel entrance.", status: "site_verified" },
  { name: "Premium SUV", category: "Premium-level SUV", capacity: "Up to 6 passengers", luggage: "Up to 5 bags", description: "A premium SUV category for travelers who value extra space and comfort.", image: "/images/fleet/premium-suv.webp", imageAlt: "Premium black SUV outside an upscale residence at dusk.", status: "site_verified" },
  { name: "Executive Sedan", category: "Executive-level sedan", capacity: "Up to 3 passengers", luggage: "Up to 2 bags", description: "An executive sedan category for smaller private travel parties.", image: "/images/fleet/executive-sedan.webp", imageAlt: "Black executive sedan at an elegant hotel entrance.", status: "site_verified" },
  { name: "Group Transportation", category: "Group travel", capacity: "Confirmed with reservation", luggage: "Planned around your needs", description: "A comfortable option for events, families and larger travel plans. Vehicle size is selected around your party and luggage.", image: "/images/fleet/group-transportation.webp", imageAlt: "High-roof passenger van prepared for group transportation.", status: "site_verified" },
];

export const airports = [
  {
    slug: "mco",
    code: "MCO",
    name: "Orlando International Airport",
    intro: "Request private transportation for MCO arrivals, departures and onward travel around Central Florida.",
    details: ["Share flight timing and travel details with your reservation request.", "Flight-change support is available when plans shift.", "Vehicle selection is arranged around your party and luggage details."],
  },
  {
    slug: "sfb",
    code: "SFB",
    name: "Orlando Sanford International Airport",
    intro: "Private transportation can be requested for Sanford Airport (SFB) arrivals and departures.",
    details: ["Send your arrival or departure information when you request the trip.", "Availability is confirmed before travel.", "Ask about the appropriate vehicle for your party and luggage."],
  },
];

export const routes = [
  { slug: "mco-to-port-canaveral", title: "MCO to Port Canaveral", origin: "Orlando International Airport", destination: "Port Canaveral", intro: "Private transportation for cruise travelers connecting MCO and Port Canaveral.", image: "/images/routes/mco-to-port-canaveral.webp", imageAlt: "Private SUV traveling toward a Central Florida cruise terminal.", considerations: ["Share your flight and cruise timing", "Choose the right vehicle for people and luggage", "Review availability before finalizing your reservation"] },
  { slug: "mco-to-disney-world", title: "MCO to Disney World", origin: "Orlando International Airport", destination: "Disney World area", intro: "Private airport transportation for visitors traveling from MCO to the Disney World area.", image: "/images/routes/mco-to-disney-world-v2.webp", imageAlt: "Private SUV approaching a palm-lined Central Florida resort entrance.", considerations: ["Provide your arrival flight", "Share the resort or final destination", "Plan for your travel party and luggage"] },
  { slug: "the-villages-to-mco", title: "The Villages to MCO", origin: "The Villages", destination: "Orlando International Airport", intro: "Private transportation for travelers going between The Villages and MCO.", image: "/images/routes/the-villages-to-mco-v2.webp", imageAlt: "Executive vehicle on a palm-lined Central Florida boulevard at sunrise.", considerations: ["Plan around your flight departure", "Share pickup details during booking", "Review vehicle availability before travel"] },
];

export const googleReviews = {
  rating: "5.0",
  total: 15,
  reviews: [
    { author: "Milton James", age: "3 weeks ago", quote: "The company is very professional and always the highest level of service." },
    { author: "Wili L. Roberts", age: "3 months ago", quote: "Professional and reliable. They are the best in the business!" },
  ],
};

export const siteFaq = [
  { question: "How do I reserve transportation?", answer: "Use the online booking experience or call Revival Transportation Group. Trip details and availability are confirmed as part of the reservation process." },
  { question: "Which areas do you serve?", answer: "Central Florida is at the heart of Revival’s service area, including MCO, SFB and Port Canaveral. Contact the team to discuss travel beyond the region." },
  { question: "What fleet categories can I request?", answer: "Choose from Business SUV, Premium SUV, Executive Sedan and group transportation options. The team will help match the right category to your plans." },
  { question: "Can I use the website for a custom itinerary?", answer: "Yes. Share the pickup, destination, schedule and party details through the reservation or contact option. Revival will review the request for availability." },
];

export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/service-areas", label: "Service areas" },
  { href: "/corporate", label: "Corporate" },
  { href: "/about", label: "About" },
];

export const findService = (slug: string) => services.find((service) => service.slug === slug);
export const findAirport = (slug: string) => airports.find((airport) => airport.slug === slug);
export const findRoute = (slug: string) => routes.find((route) => route.slug === slug);
