# Deployment record

| Date | CID / Host | Notes |
|------|------------|-------|
| 2026-08-04 | `bafybeidgcdwugcp3wlqql4tctpbcw2gkqtzletyherw6jxhv5l7q2cihxy` | Initial IPFS / Pinata deploy |
| 2026-08-10 | GitHub Pages (`gh-pages`) | Attempted as primary — URL stayed clean, but custom-domain HTTPS cert stayed `*.github.io` |
| 2026-08-12 | UD reverse proxy → Cloudflare tunnel (non-IPFS) | **Current:** fixes `inbrowser.link` / `dweb.link` address-bar rewrite |

## Why the browser jumped to `*.ipfs.inbrowser.link`

Reverse-proxying to a public IPFS gateway (`*.ipfs.dweb.link`) injects gateway / `cdn-cgi` links and IPFS headers. Unstoppable / IPFS browser extensions then rewrite the address bar to `inbrowser.link`.

**Fix:** origin must be a normal static host (not an IPFS gateway).

## Live URLs (production)

| Surface | URL | Status |
|---------|-----|--------|
| **Primary domain** | https://artanova.net | UD reverse proxy → Cloudflare quick tunnel → local `out/` |
| **IPFS fallback** | https://bafybeidgcdwugcp3wlqql4tctpbcw2gkqtzletyherw6jxhv5l7q2cihxy.ipfs.dweb.link/ | Still available (immutable CID) — do **not** point the domain here |
| artanova.x | Web3 domain | Wallet **Link Website** + same CID (API cannot set) |

## artanova.net configuration (current)

- **Nameservers:** Unstoppable Domains (`ns1` / `ns2.unstoppabledomains.com`)
- **Hosting:** `REVERSE_PROXY` → Cloudflare `*.trycloudflare.com` (serves static `out/`)
- **SSL:** Let’s Encrypt via Unstoppable (`CN=artanova.net`)
- **Email (MX / SPF):** preserved (Google)
- **Local processes (this VPS):**
  - `python3 -m http.server 3041 --directory out`
  - `/tmp/cloudflared tunnel --url http://127.0.0.1:3041`

## Important limitation

Cloudflare **quick** tunnels die when the VPS processes stop (then the domain may 502/530). For durable production hosting, move the static site to **Vercel / Netlify / Cloudflare Pages** (or a named Cloudflare tunnel) and point the UD reverse proxy at that hostname — still **not** an IPFS gateway.

## Redeploy static files

```bash
npm run build
# restart static server so it serves the new out/
```

## Pending

- Replace quick tunnel with a permanent non-IPFS host (Vercel/Netlify/named tunnel)
- **artanova.x**: UD dashboard Link Website + wallet sign
- Rotate exposed API keys after stable deploy
