import Link from "next/link";
import { PrimaryCta } from "@/components/site-components";

// English 404 page.

export default function NotFound() { return <section className="not-found"><div className="container"><p className="eyebrow">404</p><h1>This route is not on the itinerary.</h1><p>Return to the homepage, explore services or begin a reservation.</p><div><Link className="button button-dark" href="/">Back home</Link><PrimaryCta placement="404" /></div></div></section>; }
