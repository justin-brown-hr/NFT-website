# Artanova — IPFS & Unstoppable Domains Deployment

This document covers production deployment to **IPFS** and linking a live site to an **Unstoppable Domain**, including gateway/DNS notes for client handoff.

---

## Prerequisites

| Item | Notes |
|------|--------|
| Node.js 20+ | For local build |
| This repo | Build scripts below |
| Unstoppable Domain | Purchased + claimed in [ud.me](https://ud.me) / [unstoppabledomains.com](https://unstoppabledomains.com) |
| IPFS pin provider | **Pinata** (recommended) or UD’s built-in website uploader |
| Wallet | MetaMask (or UD wallet) to sign the domain record update |

---

## 1. Build a production-ready static site

IPFS can only host **static files**. This project is configured for Next.js static export:

- `output: "export"` → writes HTML/CSS/JS into `out/`
- `trailingSlash: true` → each route becomes `out/about/index.html` (required for IPFS gateways)
- `images.unoptimized: true` → images work without a Next.js server

```bash
npm install
npm run build
```

Output folder: **`out/`** (this is what you upload to IPFS).

Local preview of the static build:

```bash
npm run preview:static
```

Open [http://localhost:3001](http://localhost:3001).

---

## 2. Upload / pin to IPFS (get a CID)

You need a content identifier (**CID**), e.g. `bafybei...` or `Qm...`.

**Automated build + optional Pinata pin:**

```bash
export PINATA_JWT="your_pinata_jwt"   # optional
export UD_MCP_API_KEY="ud_mcp_..."    # optional — verify UD access only
./scripts/deploy.sh
```

> **Important:** The Unstoppable Domains MCP API key (`ud_mcp_*`) manages DNS and portfolio — it does **not** upload website files to IPFS. IPFS upload still requires Pinata or the UD dashboard uploader. Linking a CID to **web3** domains (e.g. `artanova.x`) also requires a **wallet signature** in the UD dashboard.

### Option A — Pinata (recommended for production)

1. Create an account at [pinata.cloud](https://pinata.cloud).
2. **Upload** → upload the entire **`out/`** folder (as a folder, not a zip of loose files without structure).
3. Ensure the folder root contains `index.html` (it should after `npm run build`).
4. Copy the **IPFS CID** from the file/folder details.
5. Keep the pin **active** (unpinned content can disappear).

CLI alternative (Pinata API / `ipfs` CLI):

```bash
# Example with IPFS Kubo CLI (if installed locally)
ipfs add -r --cid-version=1 out
# Use the CID printed for the out/ directory itself
```

### Option B — Unstoppable Domains website uploader

1. Go to **My Domains** → select your domain → **Manage**.
2. Choose **Upload Website** / website files.
3. Upload the contents of **`out/`** (must include `index.html` at the root of the upload).
4. Confirm / launch — UD pins for you and can set the domain record in one flow.

---

## 3. Link the CID to your Unstoppable Domain

1. Open [Unstoppable Domains](https://unstoppabledomains.com) → **My Domains** → your domain → **Manage**.
2. Find **Website** / **IPFS** / **Decentralized Website** settings.
3. Paste your CID (sometimes shown as `/ipfs/<CID>` — use the CID only if the UI asks for hash only).
4. Save and **sign the transaction** with the wallet that owns the domain.
5. Wait for confirmation (usually minutes; can take longer on congested networks).

Record type used by UD (conceptually):

| Record | Purpose |
|--------|---------|
| `ipfs.html.value` (or legacy `dweb.ipfs.hash`) | Points the domain at your IPFS website CID |

After linking, the domain resolves to that CID until you update it again (e.g. after a redesign).

### Both `artanova.net` and `artanova.x`

Use the **same IPFS CID** for both domains:

1. **artanova.x** (web3) — My Domains → Manage → Website → Link Website → paste CID → sign wallet
2. **artanova.net** (DNS on UD) — same flow if UD offers IPFS/website linking for that domain, **or** set a redirect/reverse proxy to the gateway URL (`https://<CID>.ipfs.dweb.link/`)

Both should open the same site once configured.

---

## 4. Gateway & how visitors open the site

Browsers do **not** natively resolve `.crypto` / UD domains like normal DNS. Visitors need one of:

### A. Unstoppable Extension (browser)

- Chrome/Brave/Firefox: [Unstoppable Extension](https://unstoppabledomains.com/extension)
- Then visit `https://yourname.crypto` (or your TLD) directly in the address bar.

### B. HTTPS gateway URLs (no extension)

Share these so anyone can open the site today:

```text
https://<CID>.ipfs.dweb.link
https://gateway.pinata.cloud/ipfs/<CID>/
https://ipfs.io/ipfs/<CID>/
```

Replace `<CID>` with your folder CID. Trailing slash matters for directory listings.

### C. UD resolution / partner gateways

Unstoppable also documents resolution via their apps and partner browsers. Prefer documenting for the client:

1. **Primary brand URL** — `yourdomain.crypto` (via extension or UD-compatible browser)
2. **Public gateway fallback** — Pinata or `dweb.link` URL above
3. **CID** — permanent content address (immutable until you publish a new build)

---

## 5. DNS / traditional domain notes (optional)

If the client also owns a **classic DNS domain** (e.g. `artanova.com`) and wants it to mirror IPFS:

| Record | Host | Value |
|--------|------|--------|
| TXT (DNSLink) | `_dnslink` | `dnslink=/ipfs/<CID>` |

Then an IPFS-aware gateway can resolve `https://artanova.com` via DNSLink.  
**Unstoppable Domains alone do not use this TXT record** — they store the IPFS hash on-chain in the domain records. Document both if the client uses UD + a separate DNS domain.

---

## 6. Updating the site after changes

Every new production release:

```bash
npm run build
# Upload / pin new out/ folder → new CID
# Update Unstoppable Domain website record → sign tx
```

Keep a changelog of CIDs for the client:

| Date | CID | Notes |
|------|-----|--------|
| YYYY-MM-DD | `bafy...` | Initial production |

---

## 7. Client deliverable checklist

- [ ] `npm run build` succeeds; `out/` contains `index.html`, `about/`, `journey/`, etc.
- [ ] Folder pinned on Pinata (or UD uploader) — CID saved
- [ ] Unstoppable Domain record updated + transaction confirmed
- [ ] Verified via gateway URL and (if possible) UD extension
- [ ] This file + root `README.md` delivered with the repo
- [ ] Source repo shared (GitHub/GitLab) with build scripts in `package.json`

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page on gateway | Confirm you pinned the **`out/`** root (the folder that contains `index.html`), not the repo root |
| `/about` 404 on IPFS | Rebuild with `trailingSlash: true` (already set); use `/about/` |
| Images missing | Ensure `public/images/*` were present before `npm run build` |
| Domain still shows old site | New CID not linked, or tx not confirmed; clear extension cache |
| `next/image` build errors | `images.unoptimized: true` must stay enabled for static export |

---

## Useful links

- [IPFS — static site generators / Next.js](https://docs.ipfs.tech/how-to/websites-on-ipfs/static-site-generators/)
- [Next.js static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Pinata](https://pinata.cloud)
- [Unstoppable Domains](https://unstoppabledomains.com)
