import Image from "next/image";
import type { FleetVehicle } from "@/content/data";

type FleetCardProps = {
  headingLevel?: "h2" | "h3";
  vehicle: FleetVehicle;
  labels?: { passengers: string; luggage: string; confirmation: string };
};

export function FleetCard({ headingLevel = "h3", vehicle, labels }: FleetCardProps) {
  const Heading = headingLevel;

  return <article className="fleet-card">
    <div className="fleet-image">
      <Image alt={vehicle.imageAlt} fill sizes="(max-width: 780px) 90vw, (max-width: 1050px) 42vw, 360px" src={vehicle.image} />
    </div>
    <p className="card-kicker">{vehicle.category}</p>
    <Heading>{vehicle.name}</Heading>
    <dl><div><dt>{labels?.passengers ?? "Passengers"}</dt><dd>{vehicle.capacity}</dd></div><div><dt>{labels?.luggage ?? "Luggage"}</dt><dd>{vehicle.luggage}</dd></div></dl>
    <p>{vehicle.description}</p>
    {vehicle.status === "conflict" && <p className="fleet-disclosure">{labels?.confirmation ?? "Group capacity is confirmed directly before booking."}</p>}
  </article>;
}
