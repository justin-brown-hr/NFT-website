# Artanova

Premium community-driven NFT ecosystem site (Next.js).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Framer Motion
- lucide-react
- Google Fonts: Playfair Display, Manrope, Petit Formal Script

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server (`0.0.0.0:3001`) |
| `npm run build` | Production **static** export → `out/` (IPFS-ready) |
| `npm run export` | Alias of `build` |
| `npm run preview:static` | Serve `out/` locally on port 3001 |
| `npm run deploy` | Build + Pinata upload + configure `artanova.net` (requires env vars) |
| `npm run start` | Next.js server mode (not used for IPFS) |
| `npm run lint` | ESLint |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Production build (IPFS)

```bash
npm install
npm run build
```

Upload the **`out/`** directory to IPFS (e.g. Pinata), then link the CID to your Unstoppable Domain.

**Full gateway / DNS / UD steps:** see [DEPLOY.md](./DEPLOY.md).

## Site routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about/` | About |
| `/journey/` | The Journey |
| `/community/` | Community |
| `/future-vision/` | Future Vision |

Collection links out to OpenSea.

## Assets

Place files in `public/images/`:

| File | Used in |
|------|---------|
| `logo-hummingbird.png` | Nav + Footer |
| `hero-gallery.jpg` | Hero full-bleed background |
| `portrait-about.jpg` | About section portrait |
