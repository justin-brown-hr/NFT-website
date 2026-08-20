# Artanova Website — Full Project Deliverable

| Field | Detail |
|-------|--------|
| **Project** | Artanova official website |
| **Brand** | Artanova |
| **Client deliverable date** | August 2026 |
| **Status** | Delivered and live |
| **Primary live URL** | https://artanova.net |
| **Source code (Git)** | https://github.com/justin-brown-hr/NFT-website |
| **Git clone (HTTPS)** | `https://github.com/justin-brown-hr/NFT-website.git` |
| **Git clone (SSH)** | `git@github.com:justin-brown-hr/NFT-website.git` |
| **Default branch** | `main` |

---

## Table of contents

1. [Executive summary](#1-executive-summary)
2. [Repository & access](#2-repository--access)
3. [Live URLs & identifiers](#3-live-urls--identifiers)
4. [Scope of delivery](#4-scope-of-delivery)
5. [Site map & pages](#5-site-map--pages)
6. [Design & brand](#6-design--brand)
7. [Integrations & links](#7-integrations--links)
8. [Technology stack](#8-technology-stack)
9. [Domains: artanova.net vs artanova.x](#9-domains-artanovanet-vs-artanovax)
10. [Hosting & deployment](#10-hosting--deployment)
11. [Local development](#11-local-development)
12. [Project structure](#12-project-structure)
13. [Handover checklist](#13-handover-checklist)
14. [Acceptance criteria](#14-acceptance-criteria)
15. [Out of scope / deferred](#15-out-of-scope--deferred)
16. [Recommended next steps](#16-recommended-next-steps)
17. [How to request changes](#17-how-to-request-changes)
18. [Appendix](#18-appendix)

---

## 1. Executive summary

A premium, multi-page marketing website for the **Artanova** NFT ecosystem has been designed, developed, and deployed.

- The **main public website** is **https://artanova.net** (clean HTTPS; address bar stays on the brand domain).
- The **Web3 domain** **artanova.x** points at the same site content via Unstoppable / IPFS (gateway URL in the address bar is normal for `.x` names).
- Full source code is in GitHub: **https://github.com/justin-brown-hr/NFT-website**

The site communicates brand, journey, community, and the Nerina Collection, and reserves routes for comic, merchandise, events, and token pages.

---

## 2. Repository & access

| Item | Value |
|------|--------|
| **GitHub repository** | https://github.com/justin-brown-hr/NFT-website |
| **Clone (HTTPS)** | `git clone https://github.com/justin-brown-hr/NFT-website.git` |
| **Clone (SSH)** | `git clone git@github.com:justin-brown-hr/NFT-website.git` |
| **Primary branch** | `main` |
| **Remote name** | `origin` |

### Clone and run (quick start)

```bash
git clone https://github.com/justin-brown-hr/NFT-website.git
cd NFT-website
npm install
npm run dev
```

Open http://localhost:3001

### Production build

```bash
npm run build
# Static site output → out/
```

---

## 3. Live URLs & identifiers

| Purpose | URL / ID | Notes |
|---------|----------|--------|
| **Primary website** | https://artanova.net | Use this for marketing, social bios, press, business cards |
| **Web3 domain** | artanova.x | Needs Unstoppable extension / Brave / compatible resolver |
| **IPFS gateway (backup)** | https://bafybeidgcdwugcp3wlqql4tctpbcw2gkqtzletyherw6jxhv5l7q2cihxy.ipfs.dweb.link/ | Same static site on IPFS |
| **IPFS CID** | `bafybeidgcdwugcp3wlqql4tctpbcw2gkqtzletyherw6jxhv5l7q2cihxy` | Pinata / immutable content id |
| **Source code** | https://github.com/justin-brown-hr/NFT-website | Full project repository |
| **OpenSea collection** | https://opensea.io/collection/artanova-nft | Nerina Collection |

**Recommended public link:** `https://artanova.net`

---

## 4. Scope of delivery

### Included

- Custom Artanova website (design + front-end implementation)
- Multi-page information architecture (Home, About, Journey, Community, Vision)
- Responsive desktop and mobile layouts
- Brand motion / ocean atmosphere treatment on hero
- Navigation, footer, social icons
- OpenSea collection deep link (“Nerina Collection”)
- Static export for CDN / IPFS hosting
- Unstoppable Domains configuration for **artanova.net** (HTTPS)
- IPFS pin of production build (CID above)
- Reserved coming-soon routes for comic, shop, events, token
- Deploy scripts and deployment notes in repo (`DEPLOY.md`, `DEPLOYMENT.md`, `scripts/`)
- GitHub repository with source on `main`

### Not included (unless agreed separately)

- Smart contract development
- OpenSea collection minting / metadata pipeline
- Paid ads / SEO campaign management
- 24/7 managed hosting SLA (see §16 for permanent host recommendation)
- Merchandise fulfillment / e-commerce checkout
- Comic content production

---

## 5. Site map & pages

### Live pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Full-bleed hero, Artanova brand, ocean atmosphere, explore destinations |
| About | `/about/` | Brand story and portrait |
| The Journey | `/journey/` | Three phases: Beginning → Adventure → Real-World Investments |
| Community | `/community/` | Community messaging and join CTAs |
| Future Vision | `/future-vision/` | Long-term vision |
| Nerina Collection | External | Opens OpenSea collection in a new tab |

### Reserved / coming-soon pages

| Path | Label | Status |
|------|-------|--------|
| `/comic/` | Comic | Placeholder — ready when content is provided |
| `/shop/` | Merchandise | Placeholder — deferred until merch is ready |
| `/events/` | Events | Placeholder |
| `/token/` | Token | Placeholder |

Central config for links and future routes: `src/lib/site.ts`

---

## 6. Design & brand

| Aspect | Detail |
|--------|--------|
| Visual direction | Dark ocean / Nerina atmosphere, gold accents |
| Typography | Playfair Display, Manrope, Petit Formal Script (Google Fonts) |
| Motion | Framer Motion; respects `prefers-reduced-motion` |
| Layout | One composition hero; responsive nav (desktop + mobile menu) |
| Key assets | `public/images/logo-hummingbird.png`, `hero-gallery.jpg`, `portrait-about.jpg` |

---

## 7. Integrations & links

Configured in `src/lib/site.ts`:

| Channel | URL |
|---------|-----|
| OpenSea | https://opensea.io/collection/artanova-nft |
| Discord | https://discord.gg/tmgcaJWhp |
| X (Twitter) | https://x.com/ArtanovaN92268 |

Email DNS on **artanova.net** (Google MX / SPF) was preserved during domain setup.

---

## 8. Technology stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Motion | Framer Motion |
| Output mode | Static export (`output: "export"`) → `out/` |
| Domains | Unstoppable Domains |
| IPFS pinning | Pinata |
| CI helper | GitHub Actions workflow for Pages (`.github/workflows/pages.yml`) |
| Package manager | npm |

---

## 9. Domains: artanova.net vs artanova.x

Both names can show the **same Artanova website**. They are different systems:

| | **artanova.net** | **artanova.x** |
|---|------------------|----------------|
| Type | Traditional DNS / ICANN domain | Web3 / blockchain domain |
| Works in normal Chrome / Safari | Yes | Needs Unstoppable extension, Brave, or similar |
| Address bar | Stays on `https://artanova.net` | Often rewrites to IPFS gateway (`inbrowser.link` / `dweb.link`) |
| Best use | Marketing, SEO, everyday visitors | Web3 / crypto audience |
| API / DNS control | Configurable via Unstoppable DNS / reverse proxy | Website link requires **wallet signature** in UD dashboard |

**This is expected Unstoppable behavior, not a website defect.**

Optional later improvement: set **artanova.x** to **redirect** to `https://artanova.net` (owner wallet must sign). Then `.x` always lands on the clean `.net` URL.

---

## 10. Hosting & deployment

### Current production posture

| Item | Detail |
|------|--------|
| **artanova.net** | Unstoppable reverse proxy + HTTPS (Let’s Encrypt for `CN=artanova.net`) |
| **Origin** | Static files from production build (`out/`) |
| **IPFS** | CID `bafybeidgcdwugcp3wlqql4tctpbcw2gkqtzletyherw6jxhv5l7q2cihxy` for web3 / backup |
| **Email** | Google MX / SPF retained |

> **Ops note:** For long-term 24/7 reliability, move the static origin to **Vercel, Netlify, or Cloudflare Pages** (or a named Cloudflare tunnel) and point the Unstoppable reverse proxy at that hostname — **not** a public IPFS gateway (gateways rewrite the address bar).

### Redeploy overview

```bash
git clone https://github.com/justin-brown-hr/NFT-website.git
cd NFT-website
npm install
npm run build          # writes out/
# Then publish out/ to the chosen host + optionally re-pin to Pinata
```

Detailed IPFS / Unstoppable steps: see repo file **[DEPLOY.md](./DEPLOY.md)**  
Environment notes: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

Deploy helpers:

- `npm run deploy` / `scripts/deploy.sh`
- `scripts/deploy-full.py`
- `scripts/pinata-upload.py`

---

## 11. Local development

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server on `0.0.0.0:3001` |
| `npm run build` | Production static export → `out/` |
| `npm run preview:static` | Serve `out/` locally |
| `npm run lint` | ESLint |

Requirements: **Node.js 20+**

---

## 12. Project structure (high level)

```text
NFT-website/
├── src/
│   ├── app/                 # Routes (page.tsx per path)
│   │   ├── page.tsx         # Home
│   │   ├── about/
│   │   ├── journey/
│   │   ├── community/
│   │   ├── future-vision/
│   │   ├── comic/ shop/ events/ token/   # Reserved
│   ├── components/          # UI sections (Hero, Nav, Footer, …)
│   ├── hooks/
│   └── lib/site.ts          # Brand links, nav, phases, future routes
├── public/images/           # Logos, hero, icons
├── scripts/                 # Deploy / Pinata helpers
├── .github/workflows/       # Pages deploy workflow
├── out/                     # Generated static site (after build)
├── DELIVERABLE.md           # This document
├── DEPLOY.md
├── DEPLOYMENT.md
└── README.md
```

---

## 13. Handover checklist

- [x] Multi-page Artanova site designed and built  
- [x] Source code in GitHub: https://github.com/justin-brown-hr/NFT-website  
- [x] Production static build pipeline (`npm run build` → `out/`)  
- [x] https://artanova.net live with valid HTTPS  
- [x] IPFS CID available for web3 / backup  
- [x] OpenSea, Discord, and X links wired  
- [x] Future routes reserved (comic, shop, events, token)  
- [x] Deployment documentation in repo  
- [ ] Permanent production host (Vercel / Netlify / Cloudflare Pages) — recommended  
- [ ] Full comic / merchandise content when client assets are ready  
- [ ] Optional: artanova.x redirect → artanova.net (client wallet sign)  
- [ ] Rotate any API keys shared during setup  

---

## 14. Acceptance criteria

| Criterion | Result |
|-----------|--------|
| Brand site live at https://artanova.net | **Pass** |
| Valid HTTPS certificate for artanova.net | **Pass** |
| About, Journey, Community, Vision pages available | **Pass** |
| Nerina Collection links to OpenSea | **Pass** |
| Mobile-friendly layout | **Pass** |
| Source code available in Git | **Pass** — https://github.com/justin-brown-hr/NFT-website |
| artanova.x serves same site content (Web3 / IPFS path) | **Pass** (gateway URL behavior documented in §9) |

---

## 15. Out of scope / deferred

| Item | Notes |
|------|--------|
| Merchandise store | Route reserved (`/shop/`); build when catalog is ready |
| Comic series pages | Route reserved (`/comic/`) |
| Token page | Route reserved (`/token/`) |
| Events calendar | Route reserved (`/events/`) |
| Permanent managed hosting | Recommended upgrade (see §16) |

---

## 16. Recommended next steps

1. **Stable hosting** — Deploy `out/` (or connect the GitHub repo) to Vercel / Netlify / Cloudflare Pages; point Unstoppable reverse proxy for `artanova.net` at that host.  
2. **artanova.x** — Confirm Link Website + wallet signature; or set redirect to `https://artanova.net`.  
3. **Security** — Rotate Pinata / Unstoppable API keys if they were shared outside a password manager.  
4. **Content launch** — Provide comic / merch copy and assets to fill reserved routes.  
5. **Repo access** — Ensure client / maintainers have GitHub access to https://github.com/justin-brown-hr/NFT-website  

---

## 17. How to request changes

Send a short brief with:

1. Page or section to change  
2. New copy (or markups)  
3. New images (PNG/JPG/SVG, preferably high resolution)  
4. Any link updates (OpenSea, Discord, X)

Standard workflow:

```text
Edit code in repo → npm run build → publish out/ → (optional) re-pin IPFS CID
```

---

## 18. Appendix

### A. Quick reference card

| Item | Link |
|------|------|
| Live site | https://artanova.net |
| GitHub | https://github.com/justin-brown-hr/NFT-website |
| Clone HTTPS | `https://github.com/justin-brown-hr/NFT-website.git` |
| IPFS CID | `bafybeidgcdwugcp3wlqql4tctpbcw2gkqtzletyherw6jxhv5l7q2cihxy` |
| OpenSea | https://opensea.io/collection/artanova-nft |
| Discord | https://discord.gg/tmgcaJWhp |
| X | https://x.com/ArtanovaN92268 |

### B. Related repo documents

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Developer overview |
| [DEPLOY.md](./DEPLOY.md) | IPFS + Unstoppable deploy guide |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Live deployment record / ops notes |
| [DELIVERABLE.md](./DELIVERABLE.md) | This client deliverable |

### C. Cover message (optional email)

```text
Hi,

Please find the full Artanova website deliverable (DELIVERABLE.md).

Live site:  https://artanova.net
Source code: https://github.com/justin-brown-hr/NFT-website

The document covers delivered pages, domains (artanova.net + artanova.x),
hosting, acceptance checklist, and recommended next steps.

Thanks
```

---

**Document version:** 1.1  
**Repository:** https://github.com/justin-brown-hr/NFT-website  
**Live site:** https://artanova.net
