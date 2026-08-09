import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Revival Transportation Group",
    short_name: "Revival",
    description: "Private transportation for airport, corporate, cruise and city-to-city travel across Central Florida.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4ee",
    theme_color: "#0b0d10",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
