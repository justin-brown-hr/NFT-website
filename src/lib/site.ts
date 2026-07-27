/**
 * Central brand & site config.
 * Update links and planned routes here — components import from this file.
 */

export const BRAND = {
  name: "Artanova",
  /** Client prefers no tagline on the live site */
  tagline: null as string | null,
} as const;

export const LINKS = {
  opensea: "https://opensea.io/collection/artanova-nft",
  discord: "https://discord.gg/tmgcaJWhp",
  x: "https://x.com/ArtanovaN92268",
} as const;

/** Primary single-page navigation */
export const NAV_LINKS = [
  { label: "HOME", href: "#home", external: false },
  { label: "COLLECTION", href: LINKS.opensea, external: true },
  { label: "ABOUT", href: "#about", external: false },
  { label: "VISION", href: "#vision", external: false },
  { label: "CONNECT", href: "#connect", external: false },
] as const;

export const FOOTER_LINKS = [
  { label: "COLLECTION", href: LINKS.opensea, external: true },
  { label: "ABOUT", href: "#about", external: false },
  { label: "VISION", href: "#vision", external: false },
  { label: "CONNECT", href: "#connect", external: false },
] as const;

/**
 * Planned expansions — add App Router pages under /src/app when ready.
 * Keep routes reserved so the nav can grow without restructuring.
 */
export const FUTURE_ROUTES = [
  { slug: "comic", path: "/comic", label: "Comic", description: "Story & comic series" },
  { slug: "shop", path: "/shop", label: "Merchandise", description: "Official merchandise" },
  { slug: "events", path: "/events", label: "Events", description: "Drops and gatherings" },
  { slug: "community", path: "/community", label: "Community", description: "Community hub" },
  { slug: "token", path: "/token", label: "Token", description: "Token information" },
] as const;
