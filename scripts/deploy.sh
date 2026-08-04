#!/usr/bin/env bash
# Artanova — build + optional IPFS pin + Unstoppable Domains notes
#
# Usage:
#   export UD_MCP_API_KEY="ud_mcp_..."          # from UD Account Settings → Advanced
#   export PINATA_JWT="..."                     # optional, from pinata.cloud
#   ./scripts/deploy.sh
#
# The UD MCP key manages DNS/portfolio — it does NOT upload files to IPFS.
# IPFS upload requires Pinata (recommended) or the UD website uploader in the dashboard.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Building static site..."
npm run build

if [[ ! -f out/index.html ]]; then
  echo "ERROR: out/index.html missing after build"
  exit 1
fi

echo "==> Build OK: $(du -sh out | cut -f1) in out/"

# --- Optional: Pin to IPFS via Pinata ---
if [[ -n "${PINATA_JWT:-}" ]]; then
  echo "==> Pinning out/ to IPFS via Pinata..."
  RESPONSE=$(curl -sS -X POST "https://uploads.pinata.cloud/v3/files" \
    -H "Authorization: Bearer $PINATA_JWT" \
    -F "network=public" \
    -F "file=@out;type=application/x-directory;filename=out")

  CID=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',{}).get('cid',''))" 2>/dev/null || true)

  if [[ -z "$CID" ]]; then
    echo "Pinata upload failed. Response:"
    echo "$RESPONSE"
    exit 1
  fi

  echo ""
  echo "IPFS CID: $CID"
  echo "Gateway:  https://$CID.ipfs.dweb.link/"
  echo "Gateway:  https://gateway.pinata.cloud/ipfs/$CID/"
  echo ""
  echo "Next: link this CID to artanova.x and artanova.net in Unstoppable Domains"
  echo "      (My Domains → Manage → Website → Link Website → sign wallet)"
else
  echo ""
  echo "No PINATA_JWT set — skipped IPFS upload."
  echo "Upload the out/ folder manually:"
  echo "  • Pinata: https://pinata.cloud"
  echo "  • Or UD dashboard: My Domains → Upload Website Files"
fi

# --- Optional: verify UD API key + list domains ---
if [[ -n "${UD_MCP_API_KEY:-}" ]]; then
  echo ""
  echo "==> Checking Unstoppable Domains API..."
  RESPONSE=$(curl -sS -X POST "https://api.unstoppabledomains.com/mcp/v1/actions/ud_portfolio_list" \
    -H "Authorization: Bearer $UD_MCP_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"searchTerm":"artanova","limit":10}')

  if echo "$RESPONSE" | grep -q '"error"'; then
    echo "UD API error (check/regenerate key in Account Settings → Advanced):"
    echo "$RESPONSE"
  else
    echo "UD API OK. Domains matching 'artanova':"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
    echo ""
    echo "Note: UD MCP API handles DNS/portfolio — not IPFS upload."
    echo "After you have a CID, link both domains in the UD dashboard or ask client to sign."
  fi
else
  echo ""
  echo "No UD_MCP_API_KEY set — skipped UD API check."
fi

echo ""
echo "Done. See DEPLOY.md for gateway/DNS documentation."
