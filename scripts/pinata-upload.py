#!/usr/bin/env python3
"""Upload out/ folder to Pinata via pinFileToIPFS (directory structure preserved)."""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

try:
    import requests
except ImportError:
    print("Install requests: pip install requests", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"


def upload_folder(api_key: str, api_secret: str) -> str:
    if not OUT.is_dir() or not (OUT / "index.html").is_file():
        raise SystemExit(f"Missing {OUT}/index.html — run npm run build first")

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

    metadata = json.dumps({"name": "artanova-site"})
    options = json.dumps({"cidVersion": 1, "wrapWithDirectory": False})

    data = {
        "pinataMetadata": metadata,
        "pinataOptions": options,
    }

    resp = requests.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        files=files,
        data=data,
        headers={
            "pinata_api_key": api_key,
            "pinata_secret_api_key": api_secret,
        },
        timeout=600,
    )
    resp.raise_for_status()
    payload = resp.json()
    cid = payload.get("IpfsHash")
    if not cid:
        raise SystemExit(f"No IpfsHash in response: {payload}")
    return cid


def main() -> None:
    api_key = os.environ.get("PINATA_API_KEY", "")
    api_secret = os.environ.get("PINATA_API_SECRET", "")

    if not api_key or not api_secret:
        raise SystemExit("Set PINATA_API_KEY and PINATA_API_SECRET")

    cid = upload_folder(api_key, api_secret)
    print(cid)
    print(f"https://{cid}.ipfs.dweb.link/", file=sys.stderr)
    print(f"https://gateway.pinata.cloud/ipfs/{cid}/", file=sys.stderr)


if __name__ == "__main__":
    main()
