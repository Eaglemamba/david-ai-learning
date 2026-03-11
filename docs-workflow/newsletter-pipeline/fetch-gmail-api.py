#!/usr/bin/env python3
"""
fetch-gmail-api.py — Fetch newsletters directly via Gmail API (no MCP dependency).

For use in GitHub Actions or any environment where Gmail MCP is unavailable.

Setup (one-time):
  1. Create Google Cloud project → enable Gmail API
  2. Create OAuth 2.0 credentials (Desktop App type)
  3. Run: python3 fetch-gmail-api.py --auth  (opens browser, saves refresh token)
  4. Store the refresh token as GitHub secret: GMAIL_REFRESH_TOKEN
  5. Store client_id and client_secret as: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET

Usage:
  python3 fetch-gmail-api.py                          # Interactive auth (first time)
  python3 fetch-gmail-api.py --auth                   # Force re-auth
  GMAIL_CLIENT_ID=... GMAIL_CLIENT_SECRET=... GMAIL_REFRESH_TOKEN=... \\
    python3 fetch-gmail-api.py                        # Headless (CI/CD)

Output:
  Writes raw JSON to stdout (pipe to generate-digest.py --input)
  Or use --output to write to file
"""

import argparse
import base64
import json
import os
import re
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

SCRIPT_DIR = Path(__file__).parent
CONFIG_PATH = SCRIPT_DIR / "config.json"
TOKEN_CACHE = SCRIPT_DIR / ".gmail-token-cache.json"

GMAIL_API = "https://gmail.googleapis.com/gmail/v1/users/me"
OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token"
OAUTH_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
SCOPES = "https://www.googleapis.com/auth/gmail.readonly"


def load_config():
    with open(CONFIG_PATH) as f:
        return json.load(f)


def get_credentials():
    """Get OAuth credentials from env vars or cached token file."""
    client_id = os.environ.get("GMAIL_CLIENT_ID", "")
    client_secret = os.environ.get("GMAIL_CLIENT_SECRET", "")
    refresh_token = os.environ.get("GMAIL_REFRESH_TOKEN", "")

    # Try cached token file for local development
    if not refresh_token and TOKEN_CACHE.exists():
        with open(TOKEN_CACHE) as f:
            cached = json.load(f)
        client_id = client_id or cached.get("client_id", "")
        client_secret = client_secret or cached.get("client_secret", "")
        refresh_token = cached.get("refresh_token", "")

    if not all([client_id, client_secret, refresh_token]):
        return None

    return {
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refresh_token,
    }


def do_auth_flow():
    """Interactive OAuth flow — run locally once to get refresh token."""
    print("=== Gmail API OAuth Setup ===")
    print()
    print("You need Google Cloud OAuth credentials (Desktop App type).")
    print("Get them from: https://console.cloud.google.com/apis/credentials")
    print()

    client_id = input("Client ID: ").strip()
    client_secret = input("Client Secret: ").strip()

    if not client_id or not client_secret:
        print("Error: Client ID and Secret are required.")
        sys.exit(1)

    # Build auth URL
    params = {
        "client_id": client_id,
        "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
        "response_type": "code",
        "scope": SCOPES,
        "access_type": "offline",
        "prompt": "consent",
    }
    auth_url = f"{OAUTH_AUTH_URL}?{urlencode(params)}"

    print()
    print("Open this URL in your browser:")
    print(auth_url)
    print()
    auth_code = input("Paste the authorization code: ").strip()

    # Exchange code for tokens
    token_data = urlencode({
        "code": auth_code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
        "grant_type": "authorization_code",
    }).encode()

    req = Request(OAUTH_TOKEN_URL, data=token_data, method="POST")
    with urlopen(req) as resp:
        tokens = json.loads(resp.read())

    refresh_token = tokens.get("refresh_token")
    if not refresh_token:
        print("Error: No refresh token received. Try with prompt=consent.")
        sys.exit(1)

    # Cache locally
    cache = {
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refresh_token,
    }
    with open(TOKEN_CACHE, "w") as f:
        json.dump(cache, f, indent=2)

    print()
    print(f"Refresh token cached → {TOKEN_CACHE}")
    print()
    print("For GitHub Actions, add these secrets:")
    print(f"  GMAIL_CLIENT_ID={client_id}")
    print(f"  GMAIL_CLIENT_SECRET={client_secret}")
    print(f"  GMAIL_REFRESH_TOKEN={refresh_token}")
    print()
    print("Done! You can now run: python3 fetch-gmail-api.py")


def get_access_token(creds):
    """Exchange refresh token for a short-lived access token."""
    data = urlencode({
        "client_id": creds["client_id"],
        "client_secret": creds["client_secret"],
        "refresh_token": creds["refresh_token"],
        "grant_type": "refresh_token",
    }).encode()

    req = Request(OAUTH_TOKEN_URL, data=data, method="POST")
    with urlopen(req) as resp:
        result = json.loads(resp.read())

    return result["access_token"]


def gmail_request(access_token, endpoint, params=None):
    """Make an authenticated Gmail API request."""
    url = f"{GMAIL_API}/{endpoint}"
    if params:
        url += f"?{urlencode(params)}"

    req = Request(url, headers={"Authorization": f"Bearer {access_token}"})
    try:
        with urlopen(req) as resp:
            return json.loads(resp.read())
    except HTTPError as e:
        error_body = e.read().decode() if e.fp else ""
        print(f"Gmail API error {e.code}: {error_body}", file=sys.stderr)
        raise


def extract_text_from_parts(parts):
    """Recursively extract text/plain content from MIME parts."""
    texts = []
    for part in parts:
        mime = part.get("mimeType", "")
        if mime == "text/plain" and "data" in part.get("body", {}):
            raw = part["body"]["data"]
            texts.append(base64.urlsafe_b64decode(raw).decode("utf-8", errors="replace"))
        elif "parts" in part:
            texts.extend(extract_text_from_parts(part["parts"]))
    return texts


def extract_articles_from_email(msg_data, source_config):
    """Parse a newsletter email into article entries."""
    headers = {h["name"].lower(): h["value"] for h in msg_data.get("payload", {}).get("headers", [])}
    subject = headers.get("subject", "")
    date_str = headers.get("date", "")
    received_at = date_str  # Keep raw for now

    # Get body text
    payload = msg_data.get("payload", {})
    body_texts = []

    if "parts" in payload:
        body_texts = extract_text_from_parts(payload["parts"])
    elif "data" in payload.get("body", {}):
        raw = payload["body"]["data"]
        body_texts.append(base64.urlsafe_b64decode(raw).decode("utf-8", errors="replace"))

    body = "\n".join(body_texts)

    # For newsletters, each email is typically one digest.
    # We treat the subject as the title and first ~500 chars as summary.
    summary = body[:500].replace("\n", " ").strip()
    if len(body) > 500:
        summary += "..."

    # Extract URLs from body
    urls = re.findall(r'https?://[^\s<>"]+', body)
    first_url = urls[0] if urls else ""

    return {
        "source_id": source_config["id"],
        "source_name": source_config["name"],
        "category": source_config["category"],
        "title": subject,
        "summary": summary,
        "url": first_url,
        "received_at": received_at,
    }


def fetch_newsletters(access_token, config):
    """Fetch recent newsletters from Gmail for all configured sources."""
    lookback = config["settings"]["lookback_hours"]
    max_per_source = config["settings"]["max_articles_per_source"]

    # Gmail search: after:YYYY/MM/DD
    cutoff = datetime.now(timezone.utc) - timedelta(hours=lookback)
    date_filter = cutoff.strftime("%Y/%m/%d")

    articles = []

    for source in config["newsletter_sources"]:
        query = f"({source['gmail_query']}) after:{date_filter}"
        print(f"  [{source['id']}] Searching: {query}", file=sys.stderr)

        try:
            results = gmail_request(access_token, "messages", {
                "q": query,
                "maxResults": max_per_source,
            })
        except HTTPError:
            print(f"  [{source['id']}] Search failed — skipping", file=sys.stderr)
            continue

        messages = results.get("messages", [])
        print(f"  [{source['id']}] Found {len(messages)} messages", file=sys.stderr)

        for msg_ref in messages:
            try:
                msg_data = gmail_request(access_token, f"messages/{msg_ref['id']}", {
                    "format": "full",
                })
                article = extract_articles_from_email(msg_data, source)
                articles.append(article)
            except HTTPError:
                print(f"  [{source['id']}] Failed to read message {msg_ref['id']}", file=sys.stderr)

    return articles


def main():
    parser = argparse.ArgumentParser(description="Fetch newsletters via Gmail API")
    parser.add_argument("--auth", action="store_true", help="Run interactive OAuth setup")
    parser.add_argument("--output", type=str, help="Write output to file instead of stdout")
    args = parser.parse_args()

    if args.auth:
        do_auth_flow()
        return

    creds = get_credentials()
    if not creds:
        print("No credentials found. Run with --auth first, or set env vars:", file=sys.stderr)
        print("  GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN", file=sys.stderr)
        sys.exit(1)

    config = load_config()

    print("Fetching access token...", file=sys.stderr)
    access_token = get_access_token(creds)

    print(f"Fetching newsletters ({len(config['newsletter_sources'])} sources)...", file=sys.stderr)
    articles = fetch_newsletters(access_token, config)

    result = {
        "fetch_date": datetime.now().strftime("%Y-%m-%d"),
        "lookback_hours": config["settings"]["lookback_hours"],
        "articles": articles,
    }

    output_json = json.dumps(result, indent=2, ensure_ascii=False)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(output_json)
        print(f"Output written to {args.output}", file=sys.stderr)
    else:
        print(output_json)

    print(f"Done: {len(articles)} articles fetched.", file=sys.stderr)


if __name__ == "__main__":
    main()
