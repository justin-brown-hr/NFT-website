/**
 * Central brand & site config.
 * Update links and planned routes here — components import from this file.
 */

export const BRAND = {
  name: "Artanova",
  tagline: "A community-driven ecosystem",
} as const;

export const LINKS = {
  opensea: "https://opensea.io/collection/artanova-nft",
  discord: "https://discord.gg/tmgcaJWhp",
  x: "https://x.com/ArtanovaN92268",
} as const;

/** Primary multi-page navigation */
export const NAV_LINKS = [
  { label: "ABOUT", href: "/about", external: false },
  { label: "JOURNEY", href: "/journey", external: false },
  { label: "COMMUNITY", href: "/community", external: false },
  { label: "VISION", href: "/future-vision", external: false },
  { label: "NERINA COLLECTION", href: LINKS.opensea, external: true },
] as const;

/** Homepage explore destinations — full names for a premium brand portal feel */
export const EXPLORE_LINKS = [
  { label: "About", href: "/about", external: false, description: "Who we are" },
  { label: "The Journey", href: "/journey", external: false, description: "Three phases" },
  { label: "Community", href: "/community", external: false, description: "Join us" },
  { label: "Nerina Collection", href: LINKS.opensea, external: true, description: "On OpenSea" },
  { label: "Future Vision", href: "/future-vision", external: false, description: "Where we go" },
] as const;

export const FOOTER_LINKS = [
  { label: "ABOUT", href: "/about", external: false },
  { label: "JOURNEY", href: "/journey", external: false },
  { label: "COMMUNITY", href: "/community", external: false },
  { label: "VISION", href: "/future-vision", external: false },
  { label: "NERINA COLLECTION", href: LINKS.opensea, external: true },
] as const;

export const PHASES = [
  {
    phase: "01",
    title: "The Beginning",
    summary:
      "Our first collection introduces original characters and a comic universe — bringing together people who believe in creativity, innovation, and community. Holders join the Artanova journey from day one.",
  },
  {
    phase: "02",
    title: "Adventure",
    summary:
      "The story expands as the community steps into the real world — travel experiences, shared adventures, and interactive activities that connect members beyond the digital space.",
  },
  {
    phase: "03",
    title: "Real-World Investments",
    summary:
      "Artanova becomes a community with ownership in real-world assets. Members participate in investments and projects that create lasting value beyond NFTs.",
  },
] as const;

/**
 * Planned expansions — add App Router pages under /src/app when ready.
 * Keep routes reserved so the nav can grow without restructuring.
 */
export const FUTURE_ROUTES = [
  { slug: "comic", path: "/comic", label: "Comic", description: "Story & comic series" },
  { slug: "shop", path: "/shop", label: "Merchandise", description: "Official merchandise" },
  { slug: "events", path: "/events", label: "Events", description: "Drops and gatherings" },
  { slug: "token", path: "/token", label: "Token", description: "Token information" },
] as const;
