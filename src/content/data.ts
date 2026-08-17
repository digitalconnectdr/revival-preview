export type Service = {
  slug: string;
  name: string;
  heroTitle: string;
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  summary: string;
  description: string;
  images: { src: string; alt: string }[];
  highlights: string[];
  useCases: string[];
  useCaseDetails: string[];
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
    heroTitle: "Orlando airport transfers, planned around your flight.",
    seoTitle: "Orlando Airport Transfers & Private Car Service",
    seoDescription: "Private airport transfers for Orlando International Airport (MCO), Sanford Airport (SFB) and Central Florida travel. Reserve with Revival Transportation Group.",
    kicker: "Arrivals and departures",
    summary: "Private transportation for airport travel, coordinated around your itinerary.",
    description:
      "For airport arrivals and departures, Revival Transportation Group provides private transportation for Central Florida travelers. Flight changes and early or late travel can be discussed when you book.",
    images: [
      { src: "/images/services/airport-transfers-v4.webp", alt: "Private airport transfer with a chauffeur beside a dark SUV at an airport curbside." },
      { src: "/images/services/airport-transfers-02.webp", alt: "Airport arrival service with a chauffeur assisting a traveler and luggage beside a dark SUV." },
      { src: "/images/services/airport-transfers-03.webp", alt: "Airport departure service with a chauffeur loading a carry-on into a dark SUV." },
    ],
    highlights: ["MCO and SFB airport transportation", "Hotel, resort and Port Canaveral connections", "Vehicle fit reviewed with passenger and luggage details"],
    useCases: ["Airport arrivals at MCO or SFB", "Departures from hotels and resorts", "Airport-to-cruise and business travel"],
    useCaseDetails: ["Share the arriving airport, flight details and final Central Florida destination so the requested pickup can be reviewed.", "For an outbound flight, include the hotel or resort, preferred pickup time, passenger count and luggage when you request the ride.", "Airport connections to Port Canaveral, business appointments or another planned stop are reviewed against the full itinerary before booking."],
    faq: [
      { question: "Can I request private transportation for an arrival at MCO or SFB?", answer: "Yes. Include the airport, flight details, final destination and passenger count so Revival can review the requested arrival transfer." },
      { question: "Can I request an airport departure from a hotel or resort?", answer: "Yes. Share the pickup address, flight timing, passenger count and luggage details so the requested departure can be reviewed." },
      { question: "Can airport transportation be requested for an early or late flight?", answer: "Yes. Early and late requests can be discussed with the reservation team; availability is confirmed with the reservation." },
      { question: "How should I plan luggage and vehicle fit?", answer: "Provide the number of passengers, bags and any larger items. Revival reviews the appropriate vehicle category before the reservation is finalized." },
      { question: "Can I request an airport-to-hotel or airport-to-resort ride?", answer: "Yes. Include the hotel or resort name and the arrival details so the complete transfer request can be reviewed." },
      { question: "Can airport transportation connect with Port Canaveral or a business appointment?", answer: "Yes. Share the cruise terminal, meeting location or other planned stop with the flight details so the itinerary can be reviewed as one request." },
      { question: "What details should I provide when booking an airport transfer?", answer: "Include the airport, airline or flight timing when available, pickup or destination, passengers, luggage and any important itinerary stop. The final arrangement is confirmed during reservation." },
    ],
  },
  {
    slug: "executive-transportation",
    name: "Executive Transportation",
    heroTitle: "Executive transportation for Orlando and Central Florida.",
    seoTitle: "Executive Transportation in Orlando & Central Florida",
    seoDescription: "Professional private transportation for executive airport travel, client meetings and business itineraries across Orlando and Central Florida.",
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
    useCaseDetails: ["Coordinate arrivals for client meetings with a clear pickup location and schedule.", "Keep airport transfers aligned with the executive’s flight and destination details.", "Plan transportation around the timing, venue and guest movement for a business event."],
    faq: [
      { question: "Can an executive itinerary include multiple stops?", answer: "Include the requested stops when you inquire so availability and routing can be confirmed before the reservation is finalized." },
      { question: "Do you offer corporate accounts?", answer: "Corporate transportation is a listed service. Billing programs and account terms are confirmed directly with Revival before activation." },
    ],
  },
  {
    slug: "hourly-chauffeur",
    name: "Hourly Chauffeur",
    heroTitle: "Hourly chauffeur service for a flexible Central Florida day.",
    seoTitle: "Hourly Chauffeur Service in Orlando & Central Florida",
    seoDescription: "Reserve a private hourly chauffeur in Orlando and Central Florida for multi-stop business, dining, event and flexible travel itineraries.",
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
    useCaseDetails: ["Keep a series of meetings connected without arranging a separate ride for every stop.", "Build a private transportation plan around dinner, entertainment or a milestone occasion.", "Start with the locations and likely timing, then review the arrangement with the reservation team."],
    faq: [
      { question: "How is hourly chauffeur service arranged?", answer: "Tell Revival about your schedule, stops and passenger needs. Exact minimums and charges are confirmed before booking." },
      { question: "Can my itinerary change during the day?", answer: "Let the chauffeur or reservation team know as soon as possible. Changes remain subject to availability and the agreed reservation terms." },
    ],
  },
  {
    slug: "city-to-city",
    name: "City-to-City Transportation",
    heroTitle: "Private city-to-city transportation across Central Florida.",
    seoTitle: "City-to-City Private Car Service in Central Florida",
    seoDescription: "Private city-to-city transportation for Central Florida airports, ports, resorts and planned destinations. Travel with Revival Transportation Group.",
    kicker: "Private travel between destinations",
    summary: "A private transportation option for travel between cities, airports, ports and planned destinations.",
    description:
      "City-to-city transportation is available for travelers who want a private, scheduled trip rather than a shared ride. Send the origin, destination and timing to receive a confirmed option.",
    images: [
      { src: "/images/services/city-to-city-v4.webp", alt: "City-to-city private transportation on a coastal highway at sunset." },
      { src: "/images/services/city-to-city-02.webp", alt: "Private SUV traveling on an open Central Florida highway." },
      { src: "/images/services/city-to-city-03.webp", alt: "Long-distance private travel along a palm-lined coastal causeway." },
    ],
    highlights: ["Scheduled private travel", "Door-to-door trip details", "Central Florida and Northeast markets"],
    useCases: ["Intercity trips", "Airport connections", "Planned family travel"],
    useCaseDetails: ["Travel between Central Florida destinations with pickup, destination and timing confirmed in advance.", "Link an airport, port or resort stay to the next destination in a single private itinerary.", "Arrange a door-to-door trip around the party size, luggage and schedule for a family visit."],
    faq: [
      { question: "Which city-to-city routes are available?", answer: "The availability of each route is confirmed at booking. Popular Central Florida routes are shown on this website for planning." },
      { question: "Can I request a custom destination?", answer: "Yes. Use the booking or contact option with your full travel details so the team can review the request." },
    ],
  },
  {
    slug: "port-canaveral-transfers",
    name: "Port Canaveral Transfers",
    heroTitle: "Private Port Canaveral transfers from MCO and Central Florida.",
    seoTitle: "MCO to Port Canaveral Private Transfers",
    seoDescription: "Private transportation between Orlando International Airport (MCO), Central Florida and Port Canaveral for cruise travelers and their luggage.",
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
    useCaseDetails: ["Coordinate a private ride for cruise embarkation with terminal, luggage and party details shared early.", "Plan a return transfer after the cruise with the expected disembarkation timing and destination.", "Connect MCO and Port Canaveral with flight, cruise and luggage details reviewed together."],
    faq: [
      { question: "Can I request a transfer between MCO and Port Canaveral?", answer: "Yes. This is a featured route; share flight and cruise details so availability can be confirmed." },
      { question: "How do I plan for luggage?", answer: "Include the number of travelers and the luggage you expect when you inquire. Vehicle selection is confirmed with the reservation." },
    ],
  },
  {
    slug: "in-city-rides",
    name: "In-City Rides",
    heroTitle: "Private local rides in Orlando and Central Florida.",
    seoTitle: "Private Car Service for Orlando Local Rides",
    seoDescription: "Private local transportation for Orlando and Central Florida appointments, restaurants, families, visitors and special occasions.",
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
    useCaseDetails: ["Arrange a private ride for a restaurant, show, celebration or an evening with several stops.", "Give visiting family a simple, private way to move between hotels, homes and local plans.", "Confirm a comfortable local pickup for appointments and planned daytime travel."],
    faq: [
      { question: "Can I reserve a local private ride for visitors?", answer: "Yes. Provide the pickup, destination, date and passenger details when you request your trip." },
      { question: "Are event rides available?", answer: "Private events and special occasions are listed services. Availability is confirmed for each request." },
    ],
  },
  {
    slug: "events-group-transportation",
    name: "Events & Group Transportation",
    heroTitle: "Event and group transportation in Orlando and Central Florida.",
    seoTitle: "Orlando Event & Group Transportation",
    seoDescription: "Coordinated private transportation for Orlando and Central Florida events, conferences, families and group travel plans.",
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
    useCaseDetails: ["Coordinate transportation around conference sessions, hotels and guest arrival windows.", "Match a family celebration to the party size, luggage and the day’s planned locations.", "Review a private event itinerary early so vehicle capacity and timing can be confirmed."],
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
    seoTitle: "MCO Airport Transportation | Orlando Private Car Service",
    seoDescription: "Private transportation for Orlando International Airport (MCO) arrivals, departures, resorts, Port Canaveral and Central Florida destinations.",
    intro: "Request private transportation for MCO arrivals, departures and onward travel around Central Florida.",
    details: ["Share flight timing and travel details with your reservation request.", "Flight-change support is available when plans shift.", "Vehicle selection is arranged around your party and luggage details."],
  },
  {
    slug: "sfb",
    code: "SFB",
    name: "Orlando Sanford International Airport",
    seoTitle: "SFB Airport Transportation | Sanford Private Car Service",
    seoDescription: "Private transportation for Orlando Sanford International Airport (SFB) arrivals, departures and Central Florida travel with Revival Transportation Group.",
    intro: "Private transportation can be requested for Sanford Airport (SFB) arrivals and departures.",
    details: ["Send your arrival or departure information when you request the trip.", "Availability is confirmed before travel.", "Ask about the appropriate vehicle for your party and luggage."],
  },
];

export type Route = {
  slug: string;
  title: string;
  origin: string;
  destination: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
  considerations: string[];
  overview: string;
  travelerContext: string;
  pickupPlanning: string;
  luggagePlanning: string;
  vehicleGuidance: string;
  bookingGuidance: string;
  scenarios: { title: string; detail: string }[];
  relatedServices: string[];
  faq: { question: string; answer: string }[];
};

export const routes: Route[] = [
  {
    slug: "mco-to-port-canaveral",
    title: "MCO to Port Canaveral",
    origin: "Orlando International Airport",
    destination: "Port Canaveral",
    intro: "Private transportation for cruise travelers connecting MCO and Port Canaveral.",
    seoTitle: "MCO to Port Canaveral Private Transportation",
    seoDescription: "Private transportation from Orlando International Airport (MCO) to Port Canaveral for cruise travelers, families and luggage-heavy itineraries.",
    image: "/images/routes/mco-to-port-canaveral.webp",
    imageAlt: "Private SUV traveling toward a Central Florida cruise terminal.",
    considerations: ["Share your flight and cruise timing", "Choose the right vehicle for people and luggage", "Review availability before finalizing your reservation"],
    overview: "This private route connects Orlando International Airport and Port Canaveral for travelers beginning or ending a cruise vacation. Revival reviews the flight, terminal, party and luggage details together so the request starts with the right context.",
    travelerContext: "A useful option for cruise parties arriving by air, families with several bags, and travelers continuing to a Central Florida hotel before or after sailing.",
    pickupPlanning: "Include the airline, flight timing and requested meeting details when you book. For cruise travel, add the ship or terminal information you have so the arrival plan can be reviewed clearly.",
    luggagePlanning: "Cruise itineraries often involve more luggage than a typical airport ride. Sharing bag count, strollers or mobility items in advance helps Revival confirm an appropriate vehicle category.",
    vehicleGuidance: "Business SUVs, premium SUVs and group transportation are reviewed around passenger count and luggage. Final vehicle assignment is confirmed with the reservation rather than assumed from a category.",
    bookingGuidance: "Book once the flight and cruise details are known, especially for embarkation dates, holiday travel or larger parties. Revival confirms the arrangement before the reservation is finalized.",
    scenarios: [
      { title: "Fly in and sail", detail: "Coordinate an MCO arrival with a private ride to the Port Canaveral cruise terminal." },
      { title: "Cruise return day", detail: "Plan the next ride from the port to MCO, a Central Florida hotel or another confirmed destination." },
      { title: "Family cruise planning", detail: "Review vehicle fit early when children, multiple bags or a larger travel party are involved." },
    ],
    relatedServices: ["airport-transfers", "port-canaveral-transfers", "events-group-transportation"],
    faq: [
      { question: "Can I request private transportation from MCO to Port Canaveral?", answer: "Yes. Share your flight and cruise details so Revival can review availability for the requested itinerary." },
      { question: "What pickup details should I provide at Orlando International Airport?", answer: "Include your airline, flight timing, passenger count and any meeting details you have. The final pickup plan is confirmed with the reservation." },
      { question: "Can the vehicle be planned around cruise luggage?", answer: "Yes. Let Revival know the number of travelers, bags and any larger items so the vehicle category can be reviewed before booking." },
      { question: "Can I request a return ride from Port Canaveral?", answer: "Yes. Provide the expected disembarkation timing and your next destination, such as MCO or a Central Florida hotel." },
      { question: "When should I book an MCO to Port Canaveral transfer?", answer: "Request the trip when your flight and cruise plans are known. Earlier requests are especially helpful for busy cruise dates and larger parties." },
      { question: "Are travel times guaranteed for this route?", answer: "No. Travel conditions can vary, so Revival reviews the itinerary details rather than promising a fixed travel time." },
    ],
  },
  {
    slug: "mco-to-disney-world",
    title: "MCO to Disney World",
    origin: "Orlando International Airport",
    destination: "Disney World area",
    intro: "Private airport transportation for visitors traveling from MCO to the Disney World area.",
    seoTitle: "MCO to Disney World Private Transportation",
    seoDescription: "Private airport transportation from Orlando International Airport (MCO) to Disney World area resorts, hotels and vacation stays in Central Florida.",
    image: "/images/routes/mco-to-disney-world-v2.webp",
    imageAlt: "Private SUV approaching a palm-lined Central Florida resort entrance.",
    considerations: ["Provide your arrival flight", "Share the resort or final destination", "Plan for your travel party and luggage"],
    overview: "This route is for visitors arriving at Orlando International Airport and continuing to a Disney World area resort, hotel or vacation stay. A private reservation brings the airport, resort and luggage details into one arrival plan.",
    travelerContext: "It suits families, couples, first-time Orlando visitors and groups who want a direct private ride after a flight instead of coordinating separate transportation on arrival.",
    pickupPlanning: "Share your arrival flight and resort or final destination. If your party has a preferred pickup window or special arrival detail, include it with the request for review.",
    luggagePlanning: "List travelers, bags, strollers and other items before the reservation is confirmed. This helps Revival evaluate vehicle fit for a vacation arrival rather than making assumptions.",
    vehicleGuidance: "SUV and group transportation categories are reviewed around the size of the travel party and luggage. The reservation team confirms the category that fits the requested itinerary.",
    bookingGuidance: "Reserve after the flight and resort details are settled. For holiday periods, larger families and event travel, an earlier request gives the team more time to review availability.",
    scenarios: [
      { title: "Resort arrival", detail: "Continue from MCO to a Disney World area hotel or resort with a private, confirmed destination." },
      { title: "Family vacation", detail: "Plan for children, strollers and vacation luggage before the vehicle category is confirmed." },
      { title: "Airport-to-resort connection", detail: "Keep flight, pickup and hotel details together so the reservation team can review the full arrival plan." },
    ],
    relatedServices: ["airport-transfers", "in-city-rides", "events-group-transportation"],
    faq: [
      { question: "Can I request a private ride from MCO to a Disney World area resort?", answer: "Yes. Include your flight, resort or hotel and passenger details so Revival can review availability." },
      { question: "Do I need to know the exact resort before booking?", answer: "The final destination helps confirm the request. If details are still being finalized, contact Revival with what you know and update the team when available." },
      { question: "Can you plan for strollers and vacation luggage?", answer: "Yes. Mention bags, strollers and other larger items when you inquire so vehicle fit can be reviewed." },
      { question: "Can I request transportation for a larger family group?", answer: "Yes. Group size and luggage details determine the appropriate arrangement, which is confirmed before booking." },
      { question: "Can this route include a grocery or other stop?", answer: "Share the full itinerary with Revival. Additional stops are reviewed as part of the requested travel plan and availability." },
      { question: "What should I do if my flight changes?", answer: "Contact Revival as soon as possible with the updated information. Any adjustment remains subject to the confirmed reservation and availability." },
    ],
  },
  {
    slug: "the-villages-to-mco",
    title: "The Villages to MCO",
    origin: "The Villages",
    destination: "Orlando International Airport",
    intro: "Private transportation for travelers going between The Villages and MCO.",
    seoTitle: "The Villages to MCO Private Transportation",
    seoDescription: "Private car service from The Villages to Orlando International Airport (MCO) for airport departures, returning travelers and planned Central Florida trips.",
    image: "/images/routes/the-villages-to-mco-v2.webp",
    imageAlt: "Executive vehicle on a palm-lined Central Florida boulevard at sunrise.",
    considerations: ["Plan around your flight departure", "Share pickup details during booking", "Review vehicle availability before travel"],
    overview: "This route supports travelers departing from The Villages for Orlando International Airport, as well as returning airport travelers headed home. The reservation begins with the flight, pickup location, party and luggage details.",
    travelerContext: "It is useful for travelers who prefer a private, scheduled airport ride, visiting family members, and households coordinating luggage or a precise departure plan.",
    pickupPlanning: "Provide your The Villages pickup location, flight timing and any gate or community details that help clarify the start of the trip. Revival confirms the pickup plan with the reservation.",
    luggagePlanning: "Share the number of passengers and bags, particularly when several travelers are departing together. The reservation team uses those details to review vehicle fit.",
    vehicleGuidance: "Executive sedans and SUV categories can be considered for smaller parties, while larger requests are reviewed around passengers and luggage. The confirmed reservation determines the final category.",
    bookingGuidance: "Request the trip once your flight is booked and the pickup details are available. Allow additional planning time for early departures, return travel and group requests.",
    scenarios: [
      { title: "Airport departure", detail: "Plan a private pickup from The Villages around the flight schedule and airport destination." },
      { title: "Returning home", detail: "Arrange an MCO arrival transfer back to The Villages with the flight and luggage details included." },
      { title: "Visiting family", detail: "Coordinate airport transportation for guests arriving or departing from a household in The Villages." },
    ],
    relatedServices: ["airport-transfers", "city-to-city", "executive-transportation"],
    faq: [
      { question: "Can I request transportation from The Villages to MCO?", answer: "Yes. Provide the pickup location, flight timing, passenger count and luggage details so Revival can review the request." },
      { question: "Can I request the reverse trip from MCO to The Villages?", answer: "Yes. Share the arriving flight and destination details to discuss availability for the return journey." },
      { question: "How should I plan an early airport departure?", answer: "Include the flight schedule and preferred pickup details when you inquire. Revival confirms the final arrangement before travel." },
      { question: "What luggage information is helpful?", answer: "Tell the team how many travelers and bags are expected, along with any larger items that may affect vehicle fit." },
      { question: "Can family members travel together to the airport?", answer: "Yes. The requested party size and luggage are reviewed so Revival can confirm a suitable transportation arrangement." },
      { question: "Are airport arrival and departure times guaranteed?", answer: "No. The route is planned around the confirmed itinerary, but travel conditions and airline operations can change." },
    ],
  },
];

export const googleReviews = {
  rating: "5.0",
  total: 15,
  lastChecked: "August 9, 2026",
  reviews: [
    { author: "Milton James", quote: "The company is very professional and always the highest level of service." },
    { author: "Wili L. Roberts", quote: "Professional and reliable. They are the best in the business!" },
  ],
};

export const siteFaq = [
  { question: "How do I reserve transportation?", answer: "Use the online booking experience or call Revival Transportation Group. Trip details and availability are confirmed as part of the reservation process." },
  { question: "Which areas do you serve?", answer: "Revival serves Central Florida, including MCO, SFB, Port Canaveral, Walt Disney World and Universal Orlando, as well as active Northeast markets in New York, New Jersey, Connecticut, Massachusetts and Pennsylvania." },
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
