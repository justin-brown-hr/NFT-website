#!/usr/bin/env python3
"""Upload out/ to Pinata and optionally point artanova.net via UD reverse proxy."""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
ENV_FILE = ROOT / ".env"


def load_env_file() -> None:
    if not ENV_FILE.is_file():
        return
    for line in ENV_FILE.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


load_env_file()

PINATA_KEY = os.environ.get("PINATA_API_KEY", "")
PINATA_SECRET = os.environ.get("PINATA_API_SECRET", "")
PINATA_JWT = os.environ.get("PINATA_JWT", "")
UD_KEY = os.environ.get("UD_MCP_API_KEY", "")
GATEWAY_BASE = os.environ.get("IPFS_GATEWAY_URL", "")  # skip upload if CID already pinned


def die(msg: str) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def pinata_auth_headers() -> dict[str, str]:
    if PINATA_JWT:
        return {"Authorization": f"Bearer {PINATA_JWT}"}
    if PINATA_KEY and PINATA_SECRET:
        return {
            "pinata_api_key": PINATA_KEY,
            "pinata_secret_api_key": PINATA_SECRET,
        }
    die("Set PINATA_JWT or PINATA_API_KEY + PINATA_API_SECRET")


def verify_pinata() -> None:
    r = requests.get(
        "https://api.pinata.cloud/data/testAuthentication",
        headers=pinata_auth_headers(),
        timeout=30,
    )
    if r.status_code != 200:
        die(f"Pinata auth failed: {r.text}")


def upload_out_folder() -> str:
    if not OUT.is_dir() or not (OUT / "index.html").is_file():
        die(f"Run npm run build first — missing {OUT}/index.html")

    files = []
    for path in sorted(OUT.rglob("*")):
        if path.is_file():
            rel = path.relative_to(OUT).as_posix()
            files.append(
                (
                    "file",
                    (f"artanova/{rel}", path.open("rb"), "application/octet-stream"),
                )
            )

    data = {
        "pinataMetadata": json.dumps({"name": "artanova-site"}),
        "pinataOptions": json.dumps({"cidVersion": 1}),
    }

    print(f"Uploading {len(files)} files to Pinata...", file=sys.stderr)
    r = requests.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        files=files,
        data=data,
        headers=pinata_auth_headers(),
        timeout=900,
    )
    if r.status_code != 200:
        die(f"Pinata upload failed: {r.text}")

    cid = r.json().get("IpfsHash")
    if not cid:
        die(f"No IpfsHash in response: {r.text}")
    return cid


def ud_post(action: str, body: dict) -> dict:
    if not UD_KEY:
        die("Set UD_MCP_API_KEY")
    r = requests.post(
        f"https://api.unstoppabledomains.com/mcp/v1/actions/{action}",
        headers={
            "Authorization": f"Bearer {UD_KEY}",
            "Content-Type": "application/json",
        },
        json=body,
        timeout=60,
    )
    return r.json()


def configure_artanova_net(gateway_url: str) -> None:
    print("Configuring artanova.net reverse proxy...", file=sys.stderr)
    resp = ud_post(
        "ud_dns_hosting_add",
        {
            "domains": [
                {
                    "name": "artanova.net",
                    "type": "REVERSE_PROXY",
                    "targetUrl": gateway_url.rstrip("/") + "/",
                    "forceCompatibility": True,
                }
            ]
        },
    )
    print(json.dumps(resp, indent=2))


def main() -> None:
    if GATEWAY_BASE:
        gateway = GATEWAY_BASE.rstrip("/") + "/"
        cid = gateway.split("/ipfs/")[-1].strip("/") if "/ipfs/" in gateway else "(provided)"
    else:
        verify_pinata()
        cid = upload_out_folder()
        gateway = f"https://{cid}.ipfs.dweb.link/"

    print("\n=== DEPLOYMENT ===")
    print(f"CID:     {cid}")
    print(f"Gateway: {gateway}")
    print(f"Gateway: https://gateway.pinata.cloud/ipfs/{cid}/")

    if UD_KEY:
        configure_artanova_net(gateway)
        print("\nartanova.net → reverse proxy configured (may take a few minutes).")
    else:
        print("\nSkipped UD config — no UD_MCP_API_KEY.")

    print(
        "\nartanova.x (web3) must be linked manually in Unstoppable Domains:\n"
        "  My Domains → artanova.x → Manage → Website → Link Website\n"
        f"  Paste CID: {cid}\n"
        "  Sign with wallet."
    )


if __name__ == "__main__":
    main()
