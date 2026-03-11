#!/usr/bin/env python3
"""
generate-digest.py — Fetch newsletters from Gmail, categorize, and generate interactive HTML digest.

Usage:
    python3 generate-digest.py                    # Use Gmail MCP (default)
    python3 generate-digest.py --mock             # Use sample data for testing
    python3 generate-digest.py --input raw.json   # Use pre-fetched raw JSON

Requires:
    - Gmail MCP configured in Claude Code, OR
    - Pre-fetched newsletter JSON via --input

Output:
    - digest-output/YYYY-MM-DD_digest.html  (interactive HTML with checkboxes)
    - digest-output/YYYY-MM-DD_digest.json  (structured data for route-selected.sh)
"""

import argparse
import json
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path
from string import Template

SCRIPT_DIR = Path(__file__).parent
CONFIG_PATH = SCRIPT_DIR / "config.json"
TEMPLATE_PATH = SCRIPT_DIR / "digest-template.html"


def load_config():
    with open(CONFIG_PATH) as f:
        return json.load(f)


def fetch_from_gmail_mcp(config):
    """
    Placeholder for Gmail MCP integration.
    In production, this would call the Gmail MCP tools:
      - gmail_search_messages(query=source_query, max_results=5)
      - gmail_read_message(message_id=...) for each result

    For now, prints instructions and exits.
    """
    print("=" * 60)
    print("Gmail MCP Integration")
    print("=" * 60)
    print()
    print("This script is designed to be called BY Claude Code,")
    print("which handles Gmail MCP tool calls natively.")
    print()
    print("To use this pipeline with Claude Code:")
    print()
    print("  1. Configure Gmail MCP in your Claude Code settings")
    print("  2. Run: claude -p 'Run the newsletter digest pipeline'")
    print("     (Claude Code will call Gmail MCP tools automatically)")
    print()
    print("For testing without Gmail, use:")
    print("  python3 generate-digest.py --mock")
    print()
    sys.exit(1)


def generate_mock_data(config):
    """Generate sample newsletter data for testing the pipeline."""
    today = datetime.now().strftime("%Y-%m-%d")
    yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")

    return {
        "fetch_date": today,
        "lookback_hours": config["settings"]["lookback_hours"],
        "articles": [
            {
                "source_id": "stat-news",
                "source_name": "STAT News",
                "category": "pharma",
                "title": "FDA Accelerates AI-Driven Drug Review Process",
                "summary": "FDA announces new framework for AI-assisted NDA reviews, potentially cutting review times by 30%. The initiative focuses on using machine learning to analyze clinical trial data more efficiently, with implications for CDMO partners and regulatory documentation requirements.",
                "url": "https://example.com/fda-ai-review",
                "received_at": f"{yesterday}T14:30:00Z",
            },
            {
                "source_id": "endpoints",
                "source_name": "Endpoints News",
                "category": "pharma",
                "title": "Biosimilar Market Reaches $50B Milestone",
                "summary": "Global biosimilar market crosses $50B for the first time. Key drivers include patent cliffs on major biologics and accelerating emerging market adoption. Analysts project continued 15% CAGR through 2030.",
                "url": "https://example.com/biosimilar-50b",
                "received_at": f"{yesterday}T16:00:00Z",
            },
            {
                "source_id": "fierce-pharma",
                "source_name": "Fierce Pharma",
                "category": "pharma",
                "title": "GMP Compliance: New WHO Guidelines for Cell Therapy Manufacturing",
                "summary": "WHO releases updated GMP guidelines specific to cell and gene therapy manufacturing. Key changes include new requirements for aseptic processing validation and environmental monitoring in cleanroom facilities.",
                "url": "https://example.com/who-gmp-cell-therapy",
                "received_at": f"{yesterday}T09:15:00Z",
            },
            {
                "source_id": "hbr-daily",
                "source_name": "HBR Daily",
                "category": "hbr",
                "title": "Why Middle Managers Are the Key to AI Adoption",
                "summary": "Research shows organizations where middle managers champion AI tools see 3x faster adoption rates. The critical role lies in translating executive vision into team-level practice, removing friction, and creating psychological safety for experimentation.",
                "url": "https://example.com/middle-managers-ai",
                "received_at": f"{yesterday}T11:00:00Z",
            },
            {
                "source_id": "morning-brew",
                "source_name": "Morning Brew",
                "category": "hbr",
                "title": "The Productivity Paradox of Remote Work in 2026",
                "summary": "New Stanford study finds remote workers are 13% more productive but report higher burnout rates. Companies implementing structured hybrid models (3-2 split) show the best outcomes across both metrics.",
                "url": "https://example.com/remote-work-paradox",
                "received_at": f"{yesterday}T07:30:00Z",
            },
            {
                "source_id": "the-rundown",
                "source_name": "The Rundown AI",
                "category": "ai",
                "title": "Claude Code 4.0: Background Agents Now Generally Available",
                "summary": "Anthropic releases background agent capabilities for all Claude Code users. Subagents can now run fully asynchronously with automatic result collection. Early adopters report 5-10x throughput improvements for batch processing tasks.",
                "url": "https://example.com/claude-code-bg-agents",
                "received_at": f"{yesterday}T13:45:00Z",
            },
            {
                "source_id": "bens-bites",
                "source_name": "Ben's Bites",
                "category": "ai",
                "title": "The Rise of Agentic Workflows in Enterprise",
                "summary": "Enterprise adoption of AI agents grows 400% YoY. Key patterns emerging: document processing pipelines, compliance monitoring, automated reporting, and customer service triage. Most successful deployments use human-in-the-loop architecture.",
                "url": "https://example.com/agentic-enterprise",
                "received_at": f"{yesterday}T15:20:00Z",
            },
            {
                "source_id": "tldr",
                "source_name": "TLDR Newsletter",
                "category": "ai",
                "title": "MCP Protocol Adoption Surges: 500+ Integrations Now Available",
                "summary": "The Model Context Protocol ecosystem reaches 500+ official integrations. Notable additions include Salesforce, SAP, and Oracle connectors. The protocol is becoming the de facto standard for AI tool connectivity.",
                "url": "https://example.com/mcp-500-integrations",
                "received_at": f"{yesterday}T08:00:00Z",
            },
        ],
    }


def load_raw_input(input_path):
    """Load pre-fetched newsletter data from a JSON file."""
    with open(input_path) as f:
        return json.load(f)


def categorize_articles(raw_data, config):
    """Group articles by category and sort by source priority."""
    categories = config["categories"]
    sources_by_id = {s["id"]: s for s in config["newsletter_sources"]}

    categorized = {cat: [] for cat in categories}

    for article in raw_data["articles"]:
        cat = article.get("category", "ai")
        if cat in categorized:
            priority = sources_by_id.get(article.get("source_id", ""), {}).get("priority", 99)
            article["_priority"] = priority
            categorized[cat].append(article)

    # Sort each category by priority
    for cat in categorized:
        categorized[cat].sort(key=lambda a: a["_priority"])

    return categorized


def render_digest_html(categorized, config, fetch_date):
    """Render the interactive HTML digest from template."""
    with open(TEMPLATE_PATH) as f:
        template_content = f.read()

    categories_config = config["categories"]

    # Build article cards HTML
    cards_html_parts = []
    article_index = 0

    for cat_key, articles in categorized.items():
        if not articles:
            continue

        cat_info = categories_config[cat_key]
        cards_html_parts.append(
            f'<div class="category-section" data-category="{cat_key}">'
        )
        cards_html_parts.append(
            f'<h2 style="color: {cat_info["color"]}; border-bottom: 2px solid {cat_info["color"]}; padding-bottom: 8px;">'
            f'{cat_info["label"]} ({len(articles)})</h2>'
        )

        for article in articles:
            checked = "checked" if article.get("_priority", 99) <= 2 else ""
            cards_html_parts.append(f"""
        <div class="article-card" data-category="{cat_key}" data-index="{article_index}">
          <label class="article-checkbox">
            <input type="checkbox" {checked}
                   data-title="{article['title']}"
                   data-source="{article.get('source_name', '')}"
                   data-summary="{article.get('summary', '').replace('"', '&quot;')}"
                   data-url="{article.get('url', '')}"
                   data-category="{cat_key}">
            <span class="checkmark"></span>
          </label>
          <div class="article-content">
            <div class="article-source" style="color: {cat_info['color']}">{article.get('source_name', 'Unknown')}</div>
            <h3 class="article-title">{article['title']}</h3>
            <p class="article-summary">{article.get('summary', '')}</p>
            {f'<a href="{article["url"]}" target="_blank" class="article-link">Read original →</a>' if article.get('url') else ''}
          </div>
        </div>""")
            article_index += 1

        cards_html_parts.append("</div>")

    cards_html = "\n".join(cards_html_parts)

    # Count stats
    total = sum(len(a) for a in categorized.values())
    pharma_count = len(categorized.get("pharma", []))
    hbr_count = len(categorized.get("hbr", []))
    ai_count = len(categorized.get("ai", []))

    # Replace template placeholders
    html = template_content
    html = html.replace("{{FETCH_DATE}}", fetch_date)
    html = html.replace("{{TOTAL_COUNT}}", str(total))
    html = html.replace("{{PHARMA_COUNT}}", str(pharma_count))
    html = html.replace("{{HBR_COUNT}}", str(hbr_count))
    html = html.replace("{{AI_COUNT}}", str(ai_count))
    html = html.replace("{{ARTICLE_CARDS}}", cards_html)

    return html


def generate_selections_json(categorized, fetch_date):
    """Generate the selections JSON structure (all articles, user filters via HTML)."""
    result = {"date": fetch_date}
    for cat_key, articles in categorized.items():
        result[cat_key] = [
            {
                "title": a["title"],
                "source": a.get("source_name", ""),
                "summary": a.get("summary", ""),
                "url": a.get("url", ""),
            }
            for a in articles
        ]
    return result


def main():
    parser = argparse.ArgumentParser(description="Generate newsletter digest")
    parser.add_argument("--mock", action="store_true", help="Use mock data for testing")
    parser.add_argument("--input", type=str, help="Path to pre-fetched raw JSON")
    parser.add_argument("--output-dir", type=str, default=None, help="Output directory")
    args = parser.parse_args()

    config = load_config()

    # Determine output directory
    output_dir = Path(args.output_dir) if args.output_dir else SCRIPT_DIR / config["settings"]["digest_output_dir"]
    output_dir.mkdir(parents=True, exist_ok=True)

    # Fetch or load data
    if args.mock:
        print("[mock] Using sample newsletter data")
        raw_data = generate_mock_data(config)
    elif args.input:
        print(f"[input] Loading from {args.input}")
        raw_data = load_raw_input(args.input)
    else:
        fetch_from_gmail_mcp(config)
        return

    fetch_date = raw_data.get("fetch_date", datetime.now().strftime("%Y-%m-%d"))

    # Categorize
    categorized = categorize_articles(raw_data, config)
    total = sum(len(a) for a in categorized.values())
    print(f"[categorize] {total} articles across {sum(1 for a in categorized.values() if a)} categories")

    # Render HTML
    html = render_digest_html(categorized, config, fetch_date)
    html_path = output_dir / f"{fetch_date}_digest.html"
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[output] HTML digest → {html_path}")

    # Generate selections JSON (full set — user selects via HTML checkboxes)
    selections = generate_selections_json(categorized, fetch_date)
    json_path = output_dir / f"{fetch_date}_digest.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(selections, f, indent=2, ensure_ascii=False)
    print(f"[output] Selections JSON → {json_path}")

    print()
    print(f"Open {html_path} in browser, check articles, click 'Export Selected'")
    print(f"Then run: ./route-selected.sh {json_path}")


if __name__ == "__main__":
    main()
