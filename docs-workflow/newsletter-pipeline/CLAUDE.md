# Newsletter Automation — amaran-daily

## Purpose

This is the working directory for the daily newsletter digest automation pipeline.
Claude Code runs /loop from here to periodically fetch and process newsletters.

## Workflow

1. `/loop 1d at 7:00am` triggers the digest generation
2. Search Gmail for 10 newsletter sources (24-hour filter)
3. Categorize articles into: pharma, hbr/leadership, ai/tech
4. Save interactive HTML digest to `digest-output/`
5. User opens HTML, selects articles (~3 min)
6. `route-selected.sh` pushes selections to 3 GitHub repos

## Newsletter Sources

1. STAT News — biopharma industry
2. Endpoints News — biotech/pharma deals
3. BioPharma Dive — pharma business
4. Fierce Pharma — pharma operations
5. AI News (The Rundown) — AI industry
6. Ben's Bites — AI tools & products
7. HBR Daily — leadership/management
8. Morning Brew — business overview
9. Substack digest — curated follows
10. TLDR Newsletter — tech summary

## Output Repos

| Category | Repo | CLAUDE.md Focus |
|----------|------|-----------------|
| Pharma | ~/github/pharma-decipher | Pharma industry analysis, regulatory, pipeline |
| Leadership | ~/github/hbr-review | Strategy, management, organizational change |
| AI/Tech | ~/github/ai-articles | AI tools, coding, technical deep dives |

## File Structure

```
newsletter-pipeline/
  CLAUDE.md                  ← this file
  config.json                ← newsletter source definitions & categories
  generate-digest.py         ← Gmail fetch → categorize → HTML digest
  digest-template.html       ← interactive HTML template with checkboxes
  route-selected.sh          ← routes checked articles to 3 GitHub repos
  sample-selections.json     ← example input for testing route-selected.sh
  .gitignore                 ← excludes digest-output/
  digest-output/             ← generated HTML digests (gitignored)
  github-actions/
    process-inbox.yml        ← GitHub Actions workflow for Option B
  repo-templates/
    pharma-decipher-CLAUDE.md  ← CLAUDE.md template for pharma repo
    hbr-review-CLAUDE.md       ← CLAUDE.md template for leadership repo
    ai-articles-CLAUDE.md      ← CLAUDE.md template for AI/tech repo
```

## Quick Start (Testing)

```bash
# Generate a mock digest with sample data
python3 generate-digest.py --mock

# Open the generated HTML in browser
open digest-output/2026-03-11_digest.html

# After selecting articles & exporting JSON, route to repos
./route-selected.sh digest-output/2026-03-11_digest.json
```
