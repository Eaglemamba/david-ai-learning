#!/usr/bin/env python3
"""
normalize_html.py — Batch-normalize 87 HTML doc files to unified template.

Usage:
    python normalize_html.py                          # full batch
    python normalize_html.py --dry-run                # print changes only
    python normalize_html.py --files FILE1 FILE2 ...  # specific files only
"""

import argparse
import os
import re
import sys
from pathlib import Path

try:
    from bs4 import BeautifulSoup, Comment
except ImportError:
    print("ERROR: beautifulsoup4 not installed. Run: pip install beautifulsoup4 lxml")
    sys.exit(1)

DOCS_DIR = Path(__file__).parent / "docs"

# Google Fonts link — only Noto Sans TC + Source Code Pro
CANONICAL_FONTS_HREF = (
    "https://fonts.googleapis.com/css2?"
    "family=Noto+Sans+TC:wght@300;400;500;700&"
    "family=Source+Code+Pro:wght@400;600&display=swap"
)
CANONICAL_FONTS_TAG = f'<link href="{CANONICAL_FONTS_HREF}" rel="stylesheet">'
STYLESHEET_LINK = '<link rel="stylesheet" href="styles.css">'

# ── Class rename mapping ──
CLASS_RENAMES = {
    # Group B
    "concept-box": "box-concept",
    "analogy-box": "box-analogy",
    "note-box": "box-key",
    # Group B2
    "key-term-box": "box-key",
    "key-point-box": "box-key",
    # Group B / C columns
    "left-column": "content-left",
    "right-column": "content-right",
    # Group B original/commentary
    "original-content": "content-left",
    "commentary": "content-right",
    # Group B2 two-column → content-grid
    "two-column": "content-grid",
    # Group D (Jan) bilingual
    "chinese-text": "zh-text",
    "english-text": "en-text",
    # Group E bilingual
    "bilingual-zh": "zh-text",
    "bilingual-en": "en-text",
    # Group E highlights
    "hl-concept": "highlight-concept",
    "hl-key": "highlight-key",
    "hl-practical": "highlight-practical",
    "hl-cost": "highlight-cost",
    # Group E header/footer
    "doc-header": "header",
    "doc-footer": "footer",
}

# Bare class renames (only rename if exact match — "zh" but not "zh-text")
BARE_CLASS_RENAMES = {
    "zh": "zh-text",
    "en": "en-text",
}

# Fonts to remove from Google Fonts link
UNWANTED_FONT_FAMILIES = [
    "Playfair+Display",
    "JetBrains+Mono",
    "Source+Sans+Pro",
]


def is_already_normalized(soup):
    """Check for idempotency marker."""
    meta = soup.find("meta", attrs={"name": "normalized"})
    return meta is not None


def add_normalized_marker(soup):
    """Add <meta name="normalized" content="v1"> after last meta in head."""
    head = soup.find("head")
    if not head:
        return
    marker = soup.new_tag("meta")
    marker["name"] = "normalized"
    marker["content"] = "v1"
    # Insert after last existing meta
    last_meta = None
    for m in head.find_all("meta"):
        last_meta = m
    if last_meta:
        last_meta.insert_after(marker)
    else:
        head.insert(0, marker)


def fix_lang(soup):
    """Set html lang to zh-TW."""
    html_tag = soup.find("html")
    if html_tag:
        html_tag["lang"] = "zh-TW"


def remove_inline_styles(soup):
    """Remove all <style> blocks from <head>."""
    for style_tag in soup.find_all("style"):
        style_tag.decompose()


def normalize_fonts_link(soup):
    """Replace all Google Fonts links with canonical one."""
    head = soup.find("head")
    if not head:
        return

    # Remove all existing Google Fonts links
    for link in head.find_all("link", href=True):
        if "fonts.googleapis.com" in link["href"]:
            link.decompose()

    # Add canonical link before </head>
    # Insert after title or after last meta
    title = head.find("title")
    new_link = soup.new_tag("link")
    new_link["href"] = CANONICAL_FONTS_HREF
    new_link["rel"] = "stylesheet"
    if title:
        title.insert_after(new_link)
    else:
        head.append(new_link)


def add_stylesheet_link(soup):
    """Add <link rel="stylesheet" href="styles.css"> if not present."""
    head = soup.find("head")
    if not head:
        return

    # Check if already present
    for link in head.find_all("link", rel="stylesheet"):
        href = link.get("href", "")
        if href == "styles.css":
            return  # already linked

    # Insert after the Google Fonts link
    fonts_link = None
    for link in head.find_all("link", href=True):
        if "fonts.googleapis.com" in link["href"]:
            fonts_link = link
            break

    new_link = soup.new_tag("link")
    new_link["rel"] = "stylesheet"
    new_link["href"] = "styles.css"
    if fonts_link:
        fonts_link.insert_after(new_link)
    else:
        head.append(new_link)


def rename_classes(soup):
    """Rename old class names to new ones."""
    for el in soup.find_all(True):
        classes = el.get("class", [])
        if not classes:
            continue
        new_classes = []
        changed = False
        for cls in classes:
            if cls in CLASS_RENAMES:
                new_classes.append(CLASS_RENAMES[cls])
                changed = True
            elif cls in BARE_CLASS_RENAMES:
                new_classes.append(BARE_CLASS_RENAMES[cls])
                changed = True
            else:
                new_classes.append(cls)
        if changed:
            el["class"] = new_classes


def normalize_header_footer(soup):
    """
    Convert <div class="header"> → <header class="header">
    Convert <div class="footer"> → <footer class="footer">
    """
    # Header
    for div in soup.find_all("div", class_="header"):
        div.name = "header"

    # Footer
    for div in soup.find_all("div", class_="footer"):
        div.name = "footer"


def strip_body_inline_style(soup):
    """Remove inline style="" from <body>."""
    body = soup.find("body")
    if body and body.get("style"):
        del body["style"]


def convert_button_accordions(soup):
    """
    Convert Group C button-toggle Q&A to <details> accordion.

    Before:
        <div class="question">
            <div class="question-number">問題 1：概念理解</div>
            <div class="question-text">...</div>
            <button class="answer-toggle">隱藏答案</button>
            <div class="answer-content">...</div>
        </div>

    After:
        <details class="question-accordion">
            <summary class="question-header">
                <span class="question-number">Q1</span>
                <span class="question-type">概念理解</span>
                <span class="question-text">...</span>
                <span class="accordion-icon"></span>
            </summary>
            <div class="question-answer">
                [content from answer-content]
            </div>
        </details>
    """
    questions = soup.find_all("div", class_="question")
    if not questions:
        return

    for q_div in questions:
        # Extract parts
        q_num_div = q_div.find(class_="question-number")
        q_text_div = q_div.find(class_="question-text")
        answer_content = q_div.find(class_="answer-content")
        answer_toggle = q_div.find(class_="answer-toggle")

        if not (q_text_div and answer_content):
            continue

        # Parse question number and type from "問題 1：概念理解" or similar
        q_num_text = q_num_div.get_text(strip=True) if q_num_div else ""
        q_label = "Q1"
        q_type = ""
        # Try to parse "問題 N：TYPE" format
        m = re.match(r"問題\s*(\d+)[：:]\s*(.*)", q_num_text)
        if m:
            q_label = f"Q{m.group(1)}"
            q_type = m.group(2)
        else:
            # Try "Q1" etc
            m2 = re.match(r"(Q\d+)", q_num_text)
            if m2:
                q_label = m2.group(1)

        # Build <details>
        details = soup.new_tag("details", **{"class": "question-accordion"})
        summary = soup.new_tag("summary", **{"class": "question-header"})

        num_span = soup.new_tag("span", **{"class": "question-number"})
        num_span.string = q_label

        type_span = soup.new_tag("span", **{"class": "question-type"})
        type_span.string = q_type or "理解應用"

        text_span = soup.new_tag("span", **{"class": "question-text"})
        text_span.string = q_text_div.get_text(strip=True)

        icon_span = soup.new_tag("span", **{"class": "accordion-icon"})

        summary.append(num_span)
        summary.append(type_span)
        summary.append(text_span)
        summary.append(icon_span)

        answer_div = soup.new_tag("div", **{"class": "question-answer"})
        # Move all children from answer_content into answer_div
        for child in list(answer_content.children):
            answer_div.append(child.extract())

        details.append(summary)
        details.append(answer_div)

        # Replace the original div.question with <details>
        q_div.replace_with(details)

    # Remove the old toggle script
    for script in soup.find_all("script"):
        text = script.string or ""
        if "answer-toggle" in text or "toggleAnswer" in text:
            script.decompose()

    # Also clean up the practice-section wrapper classes
    # Rename practice-header to h2 if present, etc.
    for ph in soup.find_all(class_="practice-header"):
        ph.name = "h2"
        if "practice-header" in ph.get("class", []):
            ph["class"] = []


def remove_old_accordion_css_classes(soup):
    """Remove classes that only existed for button-toggle accordions."""
    for el in soup.find_all(class_="answer-content"):
        # Remove .hide class if present
        classes = el.get("class", [])
        if "hide" in classes:
            classes.remove("hide")
            el["class"] = classes


def preserve_tab_js(soup):
    """Keep switchTab() JS — don't remove it."""
    # This is implicitly handled by only removing answer-toggle scripts
    pass


def add_main_wrapper(soup):
    """
    Wrap body content in <main class="main"> if not already present.
    Skip header and footer — main goes between them.
    Actually, the current templates don't use <main> consistently,
    and adding it blindly could break layout. Skip this for now.
    """
    pass


def process_file(filepath, dry_run=False):
    """Process a single HTML file. Returns (changed: bool, changes: list[str])."""
    changes = []

    with open(filepath, "r", encoding="utf-8") as f:
        original = f.read()

    soup = BeautifulSoup(original, "html.parser")

    # Idempotency check
    if is_already_normalized(soup):
        return False, ["SKIP: already normalized (v1)"]

    # 1. Fix lang
    html_tag = soup.find("html")
    if html_tag and html_tag.get("lang") != "zh-TW":
        changes.append(f"lang: {html_tag.get('lang')} → zh-TW")
    fix_lang(soup)

    # 2. Remove inline <style>
    style_tags = soup.find_all("style")
    if style_tags:
        changes.append(f"removed {len(style_tags)} inline <style> block(s)")
    remove_inline_styles(soup)

    # 3. Normalize fonts link
    old_fonts = [l for l in soup.find_all("link", href=True) if "fonts.googleapis.com" in l["href"]]
    if old_fonts:
        for lf in old_fonts:
            if lf["href"] != CANONICAL_FONTS_HREF:
                changes.append("normalized Google Fonts link")
                break
    normalize_fonts_link(soup)

    # 4. Add styles.css link
    has_css = any(
        l.get("href") == "styles.css"
        for l in soup.find_all("link", rel="stylesheet")
    )
    if not has_css:
        changes.append("added styles.css link")
    add_stylesheet_link(soup)

    # 5. Rename classes
    old_classes_found = set()
    for el in soup.find_all(True):
        for cls in el.get("class", []):
            if cls in CLASS_RENAMES or cls in BARE_CLASS_RENAMES:
                old_classes_found.add(cls)
    # We already renamed in step above — need to re-parse
    # Actually let's rename now
    # Re-parse from current state
    rename_classes(soup)
    if old_classes_found:
        changes.append(f"renamed classes: {', '.join(sorted(old_classes_found))}")

    # 6. Normalize structure
    header_divs = soup.find_all("div", class_="header")
    if header_divs:
        changes.append(f"converted {len(header_divs)} <div class='header'> → <header>")
    footer_divs = soup.find_all("div", class_="footer")
    if footer_divs:
        changes.append(f"converted {len(footer_divs)} <div class='footer'> → <footer>")
    normalize_header_footer(soup)

    # 7. Strip body inline style
    body = soup.find("body")
    if body and body.get("style"):
        changes.append(f"stripped body inline style: {body['style'][:50]}...")
    strip_body_inline_style(soup)

    # 8. Convert button-toggle accordions
    button_questions = soup.find_all("div", class_="question")
    has_button_accordion = any(
        q.find(class_="answer-toggle") for q in button_questions
    )
    if has_button_accordion:
        changes.append(f"converted {len(button_questions)} button-toggle Q&A to <details> accordion")
    convert_button_accordions(soup)
    remove_old_accordion_css_classes(soup)

    # 9. Add idempotency marker
    add_normalized_marker(soup)
    changes.append("added normalized v1 marker")

    if not changes:
        return False, ["no changes needed"]

    # Serialize
    output = str(soup)

    # Post-process: ensure proper DOCTYPE
    if not output.strip().startswith("<!DOCTYPE"):
        output = "<!DOCTYPE html>\n" + output

    if dry_run:
        return True, changes
    else:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(output)
        return True, changes


def main():
    parser = argparse.ArgumentParser(description="Normalize HTML doc files")
    parser.add_argument("--dry-run", action="store_true", help="Print changes without writing")
    parser.add_argument("--files", nargs="+", help="Specific files to process")
    args = parser.parse_args()

    if args.files:
        files = [Path(f) for f in args.files]
    else:
        files = sorted(DOCS_DIR.glob("*.html"))

    # Exclude index.html if present
    files = [f for f in files if f.name != "index.html" and f.name != "styles.css"]

    print(f"{'DRY RUN: ' if args.dry_run else ''}Processing {len(files)} files...\n")

    changed_count = 0
    skipped_count = 0
    error_count = 0

    for filepath in files:
        try:
            changed, changes = process_file(filepath, dry_run=args.dry_run)
            status = "CHANGED" if changed else "SKIP"
            if "SKIP: already normalized" in changes[0]:
                skipped_count += 1
                status = "SKIP"
            elif changed:
                changed_count += 1
            print(f"[{status}] {filepath.name}")
            for c in changes:
                print(f"       {c}")
            print()
        except Exception as e:
            error_count += 1
            print(f"[ERROR] {filepath.name}: {e}\n")

    print("=" * 60)
    print(f"Total: {len(files)} files")
    print(f"Changed: {changed_count}")
    print(f"Skipped: {skipped_count}")
    print(f"Errors: {error_count}")


if __name__ == "__main__":
    main()
